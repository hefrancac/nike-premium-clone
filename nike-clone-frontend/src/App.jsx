// src/App.jsx

import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Importar Componentes de Layout
import Header from './components/Header';
import CartSlideIn from './components/CartSlideIn';
import Footer from './components/Footer';
import SearchOverlay from './components/SearchOverlay'; 

// Importar as "Telas" (Screens)
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CategoryScreen from './screens/CategoryScreen';

function App() {
  // 1. O estado para controlar a busca
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // 2. Função de TOGGLE (Alternar): inverte o estado atual
  const toggleSearch = () => setIsSearchOpen(prev => !prev);
  // (Nota: mantemos o closeSearch para ser usado pelo botão 'X' dentro do overlay)
  const closeSearch = () => setIsSearchOpen(false); 

  return (
    <Router>
      {/* 3. Passar a nova função 'toggleSearch' para o Header */}
      <Header toggleSearch={toggleSearch} /> 
      
      <CartSlideIn />
      
      <SearchOverlay 
        isSearchOpen={isSearchOpen}
        closeSearch={closeSearch} // Ainda é necessário para o botão 'X' no SearchOverlay
      />

      <main>
        <Routes>
          {/* Rota 1: Página Inicial */}
          <Route path="/" element={<HomeScreen />} />
          
          {/* Rota 2: Página de Detalhes do Produto */}
          <Route path="/produto/:id" element={<ProductScreen />} />
          
          {/* Rota 3: Página de Categoria */}
          <Route path="/categoria/:categoryName" element={<CategoryScreen />} />
        </Routes>
      </main>
      
      <Footer />
    </Router>
  );
}

export default App;