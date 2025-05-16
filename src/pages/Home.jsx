import React, { useContext } from 'react';
import Header from '../components/Header';
import AnimalCard from '../components/AnimalCard';
import { Link } from 'react-router-dom';
import { AnimalContext } from '../context/AnimalContext';

function Home() {
  const { animais } = useContext(AnimalContext);

  return (
    <>
      <Header />

      <div style={{
        backgroundColor: 'white',
        marginTop: '15px',
        padding: '20px',
        display: 'flex',
        justifyContent: 'center',
        gap: '40px',
        borderBottom: '1px solid #ccc'
      }}>
        <span>Faça uma doação</span>
        <span>Lojinha Acapra</span>
        <span>Prestação de contas</span>
      </div>

      {/* Cards */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        backgroundColor: '#eee',
        padding: '20px'
      }}>
        {animais.map((animal) => (
          <Link
            key={animal.id}
            to={`/animal/${animal.id}`}
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <AnimalCard {...animal} />
          </Link>
        ))}
      </div>

      <div style={{ textAlign: 'center', padding: '10px' }}>
        <a href="#" style={{ color: 'green', fontWeight: 'bold', fontSize: '16px' }}>
          Ver todos os animais disponíveis →
        </a>
      </div>

      <div style={{ backgroundColor: '#6c5ce7', color: 'white', padding: '30px', textAlign: 'center' }}>
        <h2 style={{ maxWidth: '800px', margin: 'auto', fontFamily: 'sans-serif' }}>Conheça a ACAPRA</h2>
        <p style={{ maxWidth: '800px', margin: 'auto', fontFamily: 'sans-serif' }}>
          A ACAPRA, atualmente chamada de Associação Brusquense de Proteção aos Animais, foi fundada em 1999 como uma filial da ACAPRA de Florianópolis, tornando-se autônoma ao longo dos anos. Com uma diretoria renovada e cerca de 20 voluntários, a ONG atua na defesa e proteção animal em Brusque, enfrentando desafios como a rotatividade de voluntários. Atualmente, é presidida por Lílian Dressel e conta com o apoio de outros membros na diretoria. Na próxima semana, será abordado como a ACAPRA se mantém e a contribuição de seus parceiros.
        </p>
      </div>
    </>
  );
}

export default Home;
