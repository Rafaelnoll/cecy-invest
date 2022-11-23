import React from 'react'
import ReactDOM from 'react-dom/client'
import Calculator from "./components/Calculator";
import "./assets/css/global.css";

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Calculator />
  </React.StrictMode>
)
