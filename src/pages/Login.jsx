import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState(null);        // { type: 'success' | 'error', text: string }
  const navigate = useNavigate();

  const handleLogin = async () => {
    setLoading(true);
    setMsg(null);

    try {
      const response = await fetch(
        'https://minha-api-436570381663.southamerica-east1.run.app/api/auth/login',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, senha }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        setMsg({ type: 'success', text: 'Login realizado com sucesso! Redirecionando…' });
        // aguarda 1s para o usuário ver a mensagem e depois navega
        setTimeout(() => navigate('/'), 1000);
      } else {
        setMsg({ type: 'error', text: data.message || 'Credenciais inválidas.' });
      }
    } catch (err) {
      setMsg({ type: 'error', text: 'Erro ao conectar com o servidor.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ backgroundColor: '#e0e0e0', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '40px' }}>
      <Link to="/">
        <img src="/logo_acapra.png" alt="Logo ACAPRA" style={{ width: '100px', marginBottom: '20px' }} />
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

        <input
          type="text"
          placeholder="E-mail"
          style={inputStyle}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Digite sua senha"
          style={inputStyle}
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />

        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', marginBottom: '12px' }}>
          <label>
            <input type="checkbox" style={{ marginRight: '5px' }} />
            Mantenha-me conectado
          </label>
          <a href="#" style={{ color: '#6c757d', textDecoration: 'none' }}>Esqueci minha senha</a>
        </div>

        <button
          onClick={handleLogin}
          disabled={loading}
          style={{
            backgroundColor: loading ? '#b07a33' : '#d58d3c',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            padding: '12px',
            width: '100%',
            fontWeight: 'bold',
            cursor: loading ? 'not-allowed' : 'pointer',
            transition: 'filter .2s'
          }}
        >
          {loading ? 'Entrando…' : 'Login'}
        </button>

        {/* Mensagem bonita abaixo do botão */}
        {msg && (
          <div
            style={{
              marginTop: '12px',
              padding: '10px 12px',
              borderRadius: '10px',
              fontSize: '14px',
              lineHeight: 1.3,
              background: msg.type === 'success' ? 'rgba(22,163,74,.12)' : 'rgba(239,68,68,.12)',
              color: msg.type === 'success' ? '#166534' : '#7f1d1d',
              border: `1px solid ${msg.type === 'success' ? 'rgba(22,163,74,.35)' : 'rgba(239,68,68,.35)'}`
            }}
          >
            {msg.text}
          </div>
        )}
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
        <button
          style={{
            marginTop: '10px',
            backgroundColor: '#5c4d91',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            padding: '12px 24px',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}
          onClick={() => navigate('/register')}
        >
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
