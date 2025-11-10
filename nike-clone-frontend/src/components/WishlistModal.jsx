// src/components/WishlistModal.jsx

import React from 'react';
import './WishlistModal.css';
import { useWishlist } from '../context/WishlistContext'; // 1. Importe o Hook

function WishlistModal({ isOpen, onClose }) {
    // 2. Pegue os dados e funções do contexto
    const { wishlistItems, removeFromWishlist } = useWishlist();

    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="modal-close-button" onClick={onClose}>
                    &times;
                </button>
                <h2 className="modal-title">Minha Wishlist</h2>

                {/* 3. O Conteúdo Real! */}
                <div className="modal-body">
                    {wishlistItems.length === 0 ? (
                        <p>Sua wishlist está vazia.</p>
                    ) : (
                        <ul className="wishlist-items-list">
                            {wishlistItems.map((item) => (
                                <li key={item.id} className="wishlist-item">
                                    <img src={item.imageUrl} alt={item.name} />
                                    <div className="item-details">
                                        <h4>{item.name}</h4>
                                        <p>{item.price}</p>
                                    </div>
                                    <button 
                                        className="remove-btn"
                                        onClick={() => removeFromWishlist(item.id)}
                                    >
                                        Remover
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
}

export default WishlistModal;