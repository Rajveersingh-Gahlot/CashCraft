import CategoryBreakdown from "../../components/dashboard/CategoryBreakdown";
import IncomeExpenseChart from "../../components/dashboard/IncomeExpenseChart";
import SummaryCards from "../../components/dashboard/SummaryCards";
import "./Dashboard.css";

function Dashboard() {
  return (
    <div className="dashboard">
      {/* Dashboard introduction */}
      <div className="dashboard-intro">
        <div>
          <span className="dashboard-eyebrow">FINANCIAL OVERVIEW</span>

          <h2>Welcome back!</h2>
          <p>Here's what's happening with your finances.</p>
        </div>

        <div className="dashboard-date">
          <span>YOUR FINANCES</span>
          <strong>Overview</strong>
        </div>
      </div>

      {/* Financial summary cards */}
      <section className="dashboard-section">
        <SummaryCards />
      </section>

      {/* Income and expense analysis */}
      <section className="dashboard-section">
        <div className="section-heading">
          <div>
            <h3>Financial Analysis</h3>
            <p>Understand your income and spending patterns.</p>
          </div>
        </div>

        <div className="analysis-grid">
          <IncomeExpenseChart />
          <CategoryBreakdown />
        </div>
      </section>

      {/* Monthly spending trend */}
      <section className="dashboard-section">
        <div className="section-heading">
          <div>
            <h3>Monthly Trends</h3>
            <p>Track how your finances change over time.</p>
          </div>
        </div>

        <div className="dashboard-placeholder trend-placeholder">
          <h4>Monthly Income & Expenses</h4>
          <p>Monthly trend chart will appear here.</p>
        </div>
      </section>

      {/* Recent transactions */}
      <section className="dashboard-section">
        <div className="section-heading">
          <div>
            <h3>Recent Transactions</h3>
            <p>Your latest financial activities.</p>
          </div>
        </div>

        <div className="dashboard-placeholder transactions-placeholder">
          <p>Recent transactions will appear here.</p>
        </div>
      </section>
    </div>
  );
}

export default Dashboard;
