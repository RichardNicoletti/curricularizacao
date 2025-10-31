import React, { useMemo, useRef, useContext, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from './Header';
import { AnimalContext } from '../context/AnimalContext';

const STORAGE_KEY = 'acapra_local_animais';
const ADOPTIONS_KEY = 'acapra_pedidos_adocao';

export default function AnimalDetalhes() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { animais: animaisCtx = [] } = useContext(AnimalContext);

  // busca animal no sessionStorage + contexto
  const animaisLocal = useMemo(() => {
    try {
      const raw = sessionStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  }, []);

  const animal = useMemo(() => {
    const numId = Number(id);
    return (
      animaisLocal.find((a) => a.id === numId) ||
      animaisCtx.find((a) => a.id === numId) ||
      null
    );
  }, [id, animaisLocal, animaisCtx]);

  // modal do formulário
  const [showModal, setShowModal] = useState(false);

  // refs do formulário
  const nomeRef = useRef(null);
  const emailRef = useRef(null);
  const telRef = useRef(null);
  const cidadeRef = useRef(null);
  const msgRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!animal) return;

    const pedido = {
      when: new Date().toISOString(),
      animalId: animal.id,
      animalNome: animal.nome,
      nome: nomeRef.current?.value?.trim() || '',
      email: emailRef.current?.value?.trim() || '',
      telefone: telRef.current?.value?.trim() || '',
      cidade: cidadeRef.current?.value?.trim() || '',
      mensagem: msgRef.current?.value?.trim() || '',
    };

    if (!pedido.nome || !pedido.email || !pedido.telefone) {
      alert('Preencha nome, e-mail e telefone.');
      return;
    }

    try {
      const raw = sessionStorage.getItem(ADOPTIONS_KEY);
      const arr = raw ? JSON.parse(raw) : [];
      arr.push(pedido);
      sessionStorage.setItem(ADOPTIONS_KEY, JSON.stringify(arr));
    } catch {}

    alert('Pedido de adoção enviado com sucesso! Entraremos em contato.');
    setShowModal(false);
  };

  if (!animal) {
    return (
      <>
        <Header />
        <div style={{ padding: 24, maxWidth: 900, margin: '0 auto' }}>
          <h2>Animal não encontrado</h2>
          <button
            onClick={() => navigate(-1)}
            style={{
              padding: '8px 14px',
              borderRadius: 8,
              border: '1px solid #ccc',
              cursor: 'pointer'
            }}
          >
            ← Voltar
          </button>
        </div>
      </>
    );
  }

  return (
    <>
      <Header />

      <div style={{ background: '#f3f4f6', padding: '24px 16px', minHeight: 'calc(100vh - 64px)' }}>
        <div
          style={{
            maxWidth: 980,
            margin: '0 auto',
            background: '#fff',
            borderRadius: 12,
            boxShadow: '0 6px 18px rgba(0,0,0,.08)',
            overflow: 'hidden'
          }}
        >
          {/* topo com imagem e infos básicas */}
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr' }}>
            <div style={{ background: '#fafafa', minHeight: 340 }}>
              <img
                src={animal.imagem || 'https://placehold.co/800x600?text=Sem+Imagem'}
                alt={animal.nome}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>

            <div style={{ padding: 22 }}>
              <h2 style={{ margin: '0 0 6px 0' }}>{animal.nome}</h2>
              <div style={{ color: '#555', marginBottom: 12 }}>{animal.tipo || 'Animal'}</div>

              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 12 }}>
                {animal.raca && <Badge>{animal.raca}</Badge>}
                {animal.idade && <Badge>{animal.idade}</Badge>}
              </div>

              <p style={{ lineHeight: 1.5, color: '#333' }}>{animal.descricao}</p>

              <div style={{ display: 'flex', gap: 10, marginTop: 18 }}>
                <button
                  onClick={() => setShowModal(true)}
                  style={{
                    padding: '10px 14px',
                    background: '#1b5e20',
                    color: '#fff',
                    borderRadius: 8,
                    border: 'none',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  Quero adotar
                </button>
                <button
                  onClick={() => navigate(-1)}
                  style={{
                    padding: '10px 14px',
                    borderRadius: 8,
                    border: '1px solid #ccc',
                    background: '#fff',
                    cursor: 'pointer'
                  }}
                >
                  ← Voltar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ===== MODAL DE ADOÇÃO ===== */}
      {showModal && (
        <Modal title={`Adotar ${animal.nome}`} onClose={() => setShowModal(false)}>
          <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 10 }}>
            <img
              src={animal.imagem || 'https://placehold.co/600x400?text=Sem+Imagem'}
              alt={animal.nome}
              style={{
                width: '100%',
                height: 240,
                objectFit: 'cover',
                borderRadius: 8,
                marginBottom: 10
              }}
            />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              <input ref={nomeRef} placeholder="Seu nome completo *" required />
              <input ref={emailRef} type="email" placeholder="E-mail *" required />
              <input ref={telRef} placeholder="Telefone/WhatsApp *" required />
              <input ref={cidadeRef} placeholder="Cidade/UF" />
            </div>
            <textarea ref={msgRef} placeholder="Mensagem (opcional)" rows={4} />
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                style={{
                  padding: '8px 12px',
                  borderRadius: 8,
                  border: '1px solid #ccc',
                  background: '#fff',
                  cursor: 'pointer'
                }}
              >
                Cancelar
              </button>
              <button
                type="submit"
                style={{
                  padding: '8px 16px',
                  borderRadius: 8,
                  border: 'none',
                  background: 'green',
                  color: '#fff',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                Enviar pedido
              </button>
            </div>
          </form>
        </Modal>
      )}
    </>
  );
}

// ===== COMPONENTE MODAL =====
function Modal({ title, onClose, children }) {
  const overlayRef = useRef(null);

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose?.();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <div
      ref={overlayRef}
      onClick={(e) => e.target === overlayRef.current && onClose?.()}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,.35)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 2000
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: 'min(720px, 92vw)',
          background: '#fff',
          borderRadius: 12,
          boxShadow: '0 10px 30px rgba(0,0,0,.2)',
          padding: 20
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ margin: 0 }}>{title}</h3>
          <button
            onClick={onClose}
            style={{
              border: 'none',
              background: 'transparent',
              fontSize: 22,
              cursor: 'pointer',
              lineHeight: 1
            }}
            aria-label="Fechar"
          >
            ✕
          </button>
        </div>
        <div style={{ marginTop: 10 }}>{children}</div>
      </div>
    </div>
  );
}

function Badge({ children }) {
  return (
    <span
      style={{
        padding: '4px 10px',
        borderRadius: 999,
        background: '#e8f5e9',
        border: '1px solid #c8e6c9',
        color: '#2e7d32',
        fontSize: 12,
        fontWeight: 700
      }}
    >
      {children}
    </span>
  );
}
