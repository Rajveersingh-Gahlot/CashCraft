import { ResponsiveContainer, PieChart, Pie, Tooltip, Cell } from "recharts";

import { useEffect, useState } from "react";

import "./CategoryBreakdown.css";
import { getCategorySummary } from "../../services/dashboardService";

const categoryColors = {
  Food: "#00E5FF",
  Groceries: "#F97316",
  "Food & Groceries": "#F97316",
  Shopping: "#A855F7",
  Transport: "#3B82F6",
  Transportation: "#2563EB",
  Bills: "#F59E0B",
  Entertainment: "#10B981",
  Rent: "#EC4899",
  Education: "#8B5CF6",
  Healthcare: "#14B8A6",
  Salary: "#22C55E",
  Freelance: "#F97316",
};

const fallbackColors = [
  "#00E5FF",
  "#A855F7",
  "#3B82F6",
  "#F59E0B",
  "#10B981",
  "#EC4899",
  "#8B5CF6",
  "#14B8A6",
  "#F97316",
  "#84CC16",
  "#6366F1",
  "#E879F9",
];

function CategoryBreakdown() {
  const [categoryData, setCategoryData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchCategoryData() {
      try {
        const data = await getCategorySummary("EXPENSE");

        const formattedData = data.map((item, index) => ({
          category: item.category,
          amount: Number(item.totalAmount ?? 0),
          fill:
            categoryColors[item.category] ??
            fallbackColors[index % fallbackColors.length],
        }));

        setCategoryData(formattedData);
      } catch (err) {
        console.error("Failed to fetch category summary:", err);
        setError("Unable to load expense categories.");
      } finally {
        setLoading(false);
      }
    }

    fetchCategoryData();
  }, []);

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

      {loading ? (
        <p>Loading expense categories...</p>
      ) : error ? (
        <p>{error}</p>
      ) : categoryData.length === 0 ? (
        <p>No expense categories available yet.</p>
      ) : (
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
                >
                  {categoryData.map((item) => (
                    <Cell key={item.category} fill={item.fill} />
                  ))}
                </Pie>

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
      )}
    </div>
  );
}

export default CategoryBreakdown;
