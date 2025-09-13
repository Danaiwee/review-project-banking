"use server";

import console from "console";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { ID, Query } from "node-appwrite";
import {
  CountryCode,
  ProcessorTokenCreateRequest,
  ProcessorTokenCreateRequestProcessorEnum,
  Products,
} from "plaid";

import { createAdminClient, createSessionClient } from "../appwrite";
import {
  encryptId,
  extractDwollaCustomerIdFromUrl,
  parseStringify,
} from "../utils";
import { addFundingSource, createDwollaCustomer } from "./dwolla.actions";
import { plaidClient } from "../plaid";
import { createBankAccount } from "./bank.actions";

const {
  APPWRITE_DATABASE_ID: DATABASE_ID,
  APPWRITE_USER_COLLECTION_ID: USER_COLLECTION_ID,
} = process.env;

//Authentication
export const getUserInfo = async ({ userId }: getUserInfoParams) => {
  try {
    const { database } = await createAdminClient();

    const user = await database.listDocuments(
      DATABASE_ID!,
      USER_COLLECTION_ID!,
      [Query.equal("userId", [userId])]
    );

    if (!user) throw new Error("User not found");

    return parseStringify(user.documents[0]);
  } catch (error) {
    console.log(error);
  }
};

export const signIn = async (data: SignInParams) => {
  try {
    const { email, password } = data;
    const { account } = await createAdminClient();

    const session = await account.createEmailPasswordSession(email, password);

    (await cookies()).set("appwrite-session", session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });

    const user = await getUserInfo({ userId: session.userId });

    return parseStringify(user);
  } catch (error) {
    console.log(error);
  }
};

export const signUp = async ({ password, ...userData }: SignUpParams) => {
  const { email, firstName, lastName } = userData;
  const name = `${firstName} ${lastName}`;
  try {
    const { account, database } = await createAdminClient();

    //Account of auth in appwrite
    const newAccount = await account.create(ID.unique(), email, password, name);
    if (!newAccount) throw new Error("Error in create account");

    const dwollaCustomerUrl = await createDwollaCustomer({
      ...userData,
      type: "personal",
    }); //return  => 'https://api-sandbox.dwolla.com/customers/FC451A7A-AE30-4404-AB95-E3553FCD733F'
    if (!dwollaCustomerUrl)
      throw new Error("Error in create dwollaCustomerUrl");

    const dwollaCustomerId = extractDwollaCustomerIdFromUrl(dwollaCustomerUrl); // => "FC451A7A-AE30-4404-AB95-E3553FCD733F"

    const newUser = await database.createDocument(
      DATABASE_ID!,
      USER_COLLECTION_ID!,
      ID.unique(),
      {
        ...userData,
        userId: newAccount.$id,
        dwollaCustomerUrl,
        dwollaCustomerId,
      }
    );
    if (!newUser) throw new Error("Error in create user");

    const session = await account.createEmailPasswordSession(email, password);
    /*session returned object
    {
      "$id": "64a1b3c2d45e1",
      "userId": "6478c88d9c12a", => newAccount.$id
      "expire": "2025-08-28T12:34:56.789Z",
      "provider": "email",
      "secret": "eyJhbGciOiJIUzI1NiIsInR5cCI6...",
      "providerUid": "danai@example.com",
      "providerAccessToken": null,
      "providerRefreshToken": null,
      "ip": "192.168.1.25",
      "osCode": "WIN",
      "osName": "Windows",
      "osVersion": "10",
      "clientType": "browser",
      "clientCode": "CH",
      "clientName": "Chrome",
      "clientVersion": "139.0.0.0",
      "countryCode": "TH",
      "current": true
    }
    */

    (await cookies()).set("appwrite-session", session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });

    return parseStringify(newUser);
  } catch (error) {
    console.log(error);
  }
};

export const logOut = async () => {
  try {
    const { account } = await createSessionClient();

    (await cookies()).delete("appwrite-session");
    await account.deleteSession("current");

    return { message: "Logged out successfully" };
  } catch (error) {
    console.log(error);
  }
};

//Plaid Token
export const createLinkToken = async (user: User) => {
  try {
    const tokenParams = {
      user: {
        client_user_id: user.$id,
      },
      client_name: `${user.firstName} ${user.lastName}`,
      products: ["auth"] as Products[],
      language: "en",
      country_codes: ["US"] as CountryCode[],
    };  

    const response = await plaidClient.linkTokenCreate(tokenParams);

    return parseStringify({ linkToken: response.data.link_token });
  } catch (error) {
    console.log(error);
  }
};

//Use public token to exchange with accesstoken and create bank account
export const exchangePublicToken = async ({
  publicToken,
  user,
}: ExchangePublicTokenParams) => {
  try {
    //Exchange public token for access token and item ID
    const response = await plaidClient.itemPublicTokenExchange({
      public_token: publicToken,
    });
    /* return object example
    {
      "access_token": "access-sandbox-123abc456def789ghi", 
      "item_id": "G6n9D7N4kjsnXw",
      "request_id": "m8MDnv9okwxFNBV"
    }
    */

    const accessToken = response.data.access_token;
    const itemId = response.data.item_id;

    //Get account information from Plaid using the access token
    const accountsResponse = await plaidClient.accountsGet({
      access_token: accessToken,
    });

    const accountData = accountsResponse.data.accounts[0];

    //Create a processor token for Dwolla using the access token and account ID
    const request: ProcessorTokenCreateRequest = {
      access_token: accessToken,
      account_id: accountData.account_id,
      processor: "dwolla" as ProcessorTokenCreateRequestProcessorEnum,
    };

    const processorTokenResponse =
      await plaidClient.processorTokenCreate(request);
    const processorToken = processorTokenResponse.data.processor_token;
    /*
    {
      "processor_token": "processor-sandbox-0asd1-a92nc",
      "request_id": "[Unique request ID]"
    }
    */

    //Create a funding source URL for the account using the Dwolla customer ID, processor token, and bank name
    const fundingSourceUrl = await addFundingSource({
      dwollaCustomerId: user.dwollaCustomerId,
      processorToken,
      bankName: accountData.name,
    });
    if (!fundingSourceUrl) throw new Error("Error in create fundingSourceUrl");

    //Create Bank account
    const newBankAccount = await createBankAccount({
      userId: user.$id,
      bankId: itemId,
      accountId: accountData.account_id,
      accessToken,
      fundingSourceUrl,
      shareableId: encryptId(accountData.account_id),
    });
    if (!newBankAccount) throw new Error("Error in create Bank account");

    revalidatePath("/");

    return parseStringify({
      publicTokenExchange: "complete",
    });
  } catch (error) {
    console.log(error);
  }
};
