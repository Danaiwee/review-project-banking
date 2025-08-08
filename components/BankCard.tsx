import Image from "next/image";
import Link from "next/link";

import { formatAmount } from "@/lib/utils";

import ShareableCopy from "./ShareableCopy";

interface BankCardProps {
  account: Account;
  userName: string;
  showBalance?: boolean;
}

const BankCard = ({
  account,
  userName,
  showBalance = false,
}: BankCardProps) => {
  return (
    <div className="flex flex-col">
      <Link
        href={`/transaction-history/?id=${account.appwriteItemId}`}
        className="bank-card bg-bank-gradient shadow-md"
      >
        <div className="bank-card_content  bg-bank-gradient">
          <div>
            <h1 className="text-[14px] font-semibold text-white">
              {account.name || userName}
            </h1>
            <p className="font-ibm-plex-serif font-black text-white text-[14px]">
              {formatAmount(account.currentBalance)}
            </p>
          </div>

          <article className="flex flex-col gap-2">
            <div className="flex justify-between">
              <h1 className="text-[12px] font-semibold text-white">
                {userName}
              </h1>
              <h2 className="text-[12px] font-semibold text-white">●● / ●●</h2>
            </div>
            <p className="text-[14px] font-semibold tracking-[1.1px] text-white">
              ●●●● ●●●● ●●●● <span className="text-[14px]">1234</span>
            </p>
          </article>
        </div>

        <div className="bank-card_icon bg-bank-gradient">
          <Image src="/icons/Paypass.svg" width={20} height={24} alt="pay" />
          <Image
            src="/icons/mastercard.svg"
            width={45}
            height={32}
            alt="mastercard"
            className="ml-5"
          />
        </div>

        <Image
          src="/icons/lines.png"
          width={316}
          height={190}
          alt="lines"
          className="absolute top-0 left-0"
        />
      </Link>

      {showBalance && <ShareableCopy shareableId={account?.shareableId} />}
    </div>
  );
};

export default BankCard;
