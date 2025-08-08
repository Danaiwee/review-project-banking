import AnimatedCounter from "./AnimatedCounter";
import DoughnutChart from "./DoughnutChart";

interface TotalBalanceProps {
  accounts: Account[];
  totalBanks: number;
  totalCurrentBalance: number;
}

const TotalBalanceBox = ({
  accounts,
  totalBanks,
  totalCurrentBalance,
}: TotalBalanceProps) => {
  return (
    <section className="total-balance">
      <div className="total-balance-chart">
        <DoughnutChart accounts={accounts} />
      </div>

      <div className="flex flex-col gap-4">
        <h2 className="text-lg font-semibold text-gray-900">
          Bank Account: {totalBanks}
        </h2>

        <div className="flex flex-col gap-1">
          <p className="total-balance-label">Total Current Balance</p>
          <div className="total-balance-amount flex items-center justify-center gap-2">
            <AnimatedCounter amount={totalCurrentBalance} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default TotalBalanceBox;
