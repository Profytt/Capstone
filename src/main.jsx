import React from "react";
import ReactDOM from "react-dom/client";
import "./style/index.css"; 
import { ApiProvider } from './components/Api.jsx'; 

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ApiProvider /> 
  </React.StrictMode>
);
