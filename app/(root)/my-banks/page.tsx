import React from "react";

import BankCard from "@/components/BankCard";
import HeaderBox from "@/components/HeaderBox";
import { ACCOUNTS, AUTHUSER } from "@/constants";

const MyBanksPage = () => {
  const authUser = AUTHUSER;

  const username = `${authUser?.firstName} ${authUser?.lastName}`;

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
            {ACCOUNTS.map((account) => (
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
