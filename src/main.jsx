import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./global.css";
import "./styles/card-flip.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(<App />);
