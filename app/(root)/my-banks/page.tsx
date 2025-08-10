import { redirect } from "next/navigation";
import React from "react";

import BankCard from "@/components/BankCard";
import HeaderBox from "@/components/HeaderBox";
import { ACCOUNTS } from "@/constants";
import { getAccounts } from "@/lib/actions/bank.actions";
import { getLoggedInUser } from "@/lib/appwrite";

const MyBanksPage = async () => {
  const authUser = await getLoggedInUser();
  if (!authUser) redirect("/sign-in");

  const accounts = await getAccounts({ userId: authUser.$id });
  if (!accounts) redirect("/sign-in");

  const username = `${authUser?.firstName} ${authUser?.lastName}`;
  const accountsData = accounts?.data;

  return (
    <section className="flex">
      <div className="my-banks">
        <HeaderBox
          title="My Bank Accounts"
          subtext="Effortly manage yout banking activities"
        />

        <div className="space-y-4">
          <h2 className="text-[18px] font-semibold text-gray-900">
            Your cards
          </h2>

          <div className="flex flex-wrap gap-6">
            {accountsData?.map((account: Account) => (
              <BankCard
                key={account.id}
                account={account}
                userName={username}
                showBalance
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MyBanksPage;
