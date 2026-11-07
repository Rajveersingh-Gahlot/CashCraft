import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/public/Login";
import MainLayout from "./layouts/MainLayout";

function DashboardPage() {
  return (
    <div className="welcome-card">
      <span className="welcome-label">CASHCRAFT</span>
      <h2>Welcome to your financial dashboard.</h2>
      <p>
        Your financial overview starts here. We will build your summary cards,
        charts and insights in the dashboard step.
      </p>
    </div>
  );
}

function TransactionsPage() {
  return (
    <div className="welcome-card">
      <span className="welcome-label">CASHCRAFT</span>
      <h2>Your transactions will appear here.</h2>
      <p>
        We will build transaction history, filters and transaction management in
        the transactions step.
      </p>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public route */}
        <Route path="/login" element={<Login />} />

        {/* Shared application layout */}
        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/transactions" element={<TransactionsPage />} />
        </Route>

        {/* Default and unknown routes */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
