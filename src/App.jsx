import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import EquipmentSelectionPage from "./pages/EquipmentSelectionPage";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/:industryName" element={<EquipmentSelectionPage />} />
      </Routes>
    </Router>
  );
}

export default App;
