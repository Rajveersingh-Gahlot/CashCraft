import { useEffect, useState } from "react";
import { getDashboardSummary } from "../../services/dashboardService";
import "./SummaryCards.css";

function SummaryCards() {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const data = await getDashboardSummary();
        setSummary(data);
      } catch (err) {
        setError(
          err.response?.data?.message || "Unable to load financial summary.",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchSummary();
  }, []);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 2,
    }).format(amount ?? 0);
  };

  const summaryData = [
    {
      title: "Total Balance",
      amount: summary?.balance,
      description: "Available balance",
      icon: "₹",
      type: "balance",
    },
    {
      title: "Total Income",
      amount: summary?.totalIncome,
      description: "Total money received",
      icon: "↗",
      type: "income",
    },
    {
      title: "Total Expenses",
      amount: summary?.totalExpenses,
      description: "Total money spent",
      icon: "↘",
      type: "expense",
    },
  ];

  if (loading) {
    return (
      <div className="dashboard-placeholder">Loading financial summary...</div>
    );
  }

  if (error) {
    return <div className="dashboard-placeholder">{error}</div>;
  }

  return (
    <div className="summary-cards">
      {summaryData.map((item) => (
        <div className={`summary-card ${item.type}`} key={item.type}>
          <div className="summary-card-top">
            <span className="summary-card-title">{item.title}</span>
            <div className="summary-card-icon">{item.icon}</div>
          </div>

          <h3 className="summary-card-amount">{formatCurrency(item.amount)}</h3>

          <p className="summary-card-description">{item.description}</p>
        </div>
      ))}
    </div>
  );
}

export default SummaryCards;
