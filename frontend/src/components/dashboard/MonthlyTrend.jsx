import { useEffect, useState } from "react";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

import { getMonthlySummary } from "../../services/dashboardService";

import "./MonthlyTrend.css";

function MonthlyTrend() {
  const [savingsData, setSavingsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchMonthlySavings() {
      try {
        const data = await getMonthlySummary();

        const formattedData = data.map((item) => ({
          month: item.month,
          savings:
            Number(item.totalIncome ?? 0) - Number(item.totalExpenses ?? 0),
        }));

        setSavingsData(formattedData);
      } catch (err) {
        console.error("Failed to fetch monthly savings:", err);
        setError("Unable to load monthly savings data.");
      } finally {
        setLoading(false);
      }
    }

    fetchMonthlySavings();
  }, []);

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

        <span className="trend-period">{savingsData.length} MONTHS</span>
      </div>

      {loading ? (
        <p>Loading monthly savings...</p>
      ) : error ? (
        <p>{error}</p>
      ) : savingsData.length === 0 ? (
        <p>No monthly savings data available yet.</p>
      ) : (
        <div className="monthly-trend-chart">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={savingsData}
              margin={{ top: 15, right: 12, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient
                  id="savingsGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
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
      )}
    </div>
  );
}

export default MonthlyTrend;
