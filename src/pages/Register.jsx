import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Msg = ({ type, children }) => (
  <div
    style={{
      marginTop: 12,
      padding: '10px 12px',
      borderRadius: 10,
      fontSize: 14,
      background: type === 'success' ? 'rgba(22,163,74,.12)' : 'rgba(239,68,68,.12)',
      color: type === 'success' ? '#166534' : '#7f1d1d',
      border: `1px solid ${type === 'success' ? 'rgba(22,163,74,.35)' : 'rgba(239,68,68,.35)'}`
    }}
  >
    {children}
  </div>
);

export default function Register() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState(null);

  // campos exigidos pelo seu Swagger
  const [form, setForm] = useState({
    nome: '',
    endereco: '',
    telefone: '',
    email: '',
    senha: '',
    cpf: '',
    dataNascimento: '',
    tipoUsuario: 1,     // 1=adotante (exemplo); ajuste se seu backend usar outro padrão
    statusUsuario: 1    // ativo (pelo seu exemplo do login)
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const validate = () => {
    if (!form.nome || !form.email || !form.senha) return 'Preencha nome, e-mail e senha.';
    if (!/^\S+@\S+\.\S+$/.test(form.email)) return 'E-mail inválido.';
    if (form.senha.length < 6) return 'Senha deve ter ao menos 6 caracteres.';
    if (!form.dataNascimento) return 'Informe a data de nascimento.';
    return null;
  };

  const handleRegister = async () => {
    const err = validate();
    if (err) {
      setMsg({ type: 'error', text: err });
      return;
    }

    setLoading(true);
    setMsg(null);

    try {
      // Backend mostra ISO em Z; vamos mandar como YYYY-MM-DDT00:00:00.000Z
      const isoBirth = `${form.dataNascimento}T00:00:00.000Z`;

      const body = {
        nome: form.nome,
        endereco: form.endereco,
        telefone: form.telefone,
        senha: form.senha,
        tipoUsuario: Number(form.tipoUsuario),
        email: form.email,
        statusUsuario: Number(form.statusUsuario),
        cpf: form.cpf,
        dataNascimento: isoBirth
      };

      const resp = await fetch(
        'https://minha-api-436570381663.southamerica-east1.run.app/api/auth/register',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body)
        }
      );

      const data = await resp.json().catch(() => ({}));

      if (resp.ok) {
        setMsg({ type: 'success', text: 'Conta criada com sucesso! Redirecionando para o login…' });
        setTimeout(() => navigate('/login'), 1000);
      } else {
        setMsg({ type: 'error', text: data.message || 'Não foi possível criar a conta.' });
      }
    } catch (e) {
      setMsg({ type: 'error', text: 'Erro ao conectar com o servidor.' });
    } finally {
      setLoading(false);
    }
  };

  const input = {
    width: '100%',
    padding: 12,
    marginBottom: 12,
    borderRadius: 8,
    border: '1px solid #ccc',
    fontSize: 16
  };

  return (
    <div style={{ backgroundColor: '#e0e0e0', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 40 }}>
      <Link to="/">
        <img src="/logo_acapra.png" alt="Logo ACAPRA" style={{ width: 100, marginBottom: 20 }} />
      </Link>

      <div style={{ backgroundColor: 'white', padding: '30px 40px', borderRadius: 16, boxShadow: '0 2px 8px rgba(0,0,0,.2)', width: '100%', maxWidth: 480 }}>
        <h2 style={{ textAlign: 'center', marginBottom: 20 }}>Crie sua conta</h2>

        <input name="nome" placeholder="Nome completo" style={input} value={form.nome} onChange={handleChange} />
        <input name="endereco" placeholder="Endereço" style={input} value={form.endereco} onChange={handleChange} />
        <input name="telefone" placeholder="Telefone" style={input} value={form.telefone} onChange={handleChange} />
        <input name="email" type="email" placeholder="E-mail" style={input} value={form.email} onChange={handleChange} />
        <input name="senha" type="password" placeholder="Senha" style={input} value={form.senha} onChange={handleChange} />
        <input name="cpf" placeholder="CPF" style={input} value={form.cpf} onChange={handleChange} />
        <label style={{ fontSize: 14, marginBottom: 6, display: 'block' }}>Data de nascimento</label>
        <input name="dataNascimento" type="date" style={input} value={form.dataNascimento} onChange={handleChange} />

        <div style={{ display: 'flex', gap: 12 }}>
          <div style={{ flex: 1 }}>
            <label style={{ fontSize: 14, marginBottom: 6, display: 'block' }}>Tipo de usuário</label>
            <select name="tipoUsuario" style={{ ...input, padding: 10 }} value={form.tipoUsuario} onChange={handleChange}>
              <option value={1}>Adotante</option>
              <option value={2}>Administrador</option>
              {/* ajuste de valores conforme seu backend */}
            </select>
          </div>
          <div style={{ flex: 1 }}>
            <label style={{ fontSize: 14, marginBottom: 6, display: 'block' }}>Status</label>
            <select name="statusUsuario" style={{ ...input, padding: 10 }} value={form.statusUsuario} onChange={handleChange}>
              <option value={1}>Ativo</option>
              <option value={0}>Inativo</option>
            </select>
          </div>
        </div>

        <button
          onClick={handleRegister}
          disabled={loading}
          style={{
            backgroundColor: loading ? '#b07a33' : '#d58d3c',
            color: 'white',
            border: 'none',
            borderRadius: 8,
            padding: 12,
            width: '100%',
            fontWeight: 'bold',
            cursor: loading ? 'not-allowed' : 'pointer',
            marginTop: 6
          }}
        >
          {loading ? 'Criando conta…' : 'Criar conta'}
        </button>

        {msg && <Msg type={msg.type}>{msg.text}</Msg>}

        <p style={{ textAlign: 'center', marginTop: 16 }}>
          Já possui conta? <Link to="/login">Entrar</Link>
        </p>
      </div>
    </div>
  );
}
