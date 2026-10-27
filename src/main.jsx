import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css"; // fonts, colours and the shared GAA header styles
import "./ff/ff.css";
import "./hf/hf.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
