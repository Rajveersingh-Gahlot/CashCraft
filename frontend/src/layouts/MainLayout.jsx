import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import "../App.css";

function MainLayout() {
  const location = useLocation();
  const navigate = useNavigate();

  const activePage = location.pathname.split("/")[1];

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

  function handleNavigate(page) {
    navigate(`/${page}`);
  }

  return (
    <div className="app-layout">
      <Sidebar activePage={activePage} onNavigate={handleNavigate} />

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
          <Outlet />
        </section>
      </main>
    </div>
  );
}

export default MainLayout;
