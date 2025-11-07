// src/main.jsx (Com AuthProvider)

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

// Importar Providers
import { CartProvider } from './context/CartContext.jsx'; 
import { AuthProvider } from './context/AuthContext.jsx'; // NOVO

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CartProvider>
      <AuthProvider> {/* ENVOLVER AQUI */}
        <App />
      </AuthProvider>
    </CartProvider>
  </React.StrictMode>,
)