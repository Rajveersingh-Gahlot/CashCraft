import { useState } from "react";
import Sidebar from "./components/Sidebar";
import "./App.css";

function App() {
  const [activePage, setActivePage] = useState("dashboard");

  const pageDetails = {
    dashboard: {
      title: "Dashboard",
      description: "Your personal finance overview.",
    },
    transactions: {
      title: "Transactions",
      description: "Manage your income and expenses.",
    },
  };

  const currentPage = pageDetails[activePage];
  return (
    <div className="app-layout">
      <Sidebar activePage={activePage} onNavigate={setActivePage} />
      <main className="app-main">
        <header className="app-header">
          <div>
            <h1>{currentPage.title}</h1>
            <p>{currentPage.description}</p>
          </div>

          <div className="workspace-badge">
            <span className="workspace-dot"></span>
            CashCraft Workspace
          </div>
        </header>

        <section className="page-content">
          <div className="welcome-card">
            <span className="welcome-label">CASHCRAFT</span>

            <h2>
              {activePage === "dashboard"
                ? "Welcome to your financial dashboard."
                : "Your transactions will appear here."}
            </h2>

            <p>
              {activePage === "dashboard"
                ? "Your financial overview starts here. We will build your summary cards, charts and insights in the dashboard step."
                : "We will build transaction history, filters and transaction management in the transactions step."}
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
