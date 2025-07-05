import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export default function ExpenseChart({ transactions }) {
  const monthlyData = {};

  transactions.forEach(({ amount, date }) => {
    const month = new Date(date).toLocaleString('default', { month: 'short', year: 'numeric' });
    monthlyData[month] = (monthlyData[month] || 0) + Number(amount);
  });

  const data = Object.keys(monthlyData).map(key => ({ month: key, amount: monthlyData[key] }));

  return (
    <div className="bg-white shadow rounded p-4">
      <h2 className="text-xl font-semibold mb-4">Monthly Expenses</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="amount" fill="#60a5fa" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
