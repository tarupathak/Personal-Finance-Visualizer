import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';

const CATEGORY_COLORS = {
  Food: '#f87171',
  Travel: '#34d399',
  Bills: '#facc15',
  Entertainment: '#60a5fa',
  Shopping: '#c084fc',
  Health: '#f97316',
  Other: '#9ca3af'
};

export default function ExpenseChart({ transactions }) {
  const grouped = {};

  // Group transactions by month and category
  transactions.forEach(({ amount, date, category = 'Other' }) => {
    const month = new Date(date).toLocaleString('default', {
      month: 'short',
      year: 'numeric'
    });

    if (!grouped[month]) grouped[month] = {};

    if (!grouped[month][category]) {
      grouped[month][category] = 0;
    }

    grouped[month][category] += Number(amount);
  });

  // Prepare data for Recharts
  const data = Object.entries(grouped).map(([month, categories]) => ({
    month,
    ...categories
  }));

  const allCategories = Object.keys(CATEGORY_COLORS);

  return (
    <div className="bg-white shadow rounded p-4">
      <h2 className="text-xl font-semibold mb-4">Monthly Expenses by Category</h2>
      <ResponsiveContainer width="100%" height={320}>
        <BarChart data={data}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip
            formatter={(value) => `₹${value.toFixed(2)}`}
            labelFormatter={(label) => `Month: ${label}`}
          />
          <Legend />
          {allCategories.map((cat) => (
            <Bar
              key={cat}
              dataKey={cat}
              stackId="expenses"
              fill={CATEGORY_COLORS[cat]}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
