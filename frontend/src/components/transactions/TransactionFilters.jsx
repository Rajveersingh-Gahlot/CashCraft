import "./TransactionFilters.css";

function TransactionFilters({ filters, onFilterChange, onClearFilters }) {
  const categories = [
    "Food",
    "Transport",
    "Shopping",
    "Bills",
    "Entertainment",
    "Health",
    "Salary",
    "Freelance",
    "Other",
  ];

  return (
    <div className="transaction-filters">
      <div className="filter-search">
        <label htmlFor="transaction-search">Search transactions</label>
        <input
          id="transaction-search"
          type="text"
          placeholder="Search by description..."
          value={filters.search}
          onChange={(e) => onFilterChange("search", e.target.value)}
        />
      </div>

      <div className="filter-group">
        <label htmlFor="transaction-type">Transaction Type</label>
        <select
          id="transaction-type"
          value={filters.type}
          onChange={(e) => onFilterChange("type", e.target.value)}
        >
          <option value="all">All Types</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="transaction-category">Category</label>
        <select
          id="transaction-category"
          value={filters.category}
          onChange={(e) => onFilterChange("category", e.target.value)}
        >
          <option value="all">All Categories</option>

          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="start-date">From Date</label>
        <input
          id="start-date"
          type="date"
          value={filters.startDate}
          onChange={(e) => onFilterChange("startDate", e.target.value)}
        />
      </div>

      <div className="filter-group">
        <label htmlFor="end-date">To Date</label>
        <input
          id="end-date"
          type="date"
          value={filters.endDate}
          onChange={(e) => onFilterChange("endDate", e.target.value)}
        />
      </div>

      <button
        type="button"
        className="clear-filters-btn"
        onClick={onClearFilters}
      >
        Clear Filters
      </button>
    </div>
  );
}

export default TransactionFilters;
