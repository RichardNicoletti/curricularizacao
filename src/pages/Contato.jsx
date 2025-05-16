import React, { useState } from 'react';
import Header from '../components/Header';

function Contato() {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    cidade: '',
    motivo: ''
  });

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    console.log('Dados do formulário:', formData);
    alert('Formulário enviado com sucesso! (simulação)');
  };

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
        <h2 style={{ marginBottom: '10px', color: '#2d3436' }}>Formulário de Contato</h2>
        <p style={{ color: '#636e72' }}>
          Preencha o formulário abaixo e entraremos em contato com você em breve.
        </p>
      </div>

      <form onSubmit={handleSubmit} style={{
        maxWidth: '600px',
        margin: '30px auto',
        backgroundColor: '#fff',
        padding: '30px',
        borderRadius: '10px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
      }}>
        <div style={{ marginBottom: '20px' }}>
          <label htmlFor="nome" style={{ display: 'block', marginBottom: '5px' }}>Nome completo</label>
          <input
            type="text"
            id="nome"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ccc' }}
          />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label htmlFor="email" style={{ display: 'block', marginBottom: '5px' }}>E-mail</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ccc' }}
          />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label htmlFor="telefone" style={{ display: 'block', marginBottom: '5px' }}>Telefone</label>
          <input
            type="tel"
            id="telefone"
            name="telefone"
            value={formData.telefone}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ccc' }}
          />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label htmlFor="cidade" style={{ display: 'block', marginBottom: '5px' }}>Cidade</label>
          <input
            type="text"
            id="cidade"
            name="cidade"
            value={formData.cidade}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ccc' }}
          />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label htmlFor="motivo" style={{ display: 'block', marginBottom: '5px' }}>Motivo do contato</label>
          <textarea
            id="motivo"
            name="motivo"
            value={formData.motivo}
            onChange={handleChange}
            required
            rows="4"
            style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ccc' }}
          />
        </div>

        <button type="submit" style={{
          backgroundColor: '#2e7d32',
          color: 'white',
          border: 'none',
          padding: '12px 20px',
          borderRadius: '6px',
          cursor: 'pointer'
        }}>
          Enviar
        </button>
      </form>
    </>
  );
}

export default Contato;
