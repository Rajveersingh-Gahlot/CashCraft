import { ResponsiveContainer, PieChart, Pie, Tooltip } from "recharts";

import "./CategoryBreakdown.css";

function CategoryBreakdown() {
  const categoryData = [
    { category: "Food", amount: 6000, fill: "#00e5ff" },
    { category: "Shopping", amount: 5000, fill: "#a855f7" },
    { category: "Transport", amount: 3000, fill: "#3b82f6" },
    { category: "Bills", amount: 4000, fill: "#f59e0b" },
    { category: "Entertainment", amount: 2000, fill: "#10b981" },
  ];

  // Calculate total expenses across all categories.
  const totalExpenses = categoryData.reduce(
    (total, item) => total + item.amount,
    0,
  );

  // Format amounts in Indian currency.
  function formatCurrency(value) {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(value);
  }

  // Calculate each category's percentage of total expenses.
  function calculatePercentage(amount) {
    if (totalExpenses === 0) {
      return 0;
    }

    return ((amount / totalExpenses) * 100).toFixed(1);
  }

  return (
    <div className="category-breakdown">
      <div className="category-breakdown-header">
        <div>
          <h4>Expense Categories</h4>
          <p>See where your money is going.</p>
        </div>
      </div>

      <div className="category-breakdown-content">
        {/* Donut chart */}
        <div className="category-chart-container">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={categoryData}
                dataKey="amount"
                nameKey="category"
                cx="50%"
                cy="50%"
                innerRadius="62%"
                outerRadius="88%"
                paddingAngle={3}
                stroke="none"
              />

              <Tooltip
                formatter={(value, name) => [
                  formatCurrency(Number(value)),
                  name,
                ]}
                contentStyle={{
                  backgroundColor: "var(--bg-tertiary)",
                  border: "1px solid var(--border-color)",
                  borderRadius: "10px",
                  color: "var(--text-primary)",
                }}
              />
            </PieChart>
          </ResponsiveContainer>

          {/* Total displayed in the center of the donut */}
          <div className="category-chart-center">
            <span>Total Spent</span>
            <strong>{formatCurrency(totalExpenses)}</strong>
          </div>
        </div>

        {/* Category details */}
        <div className="category-legend">
          {categoryData.map((item) => (
            <div className="category-legend-item" key={item.category}>
              <div className="category-legend-info">
                <span
                  className="category-color-indicator"
                  style={{ backgroundColor: item.fill }}
                ></span>

                <span className="category-name">{item.category}</span>
              </div>

              <div className="category-legend-values">
                <strong>{formatCurrency(item.amount)}</strong>
                <span>{calculatePercentage(item.amount)}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CategoryBreakdown;
