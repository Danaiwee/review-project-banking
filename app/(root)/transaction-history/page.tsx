import React from "react";

import HeaderBox from "@/components/HeaderBox";
import TransactionTable from "@/components/TransactionTable";
import { ACCOUNTS, TRANSACTIONS } from "@/constants";
import { formatAmount } from "@/lib/utils";

const TransactionHistoryPage = ({ searchParams }: SearchParamsProps) => {
  const { id } = searchParams;
  const account = ACCOUNTS[0];

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
          <TransactionTable transactions={TRANSACTIONS} />
        </div>
      </div>
    </section>
  );
};

export default TransactionHistoryPage;
