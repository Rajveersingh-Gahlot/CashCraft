import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

import "./MonthlyTrend.css";

function MonthlyTrend() {
  const monthlyData = [
    { month: "Jan", income: 45000, expenses: 22000 },
    { month: "Feb", income: 52000, expenses: 28000 },
    { month: "Mar", income: 48000, expenses: 25000 },
    { month: "Apr", income: 60000, expenses: 32000 },
    { month: "May", income: 55000, expenses: 30000 },
    { month: "Jun", income: 65000, expenses: 35000 },
    { month: "Jul", income: 62000, expenses: 33000 },
    { month: "Aug", income: 70000, expenses: 38000 },
  ];

  const savingsData = monthlyData.map((item) => ({
    month: item.month,
    savings: item.income - item.expenses,
  }));

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
    <div className="monthly-trend">
      <div className="monthly-trend-header">
        <div>
          <h4>Monthly Net Savings</h4>
          <p>Track how much money you save each month.</p>
        </div>

        <span className="trend-period">8 MONTHS</span>
      </div>

      <div className="monthly-trend-chart">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={savingsData}
            margin={{ top: 15, right: 12, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="savingsGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#22d3ee" stopOpacity={0.38} />
                <stop offset="55%" stopColor="#8b5cf6" stopOpacity={0.16} />
                <stop offset="100%" stopColor="#8b5cf6" stopOpacity={0.01} />
              </linearGradient>
            </defs>

            <CartesianGrid
              stroke="#273449"
              strokeDasharray="4 5"
              vertical={false}
            />

            <XAxis
              dataKey="month"
              tick={{ fill: "#a5b4c8", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
              dy={10}
            />

            <YAxis
              domain={[0, 35000]}
              ticks={[0, 8000, 16000, 24000, 32000]}
              tickFormatter={formatAxisCurrency}
              tick={{ fill: "#94a3b8", fontSize: 11 }}
              axisLine={false}
              tickLine={false}
              width={48}
            />

            <Tooltip
              formatter={(value) => [
                formatCurrency(Number(value)),
                "Net Savings",
              ]}
              contentStyle={{
                backgroundColor: "#172238",
                border: "1px solid #33465f",
                borderRadius: "12px",
                color: "#f8fafc",
                boxShadow: "0 8px 24px rgba(0,0,0,0.35)",
              }}
              labelStyle={{
                color: "#22d3ee",
                fontWeight: 600,
                marginBottom: 5,
              }}
              itemStyle={{ color: "#e2e8f0" }}
              cursor={{
                stroke: "#64748b",
                strokeDasharray: "4 4",
              }}
            />

            <Area
              type="monotone"
              dataKey="savings"
              name="Net Savings"
              stroke="#22d3ee"
              strokeWidth={3}
              fill="url(#savingsGradient)"
              dot={{
                r: 3,
                fill: "#22d3ee",
                stroke: "#0f172a",
                strokeWidth: 2,
              }}
              activeDot={{
                r: 7,
                fill: "#22d3ee",
                stroke: "#ffffff",
                strokeWidth: 2,
              }}
              animationDuration={1000}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default MonthlyTrend;
