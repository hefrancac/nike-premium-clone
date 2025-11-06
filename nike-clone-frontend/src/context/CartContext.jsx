// src/context/CartContext.jsx

import React, { createContext, useContext, useState } from 'react';

// 1. Criar o Contexto
const CartContext = createContext();

// 2. Criar o "Hook" personalizado (para facilitar o uso)
export const useCart = () => {
  return useContext(CartContext);
};

// 3. Criar o "Provider" (o componente que vai guardar os dados)
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false); // Controla se o slide-in está visível

  // Função para abrir o carrinho
  const openCart = () => setIsCartOpen(true);

  // Função para fechar o carrinho
  const closeCart = () => setIsCartOpen(false);

  // Função para adicionar um produto ao carrinho
  const addToCart = (productToAdd) => {
    // Verifica se o item já existe no carrinho
    const existingItem = cartItems.find((item) => item._id === productToAdd._id);

    if (existingItem) {
      // Se existe, apenas aumenta a quantidade (qty)
      setCartItems(
        cartItems.map((item) =>
          item._id === productToAdd._id
            ? { ...item, qty: item.qty + 1 }
            : item
        )
      );
    } else {
      // Se não existe, adiciona-o ao carrinho com quantidade 1
      setCartItems([...cartItems, { ...productToAdd, qty: 1 }]);
    }

    openCart(); // Abre o carrinho automaticamente ao adicionar
  };

  // Função para remover um produto do carrinho
  const removeFromCart = (productId) => {
    setCartItems(cartItems.filter((item) => item._id !== productId));
  };
  
  // 4. Agrupar todos os valores e funções que queremos "partilhar"
  const value = {
    cartItems,
    isCartOpen,
    addToCart,
    removeFromCart,
    openCart,
    closeCart,
    // Vamos adicionar uma contagem total de itens
    cartItemCount: cartItems.reduce((total, item) => total + item.qty, 0)
  };

  // 5. Retornar o Provider com os valores partilhados
  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};