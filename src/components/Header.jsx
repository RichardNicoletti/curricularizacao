import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header style={{
      backgroundColor: '#2e7d32',
      padding: '15px 20px',
      color: 'white',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      <div style={{ fontWeight: 'bold' }}>
  <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>🐾 ACAPRA</Link>
</div>

      <nav style={{ display: 'flex', gap: '50px' }}>
        <a href="#" style={{ color: 'white', fontFamily: 'sans-serif', textDecoration: 'none' }}>História e missão</a>
        <Link to="/AnimaisAdotados" style={{ color: 'white', fontFamily: 'sans-serif', textDecoration: 'none' }}>Animais já doados</Link>
        <Link to="/noticias" style={{ color: 'white',fontFamily: 'sans-serif', textDecoration: 'none' }}>Notícias</Link>
        <Link to="/contato" style={{ color: 'white',fontFamily: 'sans-serif', textDecoration: 'none' }}>Formulário de contato</Link>
        <a href="#" style={{ color: 'white', fontFamily: 'sans-serif',textDecoration: 'none' }}>Dúvidas?</a>
      </nav>

      <div style={{ display: 'flex', gap: '10px' }}>
        <button style={{
          backgroundColor: '#f4a261',
          border: 'none',
          padding: '10px 12px',
          borderRadius: '8px'
        }}>
          Quero adotar
        </button>

        <Link to="/login" style={{ textDecoration: 'none' }}>
          <button style={{
            backgroundColor: 'white',
            border: '2px solid #2e7d32',
            color: '#2e7d32',
            padding: '8px 40px',
            borderRadius: '8px',
            cursor: 'pointer'
          }}>
            Entrar
          </button>
        </Link>
      </div>
    </header>
  );
}

export default Header;
