import {
  formatAmount,
  formatDateTime,
  getTransactionStatus,
  removeSpecialCharacters,
} from "@/lib/utils";

import CategoryBadge from "./CategoryBadge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

interface TransactionTableProps {
  transactions: Transaction[];
}

const TransactionTable = ({ transactions }: TransactionTableProps) => {
  return (
    <>
      <Table>
        <TableHeader className="bg-[#f9fafb]">
          <TableRow>
            <TableHead className="px-2">Transaction</TableHead>
            <TableHead className="px-2">Amount</TableHead>
            <TableHead className="px-2">Status</TableHead>
            <TableHead className="px-2">Date</TableHead>
            <TableHead className="px-2 max-md:hidden">Channel</TableHead>
            <TableHead className="px-2 max-md:hidden">Category</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {transactions.length > 0 &&
            transactions?.map((transaction) => {
              const status = getTransactionStatus(new Date(transaction.date));
              const amount = formatAmount(transaction.amount);

              const isDebit = transaction.type === "debit"; // pay
              const isCredit = transaction.type === "credit";// received

              return (
                <TableRow
                  key={transaction.id}
                  className={`${isDebit || amount[0] === "-" ? "bg-[#FFFBFA]" : "bg-[#F6FEF9]"} !hover:bg-none !border-b-DEFAULT h-20`}
                >
                  <TableCell className="max-w-[250px] pl-2 pr-10">
                    <div className="flex items-center gap-3">
                      <h1 className="text-[14px] truncate font-semibold text-[#344054]">
                        {removeSpecialCharacters(transaction.note)}
                      </h1>
                    </div>
                  </TableCell>

                  <TableCell
                    className={`pl-2 pr-10 font-semibold ${
                      isDebit || amount[0] === "-"
                        ? "text-[#f04438]"
                        : "text-[#039855]"
                    }`}
                  >
                    {isDebit ? `-${amount}` : isCredit ? amount : amount}
                  </TableCell>

                  <TableCell className="pl-2 pr-10">
                    <CategoryBadge category={status} />
                  </TableCell>

                  <TableCell className="min-w-32 pl-2 pr-10">
                    {formatDateTime(new Date(transaction.date)).dateTime}
                  </TableCell>

                  <TableCell className="pl-2 pr-10 capitalize min-w-24">
                    {transaction.paymentChannel}
                  </TableCell>

                  <TableCell className="pl-2 pr-10 max-md:hidden">
                    <CategoryBadge category={transaction.category} />
                  </TableCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>

      {transactions?.length === 0 && (
        <div className="w-full mt-10 flex-center text-gray-900">
          No transaction data
        </div>
      )}
    </>
  );
};

export default TransactionTable;
