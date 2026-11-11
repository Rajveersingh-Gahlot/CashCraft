import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/public/Login";
import Register from "./pages/public/Register";

import MainLayout from "./layouts/MainLayout";
import Dashboard from "./pages/protected/Dashboard";
import Transactions from "./pages/protected/Transactions";

import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes: only accessible when logged out */}
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        {/* Protected routes: only accessible when logged in */}
        <Route element={<ProtectedRoute />}>
          <Route element={<MainLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/transactions" element={<Transactions />} />
          </Route>
        </Route>

        {/* Default and unknown routes */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
