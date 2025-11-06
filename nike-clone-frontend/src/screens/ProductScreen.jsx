// src/screens/ProductScreen.jsx

import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import './ProductScreen.css';
import { useCart } from '../context/CartContext'; // 1. Importar o hook do carrinho

const ProductScreen = () => {
  const { id: productId } = useParams();
  const { addToCart } = useCart(); // 2. Pegar a função addToCart

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Código para buscar o produto (fetchProduct)
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`http://localhost:5000/api/products/${productId}`);
        setProduct(data);
        setLoading(false);
      } catch (err) {
        setError('Produto não encontrado.');
        setLoading(false);
        console.error(err);
      }
    };
    fetchProduct();
  }, [productId]); 

  // 3. Função para lidar com o clique
  const handleAddToCart = () => {
    if (product) {
      // Adiciona o produto ao "cérebro" do carrinho
      addToCart(product); 
    }
  };

  // ... (o código de loading/error continua o mesmo) ...
  if (loading) {
    return <h2 style={{ textAlign: 'center', padding: '5rem' }}>A carregar produto...</h2>;
  }
  if (error) {
    return <h2 style={{ textAlign: 'center', padding: '5rem', color: 'red' }}>{error}</h2>;
  }
  if (!product) {
    return <h2>Produto não encontrado</h2>;
  }

  return (
    <main className="product-screen-container">
      <Link to="/" className="back-link">
        &larr; Voltar aos produtos
      </Link>

      <div className="product-details-grid">
        {/* Galeria de Imagens */}
        <div className="product-gallery">
          <img src={product.image} alt={product.name} className="main-product-image" />
        </div>
        
        {/* Detalhes e Seletores */}
        <div className="product-info-details">
          {product.badge && <span className="info-badge">{product.badge}</span>}
          <h1 className="info-title">{product.name}</h1>
          <span className="info-price">
            {product.price.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}
          </span>
          <p className="info-description">{product.description}</p>

          {/* (Seletores de tamanho e cor estáticos) */}
          <div className="selector-group">
             {/* ... */}
          </div>
          <div className="selector-group">
             {/* ... */}
          </div>
          
          {/* 4. Chamar a função handleAddToCart no clique */}
          <button onClick={handleAddToCart} className="add-to-cart-btn">
            Adicionar ao Carrinho
          </button>
        </div>
      </div>

      <div className="product-tabs-section">
         {/* ... */}
      </div>
    </main>
  );
};

export default ProductScreen;