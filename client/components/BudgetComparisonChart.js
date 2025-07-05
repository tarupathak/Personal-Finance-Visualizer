"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useMemo } from "react";

const CATEGORY_COLORS = {
  Actual: "#60a5fa",
  Budget: "#f87171",
};

const CATEGORY_LIST = [
  "Food",
  "Travel",
  "Bills",
  "Entertainment",
  "Shopping",
  "Health",
  "Other",
];

const CATEGORY_BUDGETS = {
  Food: 5000,
  Travel: 3000,
  Bills: 4000,
  Entertainment: 2500,
  Shopping: 3500,
  Health: 2000,
  Other: 1000,
};

export default function BudgetComparisonChart({ transactions }) {
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  const data = useMemo(() => {
    const totals = {};
    CATEGORY_LIST.forEach((cat) => {
      totals[cat] = 0;
    });
    transactions.forEach((tx) => {
      const txDate = new Date(tx.date);
      const cat = tx.category || "Other";
      if (
        txDate.getMonth() === currentMonth &&
        txDate.getFullYear() === currentYear
      ) {
        totals[cat] += Number(tx.amount);
      }
    });

    // Create chart data array
    return CATEGORY_LIST.map((cat) => ({
      category: cat,
      Actual: totals[cat],
      Budget: CATEGORY_BUDGETS[cat] || 0,
    }));
  }, [transactions, currentMonth, currentYear]);

  return (
    <div className="bg-white shadow rounded p-4 mt-6">
      <h2 className="text-xl font-semibold mb-4">
        Budget vs Actual (Current Month)
      </h2>
      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={data}>
          <XAxis dataKey="category" />
          <YAxis />
          <Tooltip
            formatter={(val) => `₹${val.toFixed(2)}`}
            labelFormatter={(label) => `Category: ${label}`}
          />
          <Legend />
          <Bar dataKey="Budget" fill={CATEGORY_COLORS.Budget} />
          <Bar dataKey="Actual" fill={CATEGORY_COLORS.Actual} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
