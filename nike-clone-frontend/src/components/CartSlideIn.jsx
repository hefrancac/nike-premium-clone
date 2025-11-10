// src/components/CartSlideIn.jsx (ATUALIZADO PARA CHECKOUT)

import React from 'react';
// 1. Importar Link e useNavigate
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext'; // Importar o nosso hook
import './CartSlideIn.css'; // Vamos criar este CSS
import { FaTimes, FaTrash } from 'react-icons/fa'; // Ícones

const CartSlideIn = () => {
  // Pegar os dados e funções do nosso "cérebro" (Context)
  const { isCartOpen, closeCart, cartItems, removeFromCart, cartItemCount } = useCart();
  
  // 2. Inicializar o hook de navegação
  const navigate = useNavigate(); 

  // Calcular o preço total
  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.qty, 0);

  // 3. Função para navegar para o checkout
  const handleCheckout = () => {
    closeCart(); // Fecha o slide-in
    navigate('/shipping'); // Navega para a nova página de endereço
  };

  return (
    <>
      {/* O Overlay (fundo escuro) */}
      <div 
        className={`cart-overlay ${isCartOpen ? 'open' : ''}`}
        onClick={closeCart} 
      ></div>

      {/* O Painel Lateral (Slide-in) */}
      <div className={`cart-slide-in ${isCartOpen ? 'open' : ''}`}>
        <div className="cart-header">
          <h3>Carrinho ({cartItemCount})</h3>
          <button onClick={closeCart} className="cart-close-btn">
            <FaTimes />
          </button>
        </div>

        <div className="cart-body">
          {cartItems.length === 0 ? (
            <p className="cart-empty-message">O seu carrinho está vazio.</p>
          ) : (
            cartItems.map((item) => (
              <div key={item._id} className="cart-item">
                <img src={item.image} alt={item.name} className="cart-item-image" />
                <div className="cart-item-details">
                  
                  {/* 4. (BÔNUS): Transformar o nome em um link */}
                  <Link 
                    to={`/produto/${item._id}`} 
                    className="cart-item-name"
                    onClick={closeCart} // Fecha o modal ao navegar
                  >
                    {item.name}
                  </Link>

                  <span className="cart-item-price">
                    {item.qty} x {item.price.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}
                  </span>
                </div>
                <button 
                  onClick={() => removeFromCart(item._id)} 
                  className="cart-item-remove-btn"
                >
                  <FaTrash />
                </button>
              </div>
            ))
          )}
        </div>

        {/* O Footer do Carrinho (só aparece se houver itens) */}
        {cartItems.length > 0 && (
          <div className="cart-footer">
            <div className="cart-subtotal">
              <span>Subtotal:</span>
              <span>{totalPrice.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</span>
            </div>
            
            {/* 5. ATUALIZAÇÃO: Botão agora chama handleCheckout */}
            <button onClick={handleCheckout} className="cart-checkout-btn">
              Ir para o Checkout
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default CartSlideIn;