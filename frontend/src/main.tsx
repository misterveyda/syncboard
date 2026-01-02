import React from "react";
import ReactDOM from "react-dom/client";
// Add the .jsx or .tsx extension specifically if the compiler is complaining
import App from "./App.tsx"; 
import "./index.css";

// We use type casting here to be 100% safe for the compiler
const rootElement = document.getElementById("root") as HTMLElement;

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);