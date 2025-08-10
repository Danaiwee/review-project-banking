"use server";

import { cookies } from "next/headers";
import { ID, Query } from "node-appwrite";

import { createAdminClient, createSessionClient } from "../appwrite";
import { extractDwollaCustomerIdFromUrl, parseStringify } from "../utils";
import { createDwollaCustomer } from "./dwolla.actions";

const {
  APPWRITE_DATABASE_ID: DATABASE_ID,
  APPWRITE_USER_COLLECTION_ID: USER_COLLECTION_ID,
  APPWRITE_BANK_COLLECTION_ID: BANK_COLLECTION_ID,
} = process.env;

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

    const newAccount = await account.create(ID.unique(), email, password, name);
    if (!newAccount) throw new Error("Error in create account");

    const dwollaCustomerUrl = await createDwollaCustomer({
      ...userData,
      type: "personal",
    });
    if (!dwollaCustomerUrl)
      throw new Error("Error in create dwollaCustomerUrl");

    const dwollaCustomerId = extractDwollaCustomerIdFromUrl(dwollaCustomerUrl);

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
