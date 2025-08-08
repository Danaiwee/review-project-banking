"use client";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

import { BACKGROUND_CHART_COLORS } from "@/constants";

ChartJS.register(ArcElement, Tooltip, Legend);

interface DoughnutChartProps {
  accounts: Account[];
}

const DoughnutChart = ({ accounts }: DoughnutChartProps) => {
  const currentBalances = accounts.map((account) => account.currentBalance);
  const bankNames = accounts.map((account) => account.name);

  const data = {
    datasets: [
      {
        label: "Balance",
        data: currentBalances,
        backgroundColor: BACKGROUND_CHART_COLORS,
      },
    ],
    labels: bankNames,
  };

  return (
    <Doughnut
      data={data}
      options={{
        cutout: "60%",
        plugins: {
          legend: {
            display: false,
          },
        },
      }}
    />
  );
};

export default DoughnutChart;
