// src/components/ProductCard.jsx

import React from 'react';
// 1. Importar o <Link>
import { Link } from 'react-router-dom'; 
import { FaRegHeart } from 'react-icons/fa';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      <div className="product-image-container">
        <img src={product.image} alt={product.name} />
        
        {product.badge && (
          <span className="product-badge">{product.badge}</span>
        )}

        <div className="product-hover-actions">
          {/* 2. Trocar <a> por <Link> */}
          {/* Ele vai navegar para /produto/ID_DO_PRODUTO */}
          <Link to={`/produto/${product._id}`} className="quick-view-btn">
            Ver Produto
          </Link>
          <button className="wishlist-btn"><FaRegHeart /></button>
        </div>
      </div>
      <div className="product-info">
        <span className="product-category">{product.category}</span>
        {/* 3. Vamos fazer o nome do produto ser um link também */}
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