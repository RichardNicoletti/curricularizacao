import React from 'react';
import { Link } from 'react-router-dom';

function Login() {
  return (
    <div style={{ backgroundColor: '#e0e0e0', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '40px' }}>

      <Link to="/">
        <img src="public/logo_acapra.png" alt="Logo ACAPRA" style={{ width: '100px', marginBottom: '20px' }} />
      </Link>

      {/* Box Login */}
      <div style={{
        backgroundColor: 'white',
        padding: '30px 40px',
        borderRadius: '16px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
        width: '100%',
        maxWidth: '400px',
        marginBottom: '20px'
      }}>
        <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Acesse sua conta</h2>

        <input type="text" placeholder="E-mail, CPF ou CNPJ" style={inputStyle} />
        <input type="password" placeholder="Digite sua senha" style={inputStyle} />

        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', marginBottom: '20px' }}>
          <label>
            <input type="checkbox" style={{ marginRight: '5px' }} />
            Mantenha-me conectado
          </label>
          <a href="#" style={{ color: '#6c757d', textDecoration: 'none' }}>Esqueci minha senha</a>
        </div>

        <button style={{
          backgroundColor: '#d58d3c',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          padding: '12px',
          width: '100%',
          fontWeight: 'bold',
          cursor: 'pointer'
        }}>
          Login
        </button>
      </div>

      {/* Box Criar Conta */}
      <div style={{
        backgroundColor: 'white',
        padding: '25px 35px',
        borderRadius: '16px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
        width: '100%',
        maxWidth: '400px',
        textAlign: 'center'
      }}>
        <h3>Não possui uma conta?</h3>
        <p>Crie agora uma conta gratuita e adote o seu animalzinho de estimação novo!</p>
        <button style={{
          marginTop: '10px',
          backgroundColor: '#5c4d91',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          padding: '12px 24px',
          fontWeight: 'bold',
          cursor: 'pointer'
        }}>
          Criar conta
        </button>
      </div>
    </div>
  );
}

const inputStyle = {
  width: '100%',
  padding: '12px',
  marginBottom: '12px',
  borderRadius: '8px',
  border: '1px solid #ccc',
  fontSize: '16px'
};

export default Login;
