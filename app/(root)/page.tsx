import { Metadata } from "next";
import { redirect } from "next/navigation";
import React from "react";

import HeaderBox from "@/components/HeaderBox";
import RecentTransaction from "@/components/RecentTransactions";
import RightSidebar from "@/components/RightSidebar";
import TotalBalanceBox from "@/components/TotalBalanceBox";
import {
  getAccounts,
  getAccountWithTransactions,
} from "@/lib/actions/bank.actions";
import { getLoggedInUser } from "@/lib/appwrite";

export const metadata: Metadata = {
  title: "Next bank | Home page",
  description:
    "Welcome to Next Bank — your trusted partner for secure and convenient online banking. Manage accounts, track transactions, and access financial tools all in one place.",
};

const HomePage = async ({ searchParams }: SearchParamsProps) => {
  const authUser = await getLoggedInUser();
  if (!authUser) redirect("/sign-in");

  const accounts = await getAccounts({ userId: authUser.$id });
  if (!accounts) redirect("/sign-in");

  const accountsData = accounts?.data;
  const totalBanks = accounts?.totalBanks;
  const totalCurrentBalance = accounts?.totalCurrentBalance;

  const { id, page } = await searchParams;
  const appwriteItemId = (id as string) || accountsData[0]?.appwriteItemId;

  const account = await getAccountWithTransactions({ appwriteItemId });
  const transactions = account?.transactions;

  const currentPage = Number(page) || 1;


  return (
    <section className="home">
      <div className="home-content no-scrollbar">
        <header className="home-header">
          <HeaderBox
            type="greeting"
            title="Welcome"
            user={authUser}
            subtext="Access and manage your account and transactions efficiently."
          />

          <TotalBalanceBox
            accounts={accountsData}
            totalBanks={totalBanks}
            totalCurrentBalance={totalCurrentBalance}
          />
        </header>

        <RecentTransaction
          accounts={accountsData}
          transactions={transactions}
          appwriteItemId={appwriteItemId}
          page={currentPage}
        />
      </div>

      <RightSidebar
        user={authUser}
        transactions={transactions}
        banks={accountsData}
      />
    </section>
  );
};

export default HomePage;
