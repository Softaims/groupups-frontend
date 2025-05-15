import { Routes, Route } from "react-router-dom";
import AdminLoginPage from "../pages/admin/AdminLoginPage";
import AdminForgotPasswordPage from "../pages/admin/AdminForgotPasswordPage";
import AdminResetPasswordPage from "../pages/admin/AdminResetPasswordPage";
import AdminDashboardPage from "../pages/admin/AdminDashboardPage";
import NotFoundPage from "../pages/NotFoundPage";
import ProtectedRoute from "../components/global/ProtectedRoute";

const AdminRoutes = () => (
  <Routes>
    <Route path="login" element={<AdminLoginPage />} />
    <Route path="forgot-password" element={<AdminForgotPasswordPage />} />
    <Route path="reset-password" element={<AdminResetPasswordPage />} />
    <Route path="dashboard" element={<ProtectedRoute children={<AdminDashboardPage />} />} />
    <Route path="*" element={<NotFoundPage />} />
  </Routes>
);

export default AdminRoutes;
