import { Link } from "react-router-dom";
import "./RecentTransactions.css";

function RecentTransactions() {
  const transactions = [
    {
      id: 1,
      title: "Monthly Salary",
      category: "Salary",
      date: "Nov 08, 2026",
      amount: 45000,
      type: "INCOME",
    },
    {
      id: 2,
      title: "Grocery Shopping",
      category: "Food",
      date: "Nov 07, 2026",
      amount: 2500,
      type: "EXPENSE",
    },
    {
      id: 3,
      title: "Electricity Bill",
      category: "Utilities",
      date: "Nov 06, 2026",
      amount: 1800,
      type: "EXPENSE",
    },
    {
      id: 4,
      title: "Freelance Project",
      category: "Other Income",
      date: "Nov 05, 2026",
      amount: 8000,
      type: "INCOME",
    },
    {
      id: 5,
      title: "Restaurant Dinner",
      category: "Food",
      date: "Nov 04, 2026",
      amount: 1200,
      type: "EXPENSE",
    },
  ];

  function formatCurrency(amount) {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
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

      <div className="recent-transactions-list">
        {transactions.map((transaction) => (
          <div className="transaction-row" key={transaction.id}>
            <div className="transaction-info">
              <div
                className={`transaction-icon ${
                  transaction.type === "INCOME" ? "income-icon" : "expense-icon"
                }`}
              >
                {transaction.type === "INCOME" ? "↙" : "↗"}
              </div>

              <div className="transaction-details">
                <h5>{transaction.title}</h5>
                <span>{transaction.category}</span>
              </div>
            </div>

            <div className="transaction-date">{transaction.date}</div>

            <div className="transaction-amount">
              <span
                className={`transaction-type ${
                  transaction.type === "INCOME" ? "income-type" : "expense-type"
                }`}
              >
                {transaction.type === "INCOME" ? "Income" : "Expense"}
              </span>

              <strong
                className={
                  transaction.type === "INCOME"
                    ? "income-amount"
                    : "expense-amount"
                }
              >
                {transaction.type === "INCOME" ? "+" : "-"}
                {formatCurrency(transaction.amount)}
              </strong>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecentTransactions;
