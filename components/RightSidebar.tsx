import Image from "next/image";
import Link from "next/link";

import { countTransactionCategories } from "@/lib/utils";

import BankCard from "./BankCard";
import Category from "./Category";
import PlaidLink from "./PlaidLink";

interface RightSidebarProps {
  user: User;
  transactions: Transaction[];
  banks: Account[];
}

const RightSidebar = ({ user, transactions, banks }: RightSidebarProps) => {
  const categories: CategoryCount[] = countTransactionCategories(transactions);
  return (
    <aside className="right-sidebar no-scrollbar">
      <section className="flex flex-col pb-8">
        <div className="profile-banner bg-bank-mesh" />
        <div className="profile">
          <div className="profile-img">
            <span className="text-5xl font-bold text-blue-500">
              {user.firstName[0]}
            </span>
          </div>

          <div className="profile-details">
            <h1 className="profile-name">
              {user.firstName} {user.lastName}
            </h1>
            <p className="profile-email">{user.email}</p>
          </div>
        </div>
      </section>

      <section className="banks">
        <div className="flex w-full justify-between">
          <h2 className="header-2">My Banks</h2>
          <PlaidLink user={user} variant="ghost" />
        </div>

        {banks?.length > 0 && (
          <div className="relative flex flex-1 flex-col items-center justify-center gap-5">
            <div className="relative z-10 flex flex-col gap-2">
              {banks?.map((account) => (
                <BankCard
                  key={account.id}
                  account={account}
                  userName={`${user.firstName} ${user.lastName}`}
                  showBalance={false}
                />
              ))}
            </div>
          </div>
        )}

        <div className="mt-10 flex flex-1 flex-col gap-6">
          <h2 className="text-[18px] font-semibold text-gray-900">
            Top categories
          </h2>

          <div className="space-y-5">
            {categories.map((category) => (
              <Category key={category.name} category={category} />
            ))}
          </div>
        </div>
      </section>
    </aside>
  );
};

export default RightSidebar;
