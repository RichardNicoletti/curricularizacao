import React from 'react';

function NoticiaCard({ titulo, resumo, imagem, data }) {
  return (
    <div style={{
      backgroundColor: 'white',
      width: '320px',
      margin: '15px',
      padding: '20px',
      borderRadius: '10px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
    }}>
      <img
        src={imagem}
        alt={titulo}
        style={{
          width: '100%',
          height: '180px',
          objectFit: 'cover',
          borderRadius: '6px'
        }}
      />
      <h3 style={{ margin: '15px 0 5px', color: '#2e7d32' }}>{titulo}</h3>
      <small style={{ color: '#777' }}>{new Date(data).toLocaleDateString()}</small>
      <p style={{ marginTop: '10px', color: '#444' }}>{resumo}</p>
    </div>
  );
}

export default NoticiaCard;
