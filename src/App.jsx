import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import EquipmentSelectionPage from "./pages/EquipmentSelectionPage";
import NotFoundPage from "./pages/NotFoundPage";
import ChatbotLandingPage from "./pages/ChatbotLandingPage";
import ChatbotPage from "./pages/ChatbotPage";
import AdminLoginPage from "./pages/admin/AdminLoginPage";
import AdminForgotPasswordPage from "./pages/admin/AdminForgotPasswordPage";
import AdminResetPasswordPage from "./pages/admin/AdminResetPasswordPage";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/:industryId" element={<EquipmentSelectionPage />} />
          <Route path="/404" element={<NotFoundPage />} />
          <Route path="/:industryId/:equipmentId" element={<ChatbotLandingPage />} />
          <Route path="/:industryId/:equipmentId/chat" element={<ChatbotPage />} />

          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route path="/admin/forgot-password" element={<AdminForgotPasswordPage />} />
          <Route path="/admin/reset-password" element={<AdminResetPasswordPage />} />

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  );
}

export default App;
