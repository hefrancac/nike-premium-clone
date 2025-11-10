// src/context/AuthContext.jsx (CORRIGIDO)

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'; // 1. Importar useCallback
import axios from 'axios';

const AuthContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);

// 2. Mover o timer para dentro do componente
let notificationTimer = null;

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem('userInfo')) || null
  );
  
  const [wishlist, setWishlist] = useState([]);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [notification, setNotification] = useState({ show: false, message: '' });

  const showNotification = (message) => {
    if (notificationTimer) {
      clearTimeout(notificationTimer);
    }
    setNotification({ show: true, message });
    
    notificationTimer = setTimeout(() => {
      setNotification({ show: false, message: '' });
    }, 3000); 
  };

  const openWishlist = () => setIsWishlistOpen(true);
  const closeWishlist = () => setIsWishlistOpen(false);

  // 3. Função de Logout (necessária para o useCallback)
  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('userInfo');
    setWishlist([]); 
  }, []); // Sem dependências

  // 4. Envolver fetchWishlist com useCallback
  const fetchWishlist = useCallback(async (token) => {
    if (!token) return;
    try {
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const { data } = await axios.get('/api/users/wishlist', config);
      setWishlist(data); 
    } catch (error) {
      console.error('Falha ao buscar wishlist:', error);
      if (error.response && error.response.status === 401) logout();
    }
  }, [logout]); // Depende do 'logout'

  // 5. Adicionar 'fetchWishlist' à lista de dependências
  useEffect(() => {
    if (user && user.token) fetchWishlist(user.token);
    else setWishlist([]); 
  }, [user, fetchWishlist]); // <--- CORREÇÃO AQUI

  const addToWishlist = async (productId) => {
    try {
      if (!user || !user.token) throw new Error('Usuário não autenticado');
      
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      await axios.post('/api/users/wishlist', { productId }, config);
      
      await fetchWishlist(user.token); 
      showNotification("Adicionado aos Favoritos!");
      
    } catch (error) {
      console.error('Erro ao adicionar à wishlist!', error); 
    }
  };

  const removeFromWishlist = async (productId) => {
    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      await axios.delete(`/api/users/wishlist/${productId}`, config);
      
      await fetchWishlist(user.token); 
      showNotification("Removido dos Favoritos!");

    } catch (error) {
      console.error('Erro ao remover da wishlist', error);
    }
  };

  const login = (userInfo) => {
    setUser(userInfo);
    localStorage.setItem('userInfo', JSON.stringify(userInfo));
  };
  
  const value = {
    user,
    isAuthenticated: !!user,
    login,
    logout,
    wishlist, 
    addToWishlist, 
    removeFromWishlist,
    isWishlistOpen, 
    openWishlist,  
    closeWishlist, 
    notification, 
    openLoginModal: () => {}, // <--- Adicionando placeholder
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};