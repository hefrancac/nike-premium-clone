// src/main.jsx

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

// 1. Importar o nosso CartProvider
import { CartProvider } from './context/CartContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* 2. Envolver toda a App com o CartProvider */}
    <CartProvider>
      <App />
    </CartProvider>
  </React.StrictMode>
);