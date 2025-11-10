// src/screens/ShippingScreen.jsx (ATUALIZADO)

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext'; 
import CheckoutSteps from '../components/CheckoutSteps'; // 1. IMPORTAR O "MAPA"
import './ShippingScreen.css'; 

const ShippingScreen = () => {
  const { shippingAddress, saveShippingAddress } = useCart();
  const navigate = useNavigate();

  const [address, setAddress] = useState(shippingAddress.address || '');
  const [city, setCity] = useState(shippingAddress.city || '');
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode || '');
  const [country, setCountry] = useState(shippingAddress.country || 'Brasil');

  const submitHandler = (e) => {
    e.preventDefault();
    saveShippingAddress({ address, city, postalCode, country });
    
    // 2. NAVEGA PARA A TELA DE PAGAMENTO (em vez do alerta)
    navigate('/payment'); 
  };

  return (
    <div className="shipping-container">
      {/* 3. ADICIONA O "MAPA" (Etapa 1 ativa) */}
      <CheckoutSteps step1 /> 
      
      <form onSubmit={submitHandler} className="shipping-form">
        <h1 className="shipping-title">Endereço de Entrega</h1>
        
        <div className="form-group">
          <label htmlFor="address">Endereço (Rua, Número, Bairro)</label>
          <input
            type="text"
            id="address"
            placeholder="Ex: Rua das Flores, 123, Centro"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="city">Cidade</label>
          <input
            type="text"
            id="city"
            placeholder="Ex: São Paulo"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="postalCode">CEP (Código Postal)</label>
          <input
            type="text"
            id="postalCode"
            placeholder="Ex: 01000-000"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="country">País</label>
          <input
            type="text"
            id="country"
            placeholder="Ex: Brasil"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            required
          />
        </div>
        
        <button type="submit" className="btn-action btn-primary">
          Continuar para Pagamento
        </button>
      </form>
    </div>
  );
};

export default ShippingScreen;