// src/components/Header.jsx

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
// Importa o ícone de usuário
import { FaSearch, FaRegHeart, FaShoppingBag, FaBars, FaTimes, FaUser } from 'react-icons/fa'; 
import { useCart } from '../context/CartContext';

// Recebe 'openSignUpModal' como prop (para o botão Cadastrar-se)
const Header = ({ toggleSearch, openSignUpModal }) => { 
  const { openCart, cartItemCount } = useCart();
  
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  // NOVO ESTADO para o menu de usuário
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false); 

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  
  // Função para abrir/fechar o menu de usuário
  const toggleUserMenu = () => {
    setIsUserMenuOpen(prev => !prev);
  };

  // Funções que fecham o dropdown e abrem o modal
  const handleSignUpClick = () => {
    setIsUserMenuOpen(false); // Fecha o dropdown
    openSignUpModal();         // Abre o modal de cadastro
  }
  
  const handleLoginClick = () => {
    setIsUserMenuOpen(false); // Fecha o dropdown
    // Futuramente, abriria um modal de Login, mas por enquanto:
    alert("Funcionalidade de Login futura!"); 
  }


  return (
    <>
      {/* Apenas a mensagem de promoção (o botão de login foi removido daqui) */}
      <div className="promo-bar">
        Frete grátis para pedidos acima de R$299
      </div>

      <header className="header-fixed">
        <nav className="navbar">
          <div className="logo">
            <Link to="/">PREMIUM</Link>
          </div>

          {/* Menu principal (Desktop) */}
          <ul className="nav-menu-desktop">
            <li><Link to="/">Novidades</Link></li>
            <li><Link to="/categoria/Corrida">Corrida</Link></li>
            <li><Link to="/categoria/Treino">Treino</Link></li>
            <li><Link to="/categoria/Casual">Casual</Link></li>
            <li><Link to="/">Promoções</Link></li>
          </ul>

          <div className="nav-icons">
            <button onClick={toggleSearch} className="nav-icon search-icon-btn">
              <FaSearch />
            </button>
            <a href="#" className="nav-icon"><FaRegHeart /></a>
            
            {/* NOVO ÍCONE DE USUÁRIO (com Dropdown) */}
            <div className="user-menu-container">
              <button onClick={toggleUserMenu} className="nav-icon user-icon-btn">
                <FaUser />
              </button>
              
              {/* O Dropdown Menu */}
              {isUserMenuOpen && (
                <div className="user-dropdown-menu">
                  {/* Link que chama o modal de Cadastro */}
                  <button onClick={handleSignUpClick}>
                    Cadastrar-se
                  </button>
                  {/* Link que seria o Login */}
                  <button onClick={handleLoginClick}>
                    Login
                  </button>
                </div>
              )}
            </div>
            {/* Fim do NOVO ÍCONE DE USUÁRIO */}


            {/* Botão do Carrinho */}
            <button onClick={openCart} className="nav-icon cart-icon-btn">
              <FaShoppingBag />
              {cartItemCount > 0 && (
                <span className="cart-count-badge">{cartItemCount}</span>
              )}
            </button>
            
            {/* Botão Hamburger (Mobile) */}
            <button className="hamburger-btn" onClick={toggleMobileMenu}>
              {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </nav>
      </header>

      {/* Menu Mobile (Slide-in) */}
      <div className={`nav-menu-mobile ${isMobileMenuOpen ? 'open' : ''}`}>
        <ul onClick={toggleMobileMenu}> 
          <li><Link to="/">Novidades</Link></li>
          <li><Link to="/categoria/Corrida">Corrida</Link></li>
          <li><Link to="/categoria/Treino">Treino</Link></li>
          <li><Link to="/categoria/Casual">Casual</Link></li>
          <li><Link to="/">Promoções</Link></li>
        </ul>
      </div>
    </>
  );
};

export default Header;