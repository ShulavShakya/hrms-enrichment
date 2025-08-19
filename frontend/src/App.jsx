import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import ProtectedRoutes from "./utils/ProtectedRoutes.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route
        path="/admin-dashboard"
        element={
          <ProtectedRoutes allowedRoles={["admin"]}>
            <AdminDashboard />
          </ProtectedRoutes>
        }
      />
      <Route
        path="/"
        element={
          <ProtectedRoutes allowedRoles={["employee"]}>
            <EmployeeDashboard />
          </ProtectedRoutes>
        }
      />
    </Routes>
  );
}

export default App;
