'use client';
export default function DashboardSummary({ transactions }) {
  const total = transactions.reduce((sum, tx) => sum + Number(tx.amount), 0);

  const recent = [...transactions]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

  const categoryTotals = {};
  transactions.forEach(tx => {
    const category = tx.category || 'Other';
    categoryTotals[category] = (categoryTotals[category] || 0) + Number(tx.amount);
  });

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
      <div className="bg-blue-100 p-4 rounded shadow">
        <h3 className="font-bold text-lg">Total Expenses</h3>
        <p className="text-2xl font-semibold mt-2">₹{total.toFixed(2)}</p>
      </div>

      <div className="bg-green-100 p-4 rounded shadow">
        <h3 className="font-bold text-lg">Recent Transactions</h3>
        <ul className="text-sm mt-2 space-y-1">
          {recent.map(tx => (
            <li key={tx._id}>
              {tx.description} - ₹{tx.amount} ({tx.category})
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-yellow-100 p-4 rounded shadow">
        <h3 className="font-bold text-lg">Category Totals</h3>
        <ul className="text-sm mt-2 space-y-1">
          {Object.entries(categoryTotals).map(([cat, amount]) => (
            <li key={cat}>
              {cat}: ₹{amount.toFixed(2)}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
