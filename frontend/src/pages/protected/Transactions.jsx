import { useState } from "react";
import TransactionFilters from "../../components/transactions/TransactionFilters";
import TransactionTable from "../../components/transactions/TransactionTable";
import TransactionForm from "../../components/transactions/TransactionForm";
import DeleteConfirmation from "../../components/transactions/DeleteConfirmation";
import "./Transactions.css";

const initialFilters = {
  search: "",
  type: "all",
  category: "all",
  startDate: "",
  endDate: "",
};

const sampleTransactions = [
  {
    id: 1,
    description: "Monthly Salary",
    category: "Salary",
    date: "2026-11-01",
    type: "income",
    amount: 50000,
  },
  {
    id: 2,
    description: "Grocery Shopping",
    category: "Food",
    date: "2026-11-03",
    type: "expense",
    amount: 2500,
  },
  {
    id: 3,
    description: "Freelance Project",
    category: "Freelance",
    date: "2026-11-04",
    type: "income",
    amount: 12000,
  },
  {
    id: 4,
    description: "Cab Booking",
    category: "Transport",
    date: "2026-11-06",
    type: "expense",
    amount: 450,
  },
  {
    id: 5,
    description: "Electricity Bill",
    category: "Bills",
    date: "2026-11-08",
    type: "expense",
    amount: 1800,
  },
  {
    id: 6,
    description: "Shopping",
    category: "Shopping",
    date: "2026-11-09",
    type: "expense",
    amount: 3200,
  },
];

function Transactions() {
  const [transactions, setTransactions] = useState(sampleTransactions);

  const [filters, setFilters] = useState(initialFilters);

  const [isFormOpen, setIsFormOpen] = useState(false);

  const [selectedTransaction, setSelectedTransaction] = useState(null);

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  // FILTER HANDLERS

  function handleFilterChange(field, value) {
    setFilters((previousFilters) => ({
      ...previousFilters,
      [field]: value,
    }));
  }

  function handleClearFilters() {
    setFilters(initialFilters);
  }

  // ADD TRANSACTION

  function handleAddTransaction() {
    setSelectedTransaction(null);
    setIsFormOpen(true);
  }

  // EDIT TRANSACTION

  function handleEditTransaction(transaction) {
    setSelectedTransaction(transaction);
    setIsFormOpen(true);
  }

  // CLOSE ADD / EDIT FORM

  function handleCloseForm() {
    setIsFormOpen(false);
    setSelectedTransaction(null);
  }

  // SAVE TRANSACTION

  function handleSaveTransaction(formData) {
    if (selectedTransaction) {
      setTransactions((previousTransactions) =>
        previousTransactions.map((transaction) =>
          transaction.id === selectedTransaction.id
            ? { ...transaction, ...formData }
            : transaction,
        ),
      );
    } else {
      const newTransaction = {
        id: Date.now(),
        ...formData,
      };

      setTransactions((previousTransactions) => [
        newTransaction,
        ...previousTransactions,
      ]);
    }

    handleCloseForm();
  }

  // OPEN DELETE CONFIRMATION

  function handleDeleteTransaction(transaction) {
    setSelectedTransaction(transaction);
    setIsDeleteDialogOpen(true);
  }

  // CANCEL DELETE

  function handleCancelDelete() {
    setIsDeleteDialogOpen(false);
    setSelectedTransaction(null);
  }

  // CONFIRM DELETE

  function handleConfirmDelete() {
    if (!selectedTransaction) {
      return;
    }

    setTransactions((previousTransactions) =>
      previousTransactions.filter(
        (transaction) => transaction.id !== selectedTransaction.id,
      ),
    );

    handleCancelDelete();
  }

  // FILTER TRANSACTIONS

  const filteredTransactions = transactions.filter((transaction) => {
    const matchesSearch = transaction.description
      .toLowerCase()
      .includes(filters.search.trim().toLowerCase());

    const matchesType =
      filters.type === "all" || transaction.type === filters.type;

    const matchesCategory =
      filters.category === "all" || transaction.category === filters.category;

    const matchesStartDate =
      !filters.startDate || transaction.date >= filters.startDate;

    const matchesEndDate =
      !filters.endDate || transaction.date <= filters.endDate;

    return (
      matchesSearch &&
      matchesType &&
      matchesCategory &&
      matchesStartDate &&
      matchesEndDate
    );
  });

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

      <TransactionTable
        transactions={filteredTransactions}
        onEdit={handleEditTransaction}
        onDelete={handleDeleteTransaction}
      />

      {isFormOpen && (
        <TransactionForm
          initialData={selectedTransaction}
          onSubmit={handleSaveTransaction}
          onCancel={handleCloseForm}
        />
      )}

      {isDeleteDialogOpen && (
        <DeleteConfirmation
          transaction={selectedTransaction}
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}
    </div>
  );
}

export default Transactions;
