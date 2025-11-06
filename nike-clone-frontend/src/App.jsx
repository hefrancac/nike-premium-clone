// src/App.jsx

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Importar Componentes de Layout
import Header from './components/Header';
import CartSlideIn from './components/CartSlideIn';
import Footer from './components/Footer'; // 1. Importar o Footer

// Importar as "Telas" (Screens)
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';

function App() {
  return (
    <Router>
      <Header />
      <CartSlideIn />

      <main>
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/produto/:id" element={<ProductScreen />} />
        </Routes>
      </main>
      
      <Footer /> {/* 2. Adicionar o Footer aqui */}
    </Router>
  );
}

export default App;