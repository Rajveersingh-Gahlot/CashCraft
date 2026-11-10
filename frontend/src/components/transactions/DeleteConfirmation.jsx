import "./DeleteConfirmation.css";

const currencyFormatter = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 2,
});

function DeleteConfirmation({ transaction, onConfirm, onCancel }) {
  if (!transaction) {
    return null;
  }
  return (
    <div className="delete-confirmation-overlay">
      <div
        className="delete-confirtmation-modal"
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="delete-dialog-title"
        aria-describedby="delete-dialog-description"
      >
        <div className="delete-warning-icon">!</div>

        <div className="delete-confirmation-content">
          <h2 id="delete-dialog-title">Delete Transaction?</h2>

          <p id="delete-dialog-description">
            Are you sure you want to delete this transaction? This action cannot
            be undone.
          </p>

          <div className="delete-transaction-details">
            <div>
              <span>Description</span>
              <strong>{transaction.description}</strong>
            </div>

            <div>
              <span>Category</span>
              <strong>{transaction.category}</strong>
            </div>

            <div>
              <span>Amount</span>
              <strong className={`delete-amount ${transaction.type}`}>
                {transaction.type === "expense" ? "-" : "+"}
                {currencyFormatter.format(transaction.amount)}
              </strong>
            </div>
          </div>
        </div>

        <div className="delete-confirmation-actions">
          <button
            type="button"
            className="delete-cancel-btn"
            onClick={onCancel}
          >
            Cancel
          </button>

          <button
            type="button"
            className="delete-confirm-btn"
            onClick={onConfirm}
          >
            Delete Transaction
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteConfirmation;
