import React from 'react';
import Header from '../components/Header';
import NoticiaCard from '../components/NoticiaCard';

function Noticias() {
  const noticias = [
    {
      id: 1,
      titulo: 'Feira de Adoção neste sábado!',
      resumo: 'Mais de 30 animais estarão disponíveis para adoção em nossa feira especial.',
      imagem: 'https://placedog.net/400/305?id=1',
      data: '2025-05-10',
    },
    {
      id: 2,
      titulo: 'Campanha de vacinação gratuita',
      resumo: 'Vacine seu pet gratuitamente durante o mês de maio. Confira os postos participantes!',
      imagem: 'https://placedog.net/400/306?id=2',
      data: '2025-05-08',
    },
    {
      id: 3,
      titulo: 'Evento "Cãominhada Solidária"',
      resumo: 'Participe da caminhada solidária com seu melhor amigo e ajude a causa animal!',
      imagem: 'https://placedog.net/400/307?id=3',
      data: '2025-05-05',
    },
  ];

  return (
    <>
      <Header />

      <div style={{
        backgroundColor: '#f1f1f1',
        padding: '30px 20px',
        marginTop: '50px',
        fontFamily: 'sans-serif',
        textAlign: 'center'
      }}>
        <h2 style={{ marginBottom: '10px', color: '#2d3436' }}>Notícias e Eventos</h2>
        <p style={{ color: '#636e72' }}>
          Fique por dentro das ações, eventos e campanhas da ACAPRA!
        </p>
      </div>

      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        backgroundColor: '#eee',
        padding: '20px'
      }}>
        {noticias.map(noticia => (
          <NoticiaCard key={noticia.id} {...noticia} />
        ))}
      </div>
    </>
  );
}

export default Noticias;
