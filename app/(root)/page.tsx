import { redirect } from "next/navigation";
import React from "react";

import HeaderBox from "@/components/HeaderBox";
import RecentTransaction from "@/components/RecentTransactions";
import RightSidebar from "@/components/RightSidebar";
import TotalBalanceBox from "@/components/TotalBalanceBox";
import { ACCOUNTS, TRANSACTIONS } from "@/constants";
import { getAccounts } from "@/lib/actions/bank.actions";
import { getLoggedInUser } from "@/lib/appwrite";

const HomePage = async ({ searchParams }: SearchParamsProps) => {
  const authUser = await getLoggedInUser();
  if (!authUser) redirect("/sign-in");

  const accounts = await getAccounts({ userId: authUser.$id });
  if (!accounts) redirect("/sign-in");

  const accountsData = accounts?.data;
  const totalBanks = accounts?.totalBanks;
  const totalCurrentBalance = accounts?.totalCurrentBalance;

  const { id } = await searchParams;
  const appwriteItemId = (id as string) || accountsData[0]?.appwriteItemId;
  const currentPage = 1;

  console.log("auth user: ", authUser);
  console.log("accounts", accounts);

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
          transactions={TRANSACTIONS}
          appwriteItemId={appwriteItemId}
          page={currentPage}
        />
      </div>

      <RightSidebar
        user={authUser}
        transactions={TRANSACTIONS}
        banks={accountsData}
      />
    </section>
  );
};

export default HomePage;
