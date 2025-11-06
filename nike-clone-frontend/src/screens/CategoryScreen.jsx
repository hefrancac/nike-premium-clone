// src/screens/CategoryScreen.jsx

import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom'; // Importa useParams
import axios from 'axios';
import ProductCard from '../components/ProductCard'; // Reutiliza o card
import './CategoryScreen.css'; // Vamos criar este CSS

const CategoryScreen = () => {
  // 1. Lê o parâmetro da URL (ex: /categoria/Corrida)
  const { categoryName } = useParams();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 2. O useEffect agora depende do 'categoryName'
  // Ele vai rodar de novo se você mudar de categoria
  useEffect(() => {
    const fetchProductsByCategory = async () => {
      try {
        setLoading(true);
        // 3. Chama a API com o filtro de categoria
        const { data } = await axios.get(
          `http://localhost:5000/api/products?category=${categoryName}`
        );
        setProducts(data);
        setLoading(false);
      } catch (err) {
        setError('Não foi possível carregar os produtos.');
        setLoading(false);
      }
    };

    fetchProductsByCategory();
  }, [categoryName]);

  const renderContent = () => {
    if (loading) {
      return <h2 style={{ textAlign: 'center', padding: '5rem' }}>A carregar...</h2>;
    }
    if (error) {
      return <h2 style={{ textAlign: 'center', padding: '5rem', color: 'red' }}>{error}</h2>;
    }
    // 4. Mostra uma mensagem se a categoria não tiver produtos
    if (products.length === 0) {
      return <h2 style={{ textAlign: 'center', padding: '5rem' }}>Nenhum produto encontrado nesta categoria.</h2>;
    }
    
    // 5. Mostra a grade de produtos filtrados
    return (
      <div className="product-grid">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    );
  };

  return (
    <main className="category-screen-container">
      <div className="category-header">
        <Link to="/" className="back-link">&larr; Todas as Categorias</Link>
        <h1 className="category-title">{categoryName}</h1>
      </div>
      {renderContent()}
    </main>
  );
};

export default CategoryScreen;