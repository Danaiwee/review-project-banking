import Image from "next/image";

import { cn, formatAmount, getAccountTypeColors } from "@/lib/utils";

interface BankInfoProps {
  account: Account;
  appwriteItemId: string;
  type: string;
}

const BankInfo = ({ account, appwriteItemId, type }: BankInfoProps) => {
  const colors = getAccountTypeColors(account?.type as AccountTypes);
  const isActive = account?.appwriteItemId === appwriteItemId;

  return (
    <div
      className={cn(`bank-info ${colors.bg}`, {
        "shadow-sm border-blue-700": type === "card" && isActive,
        "rounded-md": type === "card",
        "hover:shadow-sm cursor-pointer": type === "card",
      })}
    >
      <figure className={`flex-center h-fit rounded-full bg-blue-100`}>
        <Image
          src="/icons/connect-bank.svg"
          width={20}
          height={20}
          alt={account.subtype}
          className="m-2 min-w-5"
        />
      </figure>
      <div className="w-full flex flex-col flex-1 justify-center gap-1">
        <div className="bank-info_content">
          <h2
            className={`text-[16px] line-clamp-1 flex-1 font-bold text-blue-900 ${colors.title}`}
          >
            {account.name}
          </h2>
          {type === "full" && (
            <p
              className={`text-12 rounded-full px-3 py-1 font-medium text-blue-700 ${colors.subText} ${colors.lightBg}`}
            >
              {account.subtype}
            </p>
          )}
        </div>

        <p className={`text-16 font-medium text-blue-700 ${colors.subText}`}>
          {formatAmount(account.currentBalance)}
        </p>
      </div>
    </div>
  );
};

export default BankInfo;
