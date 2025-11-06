// src/components/Header.jsx

import React, { useState } from 'react'; // 1. Importar o useState
import { Link } from 'react-router-dom'; // Usar Link para o logo
import './Header.css';
import { FaSearch, FaRegHeart, FaShoppingBag, FaBars, FaTimes } from 'react-icons/fa'; // 2. Importar FaBars (hamburger) e FaTimes (X)
import { useCart } from '../context/CartContext';

const Header = () => {
  const { openCart, cartItemCount } = useCart();
  
  // 3. Criar estado para controlar o menu mobile
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // 4. Função para alternar o menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <div className="promo-bar">
        Frete grátis para pedidos acima de R$299
      </div>

      <header className="header-fixed">
        <nav className="navbar">
          <div className="logo">
            <Link to="/">PREMIUM</Link> {/* 5. Mudar <a> por <Link> para não recarregar a página */}
          </div>

          {/* 6. Menu principal (para Desktop) */}
          <ul className="nav-menu-desktop">
            <li><Link to="/">Novidades</Link></li>
            <li><Link to="/">Masculino</Link></li>
            <li><Link to="/">Feminino</Link></li>
            <li><Link to="/">Infantil</Link></li>
            <li><Link to="/">Promoções</Link></li>
          </ul>

          <div className="nav-icons">
            <a href="#" className="nav-icon"><FaSearch /></a>
            <a href="#" className="nav-icon"><FaRegHeart /></a>
            
            <button onClick={openCart} className="nav-icon cart-icon-btn">
              <FaShoppingBag />
              {cartItemCount > 0 && (
                <span className="cart-count-badge">{cartItemCount}</span>
              )}
            </button>
            
            {/* 7. Botão Hamburger (só aparece no mobile) */}
            <button className="hamburger-btn" onClick={toggleMobileMenu}>
              {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </nav>
      </header>

      {/* 8. Menu Mobile (Slide-in) */}
      <div className={`nav-menu-mobile ${isMobileMenuOpen ? 'open' : ''}`}>
        <ul onClick={toggleMobileMenu}> {/* Fecha o menu ao clicar em um link */}
          <li><Link to="/">Novidades</Link></li>
          <li><Link to="/">Masculino</Link></li>
          <li><Link to="/">Feminino</Link></li>
          <li><Link to="/">Infantil</Link></li>
          <li><Link to="/">Promoções</Link></li>
        </ul>
      </div>
    </>
  );
};

export default Header;