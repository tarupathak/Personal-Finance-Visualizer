'use client';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const CATEGORY_COLORS = {
  Food: '#f87171',
  Travel: '#34d399',
  Bills: '#facc15',
  Entertainment: '#60a5fa',
  Shopping: '#c084fc',
  Health: '#f97316',
  Other: '#9ca3af',
  Over: '#ef4444', 
};

export default function CategoryPieChart({ transactions, budgets = [] }) {
  const categoryTotals = {};

  transactions.forEach((tx) => {
    const category = tx.category || 'Other';
    categoryTotals[category] = (categoryTotals[category] || 0) + Number(tx.amount);
  });

  const budgetMap = {};
  budgets.forEach((b) => {
    budgetMap[b.category] = Number(b.amount);
  });

  const data = Object.entries(categoryTotals).map(([category, spent]) => {
    const budget = budgetMap[category] || 0;
    const isOver = budget > 0 && spent > budget;
    return {
      name: category,
      value: spent,
      isOver,
    };
  });

  return (
    <div className="bg-white shadow rounded p-4">
      <h2 className="text-xl font-semibold mb-4">Category Breakdown</h2>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={100}
            dataKey="value"
            nameKey="name"
            label
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={
                  entry.isOver
                    ? CATEGORY_COLORS.Over
                    : CATEGORY_COLORS[entry.name] || '#ccc'
                }
              />
            ))}
          </Pie>
          <Tooltip
            formatter={(value, name) => [`₹${value}`, name]}
          />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
