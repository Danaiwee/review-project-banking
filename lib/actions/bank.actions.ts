import { ID, Query } from "node-appwrite";
import { CountryCode } from "plaid";

import { createAdminClient } from "../appwrite";
import { plaidClient } from "../plaid";
import { parseStringify } from "../utils";

const {
  APPWRITE_DATABASE_ID: DATABASE_ID,
  APPWRITE_USER_COLLECTION_ID: USER_COLLECTION_ID,
  APPWRITE_BANK_COLLECTION_ID: BANK_COLLECTION_ID,
} = process.env;

export const createBankAccount = async (data: CreateBankAccountParams) => {
  try {
    const { database } = await createAdminClient();

    const bankAccount = await database.createDocument(
      DATABASE_ID!,
      BANK_COLLECTION_ID!,
      ID.unique(),
      {
        ...data,
      }
    );

    return parseStringify(bankAccount);
  } catch (error) {
    console.log(error);
  }
};

//Get user's banks
export const getBanks = async ({ userId }: GetBanksParams) => {
  try {
    const { database } = await createAdminClient();

    const banks = await database.listDocuments(
      DATABASE_ID!,
      BANK_COLLECTION_ID!,
      [Query.equal("userId", [userId])]
    );

    return parseStringify(banks.documents);
  } catch (error) {
    console.log(error);
  }
};

export const getInstitution = async ({
  institutionId,
}: GetInstitutionParams) => {
  try {
    const institutionResponse = await plaidClient.institutionsGetById({
      institution_id: institutionId,
      country_codes: ["US"] as CountryCode[],
    });

    const institution = institutionResponse.data.institution;

    return parseStringify(institution);
  } catch (error) {
    console.log(error);
  }
};

export const getAccounts = async ({ userId }: GetAccountsParams) => {
  try {
    const banks = await getBanks({ userId });
    if (!banks) throw new Error("Banks not found");

    const accounts = await Promise.all(
      banks?.map(async (bank: Bank) => {
        //get each account from plaid
        const accountResponse = await plaidClient.accountsGet({
          access_token: bank.accessToken,
        });
        const accountData = accountResponse.data.accounts[0];

        //get institution info from plaid
        const institution = await getInstitution({
          institutionId: accountResponse.data.item.institution_id!,
        });

        const account = {
          id: accountData.account_id,
          availableBalance: accountData.balances.available!,
          currentBalance: accountData.balances.current!,
          institutionId: institution.institution_id,
          name: accountData.name,
          officialName: accountData.official_name,
          mask: accountData.mask!,
          type: accountData.type as string,
          subtype: accountData.subtype! as string,
          appwriteItemId: bank.$id,
          shareableId: bank.shareableId,
        };

        return account;
      })
    );

    const totalBanks = accounts.length;
    const totalCurrentBalance = accounts.reduce((total, account) => {
      return total + account.currentBalance;
    }, 0);

    return parseStringify({ data: accounts, totalBanks, totalCurrentBalance });
  } catch (error) {
    console.log(error);
  }
};
