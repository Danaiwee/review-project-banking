"use server";

import { ID, Query } from "node-appwrite";

import { createAdminClient } from "../appwrite";
import { plaidClient } from "../plaid";
import { parseStringify } from "../utils";

const {
  APPWRITE_DATABASE_ID: DATABASE_ID,
  APPWRITE_TRANSACTION_COLLECTION_ID: TRANSACTION_COLLECTION_ID,
} = process.env;

export const createTranaction = async (
  transactionData: createTransactionParams
) => {
  try {
    const { database } = await createAdminClient();

    const newTransaction = await database.createDocument(
      DATABASE_ID!,
      TRANSACTION_COLLECTION_ID!,
      ID.unique(),
      {
        channel: "online",
        category: "Transfer",
        ...transactionData,
      }
    );
    if (!newTransaction) throw new Error("Error in create transaction");

    return parseStringify(newTransaction);
  } catch (error) {
    console.log(error);
  }
};

export const getSampleTransactions = async ({
  accessToken,
}: GetSampleTransactionsParams) => {
  let hasmore = true;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let transactions: any = [];
  let cursor: string | undefined = undefined;

  try {
    while (hasmore) {
      const response = await plaidClient.transactionsSync({
        access_token: accessToken,
        cursor,
      });

      const data = response.data;

      transactions = response.data.added.map((transaction) => ({
        id: transaction.transaction_id,
        name: transaction.name,
        paymentChannel: transaction.payment_channel,
        type: transaction.payment_channel,
        accountId: transaction.account_id,
        amount: transaction.amount,
        pending: transaction.pending,
        category: transaction.category ? transaction.category[0] : "",
        date: transaction.date,
        image: transaction.logo_url,
      }));

      hasmore = data.has_more;
      cursor = data.next_cursor;
    }

    return parseStringify(transactions);
  } catch (error) {
    console.log(error);
  }
};

export const getTransactions = async ({
  appwriteItemId,
}: GetTransactionsParams) => {
  try {
    const { database } = await createAdminClient();

    const senderTransactions = await database.listDocuments(
      DATABASE_ID!,
      TRANSACTION_COLLECTION_ID!,
      [
        Query.equal("senderBankId", appwriteItemId),
        Query.orderDesc("$createdAt"),
      ]
    );

    const receiverTransactions = await database.listDocuments(
      DATABASE_ID!,
      TRANSACTION_COLLECTION_ID!,
      [
        Query.equal("receiverBankId", appwriteItemId),
        Query.orderDesc("$createdAt"),
      ]
    );

    const totalTransactions =
      senderTransactions.total + receiverTransactions.total;

    const transactions = [
      ...senderTransactions.documents,
      ...receiverTransactions.documents,
    ].sort(
      (a, b) =>
        new Date(b.$createdAt).getTime() - new Date(a.$createdAt).getTime()
    );

    return parseStringify({
      totalTransactions,
      transactions,
    });
  } catch (error) {
    console.log(error);
  }
};
