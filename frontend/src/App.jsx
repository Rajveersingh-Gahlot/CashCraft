import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/public/Login";
import MainLayout from "./layouts/MainLayout";
import Register from "./pages/public/Register";
import Dashboard from "./pages/protected/Dashboard";
import Transactions from "./pages/protected/Transactions";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public route */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Shared application layout */}
        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/transactions" element={<Transactions />} />
        </Route>

        {/* Default and unknown routes */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
