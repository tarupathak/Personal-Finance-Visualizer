'use client';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const CATEGORY_COLORS = {
  Food: '#f87171',
  Travel: '#34d399',
  Bills: '#facc15',
  Entertainment: '#60a5fa',
  Shopping: '#c084fc',
  Health: '#f97316',
  Other: '#9ca3af'
};

export default function CategoryPieChart({ transactions }) {
  const categoryTotals = {};

  transactions.forEach(tx => {
    const category = tx.category || 'Other';
    categoryTotals[category] = (categoryTotals[category] || 0) + Number(tx.amount);
  });

  const data = Object.entries(categoryTotals).map(([category, value]) => ({
    name: category,
    value
  }));

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
                fill={CATEGORY_COLORS[entry.name] || '#ccc'}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
