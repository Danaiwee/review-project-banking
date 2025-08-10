import React from "react";

import HeaderBox from "@/components/HeaderBox";
import RecentTransaction from "@/components/RecentTransactions";
import RightSidebar from "@/components/RightSidebar";
import TotalBalanceBox from "@/components/TotalBalanceBox";
import { ACCOUNTS, AUTHUSER, TRANSACTIONS } from "@/constants";
import { getLoggedInUser } from "@/lib/appwrite";

const HomePage = async ({ searchParams }: SearchParamsProps) => {
  const loggedIn = await getLoggedInUser();

  console.log(loggedIn);

  const { id } = await searchParams;

  const authUser = AUTHUSER;
  const totalBanks = 1;
  const totalCurrentBalance = 1250;
  const appwriteItemId = (id as string) || "item_def456";
  const currentPage = 1;

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
            accounts={ACCOUNTS}
            totalBanks={totalBanks}
            totalCurrentBalance={totalCurrentBalance}
          />
        </header>

        <RecentTransaction
          accounts={ACCOUNTS}
          transactions={TRANSACTIONS}
          appwriteItemId={appwriteItemId}
          page={currentPage}
        />
      </div>

      <RightSidebar
        user={authUser}
        transactions={TRANSACTIONS}
        banks={ACCOUNTS}
      />
    </section>
  );
};

export default HomePage;
