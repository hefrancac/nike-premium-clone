// src/context/CartContext.jsx (ATUALIZADO COM clearCart)

import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(
    JSON.parse(localStorage.getItem('cartItems')) || []
  );
  
  const [shippingAddress, setShippingAddress] = useState(
    JSON.parse(localStorage.getItem('shippingAddress')) || {}
  );

  const [paymentMethod, setPaymentMethod] = useState(
    JSON.parse(localStorage.getItem('paymentMethod')) || 'PayPal'
  );

  const [isCartOpen, setIsCartOpen] = useState(false); 

  // Salva os itens no localStorage sempre que 'cartItems' mudar
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  const addToCart = (productToAdd) => {
    // ... (lógica existente de adicionar)
    const existingItem = cartItems.find((item) => item._id === productToAdd._id);
    if (existingItem) {
      setCartItems(
        cartItems.map((item) =>
          item._id === productToAdd._id
            ? { ...item, qty: item.qty + 1 }
            : item
        )
      );
    } else {
      setCartItems([...cartItems, { ...productToAdd, qty: 1 }]);
    }
    openCart(); 
  };

  const removeFromCart = (productId) => {
    setCartItems(cartItems.filter((item) => item._id !== productId));
  };
  
  const saveShippingAddress = (data) => {
    setShippingAddress(data);
    localStorage.setItem('shippingAddress', JSON.stringify(data));
  };

  const savePaymentMethod = (method) => {
    setPaymentMethod(method);
    localStorage.setItem('paymentMethod', JSON.stringify(method));
  };

  // 1. NOVA FUNÇÃO: Limpa o carrinho do estado
  const clearCart = () => {
    setCartItems([]);
    // O useEffect acima vai atualizar o localStorage para '[]' automaticamente
  };
  
  const value = {
    cartItems,
    isCartOpen,
    addToCart,
    removeFromCart,
    openCart,
    closeCart,
    cartItemCount: cartItems.reduce((total, item) => total + item.qty, 0),
    
    shippingAddress,
    saveShippingAddress,
    
    paymentMethod,
    savePaymentMethod,
    
    clearCart, // 2. EXPORTAR A NOVA FUNÇÃO
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};