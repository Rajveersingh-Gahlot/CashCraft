import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllTransactions } from "../../services/transactionService";
import "./RecentTransactions.css";

function RecentTransactions() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchRecentTransactions() {
      try {
        const data = await getAllTransactions();

        const sortedTransactions = [...data]
          .sort(
            (a, b) => new Date(b.transactionDate) - new Date(a.transactionDate),
          )
          .slice(0, 5);

        setTransactions(sortedTransactions);
      } catch (err) {
        console.error("Failed to fetch recent transactions:", err);
        setError("Unable to load recent transactions.");
      } finally {
        setLoading(false);
      }
    }

    fetchRecentTransactions();
  }, []);

  function formatCurrency(amount) {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  }

  function formatDate(date) {
    return new Date(date + "T00:00:00").toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  }

  return (
    <div className="recent-transactions">
      <div className="recent-transactions-header">
        <div>
          <h4>Latest Activity</h4>
          <p>Your five most recent financial transactions.</p>
        </div>

        <Link to="/transactions" className="view-all-link">
          View All <span>→</span>
        </Link>
      </div>

      {loading ? (
        <p>Loading recent transactions...</p>
      ) : error ? (
        <p>{error}</p>
      ) : transactions.length === 0 ? (
        <p>No transactions available yet.</p>
      ) : (
        <div className="recent-transactions-list">
          {transactions.map((transaction) => (
            <div className="transaction-row" key={transaction.id}>
              <div className="transaction-info">
                <div
                  className={`transaction-icon ${
                    transaction.transactionType === "INCOME"
                      ? "income-icon"
                      : "expense-icon"
                  }`}
                >
                  {transaction.transactionType === "INCOME" ? "↙" : "↗"}
                </div>

                <div className="transaction-details">
                  <h5>{transaction.description}</h5>
                  <span>{transaction.category}</span>
                </div>
              </div>

              <div className="transaction-date">
                {formatDate(transaction.transactionDate)}
              </div>

              <div className="transaction-amount">
                <span
                  className={`transaction-type ${
                    transaction.transactionType === "INCOME"
                      ? "income-type"
                      : "expense-type"
                  }`}
                >
                  {transaction.transactionType === "INCOME"
                    ? "Income"
                    : "Expense"}
                </span>

                <strong
                  className={
                    transaction.transactionType === "INCOME"
                      ? "income-amount"
                      : "expense-amount"
                  }
                >
                  {transaction.transactionType === "INCOME" ? "+" : "-"}
                  {formatCurrency(transaction.amount)}
                </strong>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default RecentTransactions;
