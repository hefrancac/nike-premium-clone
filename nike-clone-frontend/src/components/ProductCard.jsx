// src/components/ProductCard.jsx (CORRIGIDO)

import React from 'react';
import { Link } from 'react-router-dom'; 
import { FaRegHeart, FaHeart } from 'react-icons/fa'; 
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext'; // <--- Verifique se esta importação existe
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const { 
    isAuthenticated, 
    wishlist, 
    addToWishlist, 
    removeFromWishlist,
    openLoginModal // <--- Vamos precisar disto
  } = useAuth();
  
  const { addToCart } = useCart(); // <--- Pega a função do carrinho
  
  const isLiked = React.useMemo(() => {
    return wishlist.some((item) => item._id === product._id);
  }, [wishlist, product._id]); // <--- CORREÇÃO AQUI (removido 'user')

  
  const handleWishlistClick = (e) => {
    e.preventDefault(); 

    if (!isAuthenticated) { 
      // Abre o modal de login em vez de um alerta
      openLoginModal ? openLoginModal() : alert('Você precisa estar logado para adicionar aos favoritos.');
      return; 
    }

    if (isLiked) {
      removeFromWishlist(product._id);
    } else {
      addToWishlist(product._id);
    }
  };

  return (
    <div className="product-card">
      <div className="product-image-container">
        <Link to={`/produto/${product._id}`}>
          <img src={product.image} alt={product.name} />
        </Link>
        
        {product.badge && (
          <span className="product-badge">{product.badge}</span>
        )}

        <div className="product-hover-actions">
          {/* Este botão agora adiciona ao carrinho e abre o slide-in */}
          <button onClick={() => addToCart(product)} className="quick-view-btn">
            Adicionar
          </button>
          
          <button 
            onClick={handleWishlistClick} 
            className={`wishlist-btn ${isLiked ? 'liked' : ''}`}
          >
            {isLiked ? <FaHeart /> : <FaRegHeart />}
          </button>
        </div>
      </div>
      
      <div className="product-info">
        <span className="product-category">{product.category}</span>
        <Link to={`/produto/${product._id}`}>
          <h3 className="product-name">{product.name}</h3>
        </Link>
        <span className="product-price">
          {product.price.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}
        </span>
      </div>
    </div>
  );
};

export default ProductCard;