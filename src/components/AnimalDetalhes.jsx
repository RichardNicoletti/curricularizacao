/*import { useParams, useNavigate } from 'react-router-dom';
import { useAnimalContext } from '../context/AnimalContext';
import Header from '../components/Header';

const AnimalDetalhes = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { animais } = useAnimalContext();

  const animal = animais.find(a => a.id === parseInt(id));

  if (!animal) {
    return (
      <>
        <Header />
        <div style={{ paddingTop: '100px', textAlign: 'center' }}>
          <p>Animal não encontrado. <button onClick={() => navigate('/')}>Voltar</button></p>
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      <div style={{ backgroundColor: '#f0f0f0', minHeight: '100vh', paddingTop: '100px' }}>
        <div style={{
          maxWidth: '900px',
          backgroundColor: 'white',
          margin: 'auto',
          padding: '30px',
          borderRadius: '12px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          display: 'flex',
          gap: '30px'
        }}>
          <div style={{ flex: 1 }}>
            <img src={animal.imagem} alt={animal.nome} style={{ width: '100%', borderRadius: '10px' }} />
          </div>
          <div style={{ flex: 2 }}>
            <h2>{animal.nome}</h2>
            <p><strong>Tipo:</strong> {animal.tipo}</p>
            <p><strong>Raça:</strong> {animal.raca}</p>
            <p><strong>Idade:</strong> {animal.idade}</p>
            <p><strong>Porte:</strong> {animal.porte}</p>
            <p><strong>Castrado:</strong> {animal.castrado ? 'Sim' : 'Não'}</p>
            <p><strong>Vacinado:</strong> {animal.vacinado ? 'Sim' : 'Não'}</p>
            <p>{animal.descricao}</p>
            <button onClick={() => navigate('/')}>Voltar</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AnimalDetalhes;
*/

import { useParams, useNavigate } from 'react-router-dom';
import { useAnimalContext } from '../context/AnimalContext';
import Header from '../components/Header';
import { useState } from 'react';

const AnimalDetalhes = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { animais } = useAnimalContext();
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  const animal = animais.find(a => a.id === parseInt(id));

  if (!animal) {
    return (
      <>
        <Header />
        <div style={{ paddingTop: '100px', textAlign: 'center' }}>
          <p>Animal não encontrado. <button onClick={() => navigate('/')}>Voltar</button></p>
        </div>
      </>
    );
  }

  const abrirFormulario = () => setMostrarFormulario(true);
  const fecharFormulario = () => setMostrarFormulario(false);

  const enviarFormulario = (e) => {
    e.preventDefault();
    alert('Pedido de adoção enviado com sucesso!');
    setMostrarFormulario(false);
  };

  return (
    <>
      <Header />
      <div style={{ backgroundColor: '#f0f0f0', minHeight: '100vh', paddingTop: '100px' }}>
        <div style={{
          maxWidth: '1000px',
          backgroundColor: 'white',
          margin: 'auto',
          padding: '40px',
          borderRadius: '16px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          display: 'flex',
          gap: '40px',
          alignItems: 'center'
        }}>
          <div style={{ flex: 1 }}>
            <img src={animal.imagem} alt={animal.nome} style={{ width: '100%', borderRadius: '12px' }} />
          </div>
          <div style={{ flex: 2 }}>
            <h2 style={{ fontSize: '28px', marginBottom: '10px' }}>{animal.nome} {animal.genero}</h2>
            <p><strong>Tipo:</strong> {animal.tipo || 'Não informado'}</p>
            <p><strong>Raça:</strong> {animal.raca || 'Não informada'}</p>
            <p><strong>Idade:</strong> {animal.idade || 'Não informada'}</p>
            <p><strong>Porte:</strong> {animal.porte || 'Não informado'}</p>
            <p><strong>Castrado:</strong> {animal.castrado ? 'Sim' : 'Não'}</p>
            <p><strong>Vacinado:</strong> {animal.vacinado ? 'Sim' : 'Não'}</p>
            <p style={{ marginTop: '20px' }}>{animal.descricao}</p>

            <div style={{ marginTop: '30px', display: 'flex', gap: '10px' }}>
              <button
                onClick={abrirFormulario}
                style={{
                  padding: '10px 20px',
                  backgroundColor: '#6c5ce7',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                }}
              >
                Quero Adotar
              </button>
              <button
                onClick={() => navigate('/')}
                style={{
                  padding: '10px 20px',
                  backgroundColor: '#b2bec3',
                  color: '#2d3436',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                }}
              >
                Voltar
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* formulário */}
      {mostrarFormulario && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 999,
        }}>
          <form onSubmit={enviarFormulario} style={{
            backgroundColor: 'white',
            padding: '30px',
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
            width: '100%',
            maxWidth: '500px',
          }}>
            <h3 style={{ marginBottom: '20px' }}>Formulário de Adoção - {animal.nome}</h3>

            <div style={{ marginBottom: '15px' }}>
              <label>Nome Completo:</label><br />
              <input type="text" required style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #ccc' }} />
            </div>

            <div style={{ marginBottom: '15px' }}>
              <label>Telefone:</label><br />
              <input type="tel" required style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #ccc' }} />
            </div>

            <div style={{ marginBottom: '15px' }}>
              <label>Mensagem:</label><br />
              <textarea rows="4" style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #ccc' }} />
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <button type="button" onClick={fecharFormulario} style={{
                padding: '8px 16px',
                backgroundColor: '#d63031',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer'
              }}>
                Cancelar
              </button>
              <button type="submit" style={{
                padding: '8px 16px',
                backgroundColor: '#00b894',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer'
              }}>
                Enviar
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default AnimalDetalhes;
