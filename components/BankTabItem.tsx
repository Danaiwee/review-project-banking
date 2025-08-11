"use client";

import { useRouter, useSearchParams } from "next/navigation";

import { formUrlQuery } from "@/lib/url";
import { cn } from "@/lib/utils";

interface BankTabItemProps {
  account: Account;
  appwriteItemId: string;
}

const BankTabItem = ({ account, appwriteItemId }: BankTabItemProps) => {
  const searhcParams = useSearchParams();
  const router = useRouter();
  const isActive = appwriteItemId === account?.appwriteItemId;

  const handleBankChange = () => {
    const newUrl = formUrlQuery({
      params: searhcParams.toString(),
      key: "id",
      value: account?.appwriteItemId,
    });

    router.push(newUrl, { scroll: false });
  };

  return (
    <div
      className={cn("banktab-item", {
        "!border-sky-500 !border-b-2": isActive,
      })}
      onClick={handleBankChange}
    >
      <p
        className={cn(`text-16 line-clamp-1 flex-1 font-medium text-gray-500`, {
          " text-sky-500": isActive,
        })}
      >
        {account.name}
      </p>
    </div>
  );
};

export default BankTabItem;
