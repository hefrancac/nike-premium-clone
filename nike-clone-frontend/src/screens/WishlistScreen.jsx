// src/screens/WishlistScreen.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Pega os dados de login
import ProductCard from '../components/ProductCard'; // Reutiliza o card
import './WishlistScreen.css'; // Vamos criar este CSS

const WishlistScreen = () => {
    // 1. Pega a lista de desejos direto do cérebro (AuthContext)
    const { wishlist } = useAuth();

    return (
        <main className="wishlist-container">
            <h1 className="wishlist-title">Minha Lista de Desejos</h1>
            
            {/* 2. Verifica se a lista está vazia */}
            {wishlist.length === 0 ? (
                <div className="wishlist-empty">
                    <p>Você ainda não adicionou nenhum item favorito.</p>
                    <Link to="/" className="cta-button">
                        Ver Produtos
                    </Link>
                </div>
            ) : (
                // 3. Se houver itens, exibe a grade
                // Reutilizamos a classe 'product-grid' do index.css
                <div className="product-grid">
                    {wishlist.map((product) => (
                        <ProductCard key={product._id} product={product} />
                    ))}
                </div>
            )}
        </main>
    );
};

export default WishlistScreen;