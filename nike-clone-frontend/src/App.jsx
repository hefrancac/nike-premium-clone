// src/App.jsx (Final: Controla as Modals, Busca e Login/Cadastro)

import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useAuth } from './context/AuthContext'; // Importar o hook de autenticação

// Importar Componentes de Layout
import Header from './components/Header';
import CartSlideIn from './components/CartSlideIn';
import Footer from './components/Footer';
import SearchOverlay from './components/SearchOverlay';

// Importar Modals
import SignUpModal from './components/SignUpModal';
import LoginModal from './components/LoginModal'; // NOVO

// Importar as "Telas" (Screens)
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CategoryScreen from './screens/CategoryScreen';

function App() {
  const { login } = useAuth(); // Pega a função de login do Context

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false); // NOVO ESTADO

  // Funções de Controle
  const toggleSearch = () => setIsSearchOpen(prev => !prev);
  const closeSearch = () => setIsSearchOpen(false);

  const closeSignUpModal = () => setIsSignUpModalOpen(false);
  const openSignUpModal = () => setIsSignUpModalOpen(true);
  
  const closeLoginModal = () => setIsLoginModalOpen(false);
  const openLoginModal = () => setIsLoginModalOpen(true);

  // Lógica de Sucesso: Salva o usuário no contexto após Login OU Cadastro
  const handleLoginSuccess = (userInfo) => {
      login(userInfo); // Salva o usuário no Context e LocalStorage
      closeSignUpModal();
      closeLoginModal();
  };


  return (
    <Router>
      {/* Passar as funções de abertura de AMBOS os modais para o Header */}
      <Header 
        toggleSearch={toggleSearch} 
        openSignUpModal={openSignUpModal} 
        openLoginModal={openLoginModal} 
      />
      
      <CartSlideIn />
      <SearchOverlay 
        isSearchOpen={isSearchOpen}
        closeSearch={closeSearch} 
      />

      <main>
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/produto/:id" element={<ProductScreen />} />
          <Route path="/categoria/:categoryName" element={<CategoryScreen />} />
        </Routes>
      </main>
      
      <Footer />
      
      {/* Modals de Autenticação */}
      <LoginModal 
        isOpen={isLoginModalOpen} 
        closeModal={closeLoginModal}
        onLoginSuccess={handleLoginSuccess}
      />
      
      <SignUpModal 
        isOpen={isSignUpModalOpen} 
        closeModal={closeSignUpModal} 
        onSignUpSuccess={handleLoginSuccess} // Usa a mesma função para logar após cadastro
      />
    </Router>
  );
}

export default App;