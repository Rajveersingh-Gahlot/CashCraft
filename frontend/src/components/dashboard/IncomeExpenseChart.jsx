import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

import "./IncomeExpenseChart.css";

function IncomeExpenseChart() {
  const monthlyData = [
    { month: "Jan", income: 45000, expenses: 22000 },
    { month: "Feb", income: 52000, expenses: 28000 },
    { month: "Mar", income: 48000, expenses: 25000 },
    { month: "Apr", income: 60000, expenses: 32000 },
    { month: "May", income: 55000, expenses: 30000 },
    { month: "Jun", income: 65000, expenses: 35000 },
  ];

  function formatCurrency(value) {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(value);
  }

  function formatAxisCurrency(value) {
    return new Intl.NumberFormat("en-IN", {
      notation: "compact",
      maximumFractionDigits: 1,
    }).format(value);
  }

  return (
    <div className="income-expense-chart">
      <div className="income-expense-chart-header">
        <div>
          <h4>Income vs Expenses</h4>
          <p>Compare your monthly income and spending</p>
        </div>
      </div>

      <div className="chart-container">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={monthlyData}
            margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
            barGap={6}
          >
            <CartesianGrid
              stroke="var(--border-color)"
              strokeDasharray="3 3"
              vertical={false}
            />
            <XAxis
              dataKey="month"
              stroke="var(--text-muted)"
              tick={{ fill: "var(--text-secondary)", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />

            <YAxis
              stroke="var(--text-muted)"
              tickFormatter={formatAxisCurrency}
              tick={{ fill: "var(--text-muted)", fontSize: 11 }}
              axisLine={false}
              tickLine={false}
              width={48}
            />

            <Tooltip
              formatter={(value, name) => [
                formatCurrency(Number(value)),
                name === "income" ? "Income" : "Expenses",
              ]}
              contentStyle={{
                backgroundColor: "var(--bg-tertiary)",
                border: "1px solid var(--border-color)",
                borderRadius: "10px",
                color: "var(--text-primary)",
              }}
              labelStyle={{ color: "var(--text-primary)" }}
              cursor={{ fill: "rgba(148, 163, 184, 0.08)" }}
            />

            <Legend
              verticalAlign="top"
              align="right"
              height={36}
              formatter={(value) =>
                value === "income" ? "Income" : "Expenses"
              }
              wrapperStyle={{
                fontSize: "12px",
                color: "var(--text-secondary)",
              }}
            />

            <Bar
              dataKey="income"
              fill="var(--status-success)"
              radius={[5, 5, 0, 0]}
              maxBarSize={32}
            />

            <Bar
              dataKey="expenses"
              fill="var(--accent-purple)"
              radius={[5, 5, 0, 0]}
              maxBarSize={32}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default IncomeExpenseChart;
