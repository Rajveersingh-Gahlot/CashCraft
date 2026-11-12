import { useEffect, useState } from "react";
import "./TransactionForm.css";

const initialFormData = {
  amount: "",
  description: "",
  type: "expense",
  category: "",
  date: "",
};

const categories = {
  income: ["Salary", "Freelance", "Business", "Investment", "Other"],
  expense: [
    "Food",
    "Transport",
    "Shopping",
    "Bills",
    "Entertainment",
    "Health",
    "Education",
    "Other",
  ],
};

function TransactionForm({
  initialData,
  onSubmit,
  onCancel,
  isSubmitting,
  error,
}) {
  const [formData, setFormData] = useState({ ...initialFormData });

  useEffect(() => {
    if (initialData) {
      setFormData({
        amount: initialData.amount,
        description: initialData.description,
        type: initialData.transactionType.toLowerCase(),
        category: initialData.category,
        date: initialData.transactionDate,
      });
    } else {
      setFormData({ ...initialFormData });
    }
  }, [initialData]);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
      ...(name === "type" ? { category: "" } : {}),
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    onSubmit({
      ...formData,
      amount: Number(formData.amount),
    });
  }

  const availableCategories = categories[formData.type];

  return (
    <div className="transaction-form-overlay">
      <div className="transaction-form-modal">
        <div className="transaction-form-header">
          <div>
            <span className="form-eyebrow">CASHCRAFT</span>
            <h2>{initialData ? "Edit Transaction" : "Add Transaction"}</h2>
            <p>
              {initialData
                ? "Update your transaction details."
                : "Enter the details of your financial activity."}
            </p>
          </div>

          <button
            type="button"
            className="form-close-btn"
            onClick={onCancel}
            aria-label="Close form"
            disabled={isSubmitting}
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="transaction-form-body">
            <div className="form-field">
              <label htmlFor="amount">Amount (₹)</label>
              <input
                id="amount"
                name="amount"
                type="number"
                min="0.01"
                step="0.01"
                placeholder="Enter amount"
                value={formData.amount}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-field">
              <label htmlFor="description">Description</label>
              <input
                id="description"
                name="description"
                type="text"
                placeholder="e.g. Monthly groceries"
                value={formData.description}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-field">
              <label htmlFor="type">Transaction Type</label>
              <select
                id="type"
                name="type"
                value={formData.type}
                onChange={handleChange}
                required
              >
                <option value="income">Income</option>
                <option value="expense">Expense</option>
              </select>
            </div>

            <div className="form-field">
              <label htmlFor="category">Category</label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
              >
                <option value="" disabled>
                  Select category
                </option>

                {availableCategories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-field">
              <label htmlFor="date">Transaction Date</label>
              <input
                id="date"
                name="date"
                type="date"
                value={formData.date}
                onChange={handleChange}
                required
              />
            </div>

            {error && <p className="form-error">{error}</p>}
          </div>

          <div className="transaction-form-footer">
            <button
              type="button"
              className="form-cancel-btn"
              onClick={onCancel}
              disabled={isSubmitting}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="form-submit-btn"
              disabled={isSubmitting}
            >
              {isSubmitting
                ? "Saving..."
                : initialData
                  ? "Save Changes"
                  : "Add Transaction"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TransactionForm;
