import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import EquipmentSelectionPage from "./pages/EquipmentSelectionPage";
import NotFoundPage from "./pages/NotFoundPage";
import ChatbotLandingPage from "./pages/ChatbotLandingPage";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/:industryId" element={<EquipmentSelectionPage />} />
        <Route path="/404" element={<NotFoundPage />} />
        <Route path="/chatbot-landing-page/:equipmentId" element={<ChatbotLandingPage />} />
      </Routes>
    </Router>
  );
}

export default App;
