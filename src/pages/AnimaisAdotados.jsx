import React from 'react';
import Header from '../components/Header';
import AnimalAdotado from '../components/AnimalAdotado';

function AnimaisAdotados() {
  const adotados = [
    {
      nome: 'Tobias',
      genero: '♂',
      imagem: 'https://placedog.net/400/301?id=1',
      descricao: 'Tobias foi adotado por uma família maravilhosa em janeiro de 2024.',
    },
    {
      nome: 'Nina',
      genero: '♀',
      imagem: 'https://placedog.net/400/302?id=2',
      descricao: 'Nina agora vive em uma casa cheia de amor com duas crianças.',
    },
    {
      nome: 'Rex',
      genero: '♂',
      imagem: 'https://placedog.net/400/303?id=3',
      descricao: 'Resgatado de maus-tratos, Rex agora é tratado como rei!',
    },
    {
      nome: 'Mel',
      genero: '♀',
      imagem: 'https://placedog.net/400/304?id=4',
      descricao: 'Mel encontrou um lar cheio de carinho e brincadeiras.',
    },
  ];

  return (
    <>
      <Header />

      <div style={{
        backgroundColor: '#f9f9f9',
        padding: '30px 20px',
        marginTop: '50px',
        fontFamily: 'sans-serif',
        textAlign: 'center'
      }}>
        <h2 style={{ marginBottom: '10px', color: '#2d3436' }}>Animais que já foram adotados</h2>
        <p style={{ color: '#636e72' }}>
          Estes são alguns dos animais que já encontraram um novo lar graças ao apoio da comunidade!
        </p>
      </div>

      {/* Cards dos adotados */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        backgroundColor: '#eee',
        padding: '20px'
      }}>
        {adotados.map((animal, index) => (
          <AnimalAdotado key={index} {...animal} />
        ))}
      </div>
    </>
  );
}

export default AnimaisAdotados;
