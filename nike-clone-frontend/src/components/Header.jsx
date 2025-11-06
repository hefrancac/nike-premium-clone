// src/components/Header.jsx

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import { FaSearch, FaRegHeart, FaShoppingBag, FaBars, FaTimes } from 'react-icons/fa';
import { useCart } from '../context/CartContext';

// 1. Recebe 'toggleSearch' (em vez de openSearch) como prop
const Header = ({ toggleSearch }) => { 
  const { openCart, cartItemCount } = useCart();
  
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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
            {/* 2. O botão da lupa agora chama a função 'toggleSearch' */}
            <button onClick={toggleSearch} className="nav-icon search-icon-btn">
              <FaSearch />
            </button>
            
            <a href="#" className="nav-icon"><FaRegHeart /></a>
            
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