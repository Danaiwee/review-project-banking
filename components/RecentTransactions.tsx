import Link from "next/link";

import BankInfo from "./BankInfo";
import BankTabItem from "./BankTabItem";
import Pagination from "./Pagination";
import TransactionTable from "./TransactionTable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

interface RecentTransactionsProps {
  accounts: Account[];
  transactions: Transaction[];
  page: number;
  appwriteItemId: string;
}

const RecentTransactions = ({
  accounts,
  transactions,
  page,
  appwriteItemId,
}: RecentTransactionsProps) => {
  const rowsPerPage = 1;
  const totalPages = Math.ceil(transactions?.length / rowsPerPage);

  const indexOfLastTransaction = Number(page) * rowsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - rowsPerPage;

  const currentTransactions = transactions.slice(
    indexOfFirstTransaction,
    indexOfLastTransaction
  );

  return (
    <section className="recent-transaction">
      <header className="flex items-center justify-between">
        <h2 className="recent-transactions-label">Recent transactions</h2>
        <Link
          href={`/transaction-history/?id=${appwriteItemId}`}
          className="view-all-btn"
        >
          View all
        </Link>
      </header>

      <Tabs defaultValue={appwriteItemId} className="w-full mt-5">
        <TabsList className="recent-transaction-tablist w-full">
          {accounts?.map((account: Account) => (
            <TabsTrigger key={account.id} value={account.appwriteItemId}>
              <BankTabItem
                key={account.appwriteItemId}
                account={account}
                appwriteItemId={appwriteItemId}
              />
            </TabsTrigger>
          ))}
        </TabsList>

        {accounts?.map((account: Account) => (
          <TabsContent
            value={account.appwriteItemId}
            key={account.id}
            className="space-y-4"
          >
            <BankInfo
              account={account}
              appwriteItemId={appwriteItemId}
              type="full"
            />

            <TransactionTable transactions={currentTransactions} />

            <Pagination page={page} totalPages={totalPages} />
          </TabsContent>
        ))}
      </Tabs>
    </section>
  );
};

export default RecentTransactions;
