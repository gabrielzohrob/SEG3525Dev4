import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './app.jsx'; // Capitalize to match component naming convention
import { CartProvider } from './CartContext.jsx'; // Ensure correct path and casing

// Make sure your HTML file has a <div id="root"></div>
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CartProvider>
      <App />
    </CartProvider>
  </React.StrictMode>
);