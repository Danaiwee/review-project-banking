import { redirect } from "next/navigation";
import React from "react";

import HeaderBox from "@/components/HeaderBox";
import TransactionTable from "@/components/TransactionTable";
import {
  getAccounts,
  getAccountWithTransactions,
} from "@/lib/actions/bank.actions";
import { getLoggedInUser } from "@/lib/appwrite";
import { formatAmount } from "@/lib/utils";

const TransactionHistoryPage = async ({ searchParams }: SearchParamsProps) => {
  const authUser = await getLoggedInUser();
  if (!authUser) redirect("/sign-in");

  const accounts = await getAccounts({ userId: authUser.$id });
  if (!accounts) redirect("/sign-in");

  const accountsData = accounts?.data;

  const { id } = await searchParams;
  const appwriteItemId = (id as string) || accountsData[0]?.appwriteItemId;

  const accountAndTransactions = await getAccountWithTransactions({
    appwriteItemId,
  });
  const account = accountAndTransactions?.account;
  const transactions = accountAndTransactions.transactions;

  console.log(account);

  return (
    <section className="transactions">
      <div className="transactions-header">
        <HeaderBox
          title="Transaction History"
          subtext="See your bank details and transactions."
        />
      </div>

      <div className="space-y-6">
        <div className="transactions-account">
          <div className="flex flex-col gap-2">
            <h2 className="text-18 font-bold text-white">{account?.name}</h2>
            <p className="text-14 text-blue-25">{account?.officialName}</p>
            <p className="text-14 font-semibold tracking-[1.1px] text-white">
              ●●●● ●●●● ●●●● {account?.mask}
            </p>
          </div>

          <div className="transactions-account-balance">
            <p className="text-14">Current balance</p>
            <p className="text-24 text-center font-bold">
              {formatAmount(account?.currentBalance)}
            </p>
          </div>
        </div>

        <div className="flex w-full flex-col gap-6">
          <TransactionTable transactions={transactions} />
        </div>
      </div>
    </section>
  );
};

export default TransactionHistoryPage;
