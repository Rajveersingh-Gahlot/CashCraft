import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/public/Login";
import MainLayout from "./layouts/MainLayout";
import Register from "./pages/public/Register";
import Dashboard from "./pages/protected/Dashboard";

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
        <Route path="/register" element={<Register />} />

        {/* Shared application layout */}
        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<Dashboard/>} />
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
