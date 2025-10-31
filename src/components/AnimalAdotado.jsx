import React from 'react';

function AnimalAdotado({ nome, descricao, imagem, genero }) {
  return (
    <div style={{
      width: '220px',
      backgroundColor: '#fff',
      borderRadius: '10px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      overflow: 'hidden',
      margin: '10px',
    }}>
      <img src={imagem} alt={nome} style={{ width: '100%', height: '150px', objectFit: 'cover' }} />
      <div style={{ padding: '10px' }}>
        <h3 style={{ margin: '5px 0' }}>{nome} {genero}</h3>
        <p style={{ fontSize: '14px', color: '#555' }}>{descricao}</p>
      </div>
    </div>
  );
}

export default AnimalAdotado;
