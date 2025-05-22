import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import EquipmentSelectionPage from "./pages/EquipmentSelectionPage";
import ChatbotLandingPage from "./pages/ChatbotLandingPage";
import ChatbotPage from "./pages/ChatbotPage";
import AdminRoutes from "./routes/AdminRoutes";
import NotFoundPage from "./pages/NotFoundPage";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/:industryName" element={<EquipmentSelectionPage />} />
          <Route path="/404" element={<NotFoundPage />} />
          <Route path="/:industryName/:equipmentName" element={<ChatbotLandingPage />} />
          <Route path="/:industryName/:equipmentName/chat" element={<ChatbotPage />} />
          <Route path="/admin/*" element={<AdminRoutes />} />
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
