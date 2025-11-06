// src/components/Hero.jsx

import React from 'react';
import './Hero.css'; // Vamos criar o CSS para este componente

const Hero = () => {
  return (
    <section className="hero">
      {/* 2. Overlay gradient suave (do seu plano) */}
      <div className="hero-overlay"></div>
      
      {/* 2. Conteúdo com textos grandes e bold + animação (do seu plano) */}
      <div className="hero-content">
        <span className="hero-subtitle">Nova Coleção</span>
        <h1 className="hero-title">DESAFIE SEUS LIMITES</h1>
        <p className="hero-description">Equipamento de performance criado para ir além.</p>
        <a href="#" className="hero-cta-button">Comprar Agora</a>
      </div>
    </section>
  );
};

export default Hero;