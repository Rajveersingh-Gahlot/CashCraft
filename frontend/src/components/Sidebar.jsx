import { useState } from "react";
import "./Sidebar.css";

function Sidebar({ activePage, onNavigate, onLogout }) {
  const [isCollapsed, setCollapsed] = useState(false);

  const navigationItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <rect x="3" y="3" width="8" height="8" rx="2" />
          <rect x="13" y="3" width="8" height="5" rx="2" />
          <rect x="13" y="10" width="8" height="11" rx="2" />
          <rect x="3" y="13" width="8" height="8" rx="2" />
        </svg>
      ),
    },
    {
      id: "transactions",
      label: "Transactions",
      icon: (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M4 7h16M4 12h16M4 17h16" />
          <path d="m16 4 4 3-4 3M8 14l-4 3 4 3" />
        </svg>
      ),
    },
  ];

  function handleNavigation(page) {
    onNavigate(page);
  }

  return (
    <aside className={`sidebar ${isCollapsed ? "sidebar-collapsed" : ""}`}>
      <div className="sidebar-brand">
        <div className="brand-logo">C</div>

        {!isCollapsed && <span className="brand-name">CashCraft</span>}
      </div>

      <button
        className="sidebar-toggle"
        onClick={() => setCollapsed((prev) => !prev)}
        aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d={isCollapsed ? "m9 18 6-6-6-6" : "m15 18-6-6 6-6"} />
        </svg>
      </button>

      <div className="sidebar-section-label">{!isCollapsed && "WORKSPACE"}</div>

      <nav className="sidebar-navigation">
        {navigationItems.map((item) => (
          <button
            key={item.id}
            className={`nav-item ${
              activePage === item.id ? "nav-item-active" : ""
            }`}
            onClick={() => handleNavigation(item.id)}
            title={isCollapsed ? item.label : ""}
          >
            <span className="nav-icon">{item.icon}</span>

            {!isCollapsed && <span className="nav-label">{item.label}</span>}
          </button>
        ))}
      </nav>

      <div className="sidebar-footer">
        {!isCollapsed && (
          <div className="sidebar-footer-content">
            <span className="footer-indicator"></span>
            <span>Personal Finance</span>
          </div>
        )}

        <button
          className="logout-button"
          onClick={onLogout}
          title={isCollapsed ? "Logout" : ""}
        >
          <span className="logout-icon">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M10 17l5-5-5-5" />
              <path d="M15 12H3" />
              <path d="M12 3h6a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-6" />
            </svg>
          </span>

          {!isCollapsed && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
