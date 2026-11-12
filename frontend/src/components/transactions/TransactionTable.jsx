import "./TransactionTable.css";

const currencyFormatter = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

const dateFormatter = new Intl.DateTimeFormat("en-IN", {
  day: "2-digit",
  month: "short",
  year: "numeric",
});

function TransactionTable({ transactions, onEdit, onDelete }) {
  if (transactions.length === 0) {
    return (
      <div className="transaction-empty-state">
        <div className="empty-state-icon">⌕</div>
        <h3>No transactions found</h3>
        <p>Try changing your search or filter criteria.</p>
      </div>
    );
  }

  return (
    <div className="transaction-table-container">
      <div className="transaction-table-header">
        <div>
          <h3>Transaction History</h3>
          <p>{transactions.length} transactions found</p>
        </div>
      </div>

      <div className="transaction-table-scroll">
        <table className="transaction-table">
          <thead>
            <tr>
              <th>Description</th>
              <th>Category</th>
              <th>Date</th>
              <th>Type</th>
              <th>Amount</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {transactions.map((transaction) => {
              const transactionType = transaction.transactionType.toLowerCase();

              return (
                <tr key={transaction.id}>
                  <td>
                    <div className="transaction-description">
                      <span
                        className={`transaction-category-icon ${transactionType}`}
                      >
                        {transaction.category.charAt(0)}
                      </span>

                      <span>{transaction.description}</span>
                    </div>
                  </td>

                  <td>
                    <span className="transaction-category">
                      {transaction.category}
                    </span>
                  </td>

                  <td className="transaction-date">
                    {dateFormatter.format(
                      new Date(`${transaction.transactionDate}T00:00:00`),
                    )}
                  </td>

                  <td>
                    <span className={`transaction-type ${transactionType}`}>
                      {transaction.transactionType}
                    </span>
                  </td>

                  <td>
                    <span className={`transaction-amount ${transactionType}`}>
                      {transaction.transactionType === "EXPENSE" ? "-" : "+"}
                      {currencyFormatter.format(transaction.amount)}
                    </span>
                  </td>

                  <td>
                    <div className="transaction-actions">
                      <button
                        type="button"
                        className="edit-transaction-btn"
                        onClick={() => onEdit?.(transaction)}
                        aria-label={`Edit ${transaction.description}`}
                      >
                        Edit
                      </button>

                      <button
                        type="button"
                        className="delete-transaction-btn"
                        onClick={() => onDelete?.(transaction)}
                        aria-label={`Delete ${transaction.description}`}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TransactionTable;
