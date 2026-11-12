import { useEffect, useState } from "react";
import TransactionFilters from "../../components/transactions/TransactionFilters";
import TransactionTable from "../../components/transactions/TransactionTable";
import TransactionForm from "../../components/transactions/TransactionForm";
import DeleteConfirmation from "../../components/transactions/DeleteConfirmation";
import {
  getAllTransactions,
  createTransaction,
  updateTransaction,
  deleteTransaction,
} from "../../services/transactionService";
import "./Transactions.css";

const initialFilters = {
  search: "",
  type: "all",
  category: "all",
  startDate: "",
  endDate: "",
};

function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [filters, setFilters] = useState({ ...initialFilters });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState("");

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState("");

  // FETCH TRANSACTIONS FROM BACKEND
  useEffect(() => {
    async function fetchTransactions() {
      try {
        setLoading(true);
        setError("");

        const data = await getAllTransactions();

        setTransactions(data);
      } catch (err) {
        console.error("Failed to fetch transactions:", err);
        setError("Unable to load transactions. Please try again.");
      } finally {
        setLoading(false);
      }
    }

    fetchTransactions();
  }, []);

  // FILTER HANDLERS
  function handleFilterChange(field, value) {
    setFilters((previousFilters) => ({
      ...previousFilters,
      [field]: value,
    }));
  }

  function handleClearFilters() {
    setFilters({ ...initialFilters });
  }

  // ADD TRANSACTION
  function handleAddTransaction() {
    setSelectedTransaction(null);
    setFormError("");
    setIsFormOpen(true);
  }

  // EDIT TRANSACTION
  function handleEditTransaction(transaction) {
    setSelectedTransaction(transaction);
    setFormError("");
    setIsFormOpen(true);
  }

  // CLOSE ADD / EDIT FORM
  function handleCloseForm() {
    if (isSubmitting) {
      return;
    }

    setIsFormOpen(false);
    setSelectedTransaction(null);
    setFormError("");
  }

  // CREATE OR UPDATE TRANSACTION
  async function handleSaveTransaction(formData) {
    const transactionData = {
      amount: formData.amount,
      description: formData.description,
      transactionType: formData.type.toUpperCase(),
      category: formData.category,
      transactionDate: formData.date,
    };

    try {
      setIsSubmitting(true);
      setFormError("");

      if (selectedTransaction) {
        const updatedTransaction = await updateTransaction(
          selectedTransaction.id,
          transactionData,
        );

        setTransactions((previousTransactions) =>
          previousTransactions.map((transaction) =>
            transaction.id === updatedTransaction.id
              ? updatedTransaction
              : transaction,
          ),
        );
      } else {
        const createdTransaction = await createTransaction(transactionData);

        setTransactions((previousTransactions) => [
          createdTransaction,
          ...previousTransactions,
        ]);
      }

      setIsFormOpen(false);
      setSelectedTransaction(null);
    } catch (err) {
      console.error("Failed to save transaction:", err);

      setFormError(
        err.response?.data?.message ||
          "Unable to save transaction. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  // OPEN DELETE CONFIRMATION
  function handleDeleteTransaction(transaction) {
    setSelectedTransaction(transaction);
    setDeleteError("");
    setIsDeleteDialogOpen(true);
  }

  // CANCEL DELETE
  function handleCancelDelete() {
    if (isDeleting) {
      return;
    }

    setIsDeleteDialogOpen(false);
    setSelectedTransaction(null);
    setDeleteError("");
  }

  // DELETE TRANSACTION FROM BACKEND
  async function handleConfirmDelete() {
    if (!selectedTransaction) {
      return;
    }

    try {
      setIsDeleting(true);
      setDeleteError("");

      await deleteTransaction(selectedTransaction.id);

      setTransactions((previousTransactions) =>
        previousTransactions.filter(
          (transaction) => transaction.id !== selectedTransaction.id,
        ),
      );

      setIsDeleteDialogOpen(false);
      setSelectedTransaction(null);
    } catch (err) {
      console.error("Failed to delete transaction:", err);

      setDeleteError(
        err.response?.data?.message ||
          "Unable to delete transaction. Please try again.",
      );
    } finally {
      setIsDeleting(false);
    }
  }

  // FILTER AND SORT TRANSACTIONS
  const filteredTransactions = transactions
    .filter((transaction) => {
      const matchesSearch = transaction.description
        .toLowerCase()
        .includes(filters.search.trim().toLowerCase());

      const matchesType =
        filters.type === "all" ||
        transaction.transactionType.toLowerCase() === filters.type;

      const matchesCategory =
        filters.category === "all" || transaction.category === filters.category;

      const matchesStartDate =
        !filters.startDate || transaction.transactionDate >= filters.startDate;

      const matchesEndDate =
        !filters.endDate || transaction.transactionDate <= filters.endDate;

      return (
        matchesSearch &&
        matchesType &&
        matchesCategory &&
        matchesStartDate &&
        matchesEndDate
      );
    })
    .sort((a, b) => new Date(b.transactionDate) - new Date(a.transactionDate));

  return (
    <div className="transactions-page">
      <div className="transactions-toolbar">
        <div>
          <h2>All Transactions</h2>
          <p>Track and manage your income and expenses.</p>
        </div>

        <button
          type="button"
          className="add-transaction-btn"
          onClick={handleAddTransaction}
        >
          + Add Transaction
        </button>
      </div>

      <TransactionFilters
        filters={filters}
        onFilterChange={handleFilterChange}
        onClearFilters={handleClearFilters}
      />

      {loading ? (
        <div className="transactions-content">
          <div className="transactions-placeholder">
            <h3>Loading transactions...</h3>
            <p>Please wait while we retrieve your transactions.</p>
          </div>
        </div>
      ) : error ? (
        <div className="transactions-content">
          <div className="transactions-placeholder">
            <h3>Unable to load transactions</h3>
            <p>{error}</p>
          </div>
        </div>
      ) : (
        <TransactionTable
          transactions={filteredTransactions}
          onEdit={handleEditTransaction}
          onDelete={handleDeleteTransaction}
        />
      )}

      {isFormOpen && (
        <TransactionForm
          initialData={selectedTransaction}
          onSubmit={handleSaveTransaction}
          onCancel={handleCloseForm}
          isSubmitting={isSubmitting}
          error={formError}
        />
      )}

      {isDeleteDialogOpen && (
        <DeleteConfirmation
          transaction={selectedTransaction}
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
          isDeleting={isDeleting}
          error={deleteError}
        />
      )}
    </div>
  );
}

export default Transactions;
