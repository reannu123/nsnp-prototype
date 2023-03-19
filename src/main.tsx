import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import cytoscape from "cytoscape";
import gridGuide from "cytoscape-grid-guide";
gridGuide(cytoscape);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
