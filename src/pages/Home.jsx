import React, { useContext, useMemo, useState, useRef, useEffect } from 'react';
import Header from '../components/Header';
import AnimalCard from '../components/AnimalCard';
import { Link } from 'react-router-dom';
import { AnimalContext } from '../context/AnimalContext';

const STORAGE_KEY = 'acapra_local_animais';

function Home() {
  const { animais } = useContext(AnimalContext);
  const [q, setQ] = useState('');

  const [localAnimais, setLocalAnimais] = useState(() => {
    try {
      const raw = sessionStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });
  useEffect(() => {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(localAnimais));
  }, [localAnimais]);

  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState('create');
  const [editingId, setEditingId] = useState(null);
  const [formKey, setFormKey] = useState('create');

  // refs
  const nomeRef = useRef(null);
  const tipoRef = useRef(null);
  const racaRef = useRef(null);
  const idadeRef = useRef(null);
  const descRef = useRef(null);
  const fileInputRef = useRef(null);
  const imgDataRef = useRef('');
  const [imgPreview, setImgPreview] = useState('');

  const editingAnimal =
    editingId ? localAnimais.find((a) => a.id === editingId) || null : null;

  const norm = (s = '') =>
    s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();

  const todosAnimais = [...localAnimais];
  const filtrados = useMemo(() => {
    const n = norm(q);
    if (!n) return todosAnimais;
    return todosAnimais.filter((a) =>
      [a.nome, a.raca, a.tipo, a.descricao].some((c) =>
        norm(c || '').includes(n)
      )
    );
  }, [q, todosAnimais]);

  // abrir criar
  const openCreate = () => {
    setModalMode('create');
    setEditingId(null);
    setImgPreview('');
    imgDataRef.current = '';
    if (fileInputRef.current) fileInputRef.current.value = '';
    setFormKey('create');
    setShowModal(true);
  };

  // abrir editar
  const openEdit = (id) => {
    setModalMode('edit');
    setEditingId(id);
    const a = localAnimais.find((x) => x.id === id) || null;
    setImgPreview(a?.imagem || '');
    imgDataRef.current = '';
    if (fileInputRef.current) fileInputRef.current.value = '';
    setFormKey(String(id));
    setShowModal(true);
  };

  // salvar (create/edit)
  const handleSubmit = (e) => {
    e.preventDefault();
    const nome = nomeRef.current?.value.trim() || '';
    const tipo = tipoRef.current?.value.trim() || '';
    const raca = racaRef.current?.value.trim() || '';
    const idade = idadeRef.current?.value.trim() || '';
    const descricao = descRef.current?.value.trim() || '';

    if (!nome || !descricao) {
      alert('Preencha pelo menos nome e descrição');
      return;
    }

    const imagemFinal =
      imgDataRef.current ||
      (modalMode === 'edit' ? editingAnimal?.imagem || '' : '') ||
      'https://placehold.co/600x400?text=Sem+Imagem';

    if (modalMode === 'create') {
      const novo = {
        id: Date.now(),
        nome,
        tipo,
        raca,
        idade,
        imagem: imagemFinal,
        descricao
      };
      setLocalAnimais((old) => [...old, novo]);
    } else if (modalMode === 'edit' && editingAnimal) {
      setLocalAnimais((list) =>
        list.map((x) =>
          x.id === editingAnimal.id
            ? { ...x, nome, tipo, raca, idade, imagem: imagemFinal, descricao }
            : x
        )
      );
    }

    setShowModal(false);
    setEditingId(null);
    imgDataRef.current = '';
    setImgPreview('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleDeleteAnimal = (id) => {
    setLocalAnimais((old) => old.filter((a) => a.id !== id));
  };

  const AddCard = ({ onClick }) => (
    <button
      onClick={onClick}
      style={{
        width: 320,
        border: '2px dashed #98c9a3',
        borderRadius: 12,
        background: '#f8fff9',
        cursor: 'pointer',
        margin: 8,
        padding: 0,
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 2px 8px rgba(0,0,0,.06)'
      }}
    >
      <div
        style={{
          height: 200,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 56
        }}
      >
        +
      </div>
      <div style={{ padding: 16, textAlign: 'center', color: '#2e7d32', fontWeight: 700 }}>
        Adicionar novo animal
      </div>
    </button>
  );

  const Modal = ({ open, onClose, children, title }) => {
    const overlayRef = useRef(null);

    useEffect(() => {
      const onKey = (e) => e.key === 'Escape' && onClose?.();
      if (open) window.addEventListener('keydown', onKey);
      return () => window.removeEventListener('keydown', onKey);
    }, [open, onClose]);

    if (!open) return null;
    return (
      <div
        ref={overlayRef}
        onClick={(e) => {
          if (e.target === overlayRef.current) onClose?.();
        }}
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,.35)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          style={{
            width: 'min(760px, 92vw)',
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
            >
              ✕
            </button>
          </div>
          <div style={{ marginTop: 10 }}>{children}</div>
        </div>
      </div>
    );
  };

  return (
    <>
      <Header />
      <div
        style={{
          backgroundColor: 'white',
          marginTop: 15,
          padding: 20,
          display: 'flex',
          justifyContent: 'center',
          gap: 40,
          borderBottom: '1px solid #ccc'
        }}
      >
        <span>Faça uma doação</span>
        <span>Lojinha Acapra</span>
        <span>Prestação de contas</span>
      </div>

      {/* barra de busca */}
      <div style={{ background: '#eee', padding: '18px 20px', display: 'flex', justifyContent: 'center' }}>
        <div style={{ width: '100%', maxWidth: 720, display: 'flex', gap: 8 }}>
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Buscar por nome, raça, espécie ou descrição…"
            style={{
              flex: 1,
              padding: 12,
              borderRadius: 10,
              border: '1px solid #bbb',
              fontSize: 16,
              background: '#fff'
            }}
          />
          {q && (
            <button
              onClick={() => setQ('')}
              style={{
                padding: '0 14px',
                borderRadius: 10,
                border: '1px solid #bbb',
                background: '#fff',
                cursor: 'pointer',
                fontWeight: 'bold'
              }}
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* cards */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          backgroundColor: '#eee',
          padding: 20
        }}
      >
        <AddCard onClick={openCreate} />

        {filtrados.map((animal) => (
          <div key={animal.id} style={{ position: 'relative', margin: 8 }}>
            <Link to={`/animal/${animal.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <AnimalCard {...animal} />
            </Link>
            <div style={{ position: 'absolute', top: 5, right: 5, display: 'flex', gap: 4 }}>
              <button
                onClick={() => openEdit(animal.id)}
                style={{
                  background: 'orange',
                  border: 'none',
                  borderRadius: 4,
                  padding: '2px 6px',
                  cursor: 'pointer',
                  color: '#fff'
                }}
              >
                ✎
              </button>
              <button
                onClick={() => handleDeleteAnimal(animal.id)}
                style={{
                  background: 'red',
                  border: 'none',
                  borderRadius: 4,
                  padding: '2px 6px',
                  cursor: 'pointer',
                  color: '#fff'
                }}
              >
                🗑
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL */}
      <Modal
        open={showModal}
        onClose={() => {
          setShowModal(false);
          setEditingId(null);
          imgDataRef.current = '';
          setImgPreview('');
          if (fileInputRef.current) fileInputRef.current.value = '';
        }}
        title={modalMode === 'edit' ? 'Editar animal' : 'Cadastrar novo animal'}
      >
        <form key={formKey} onSubmit={handleSubmit} style={{ display: 'grid', gap: 12 }}>
          {/* imagem */}
          {imgPreview ? (
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <img
                src={imgPreview}
                alt="Preview"
                style={{ maxWidth: '100%', maxHeight: 240, borderRadius: 8, objectFit: 'cover' }}
              />
            </div>
          ) : (
            <div
              style={{
                textAlign: 'center',
                fontSize: 14,
                color: '#777',
                background: '#fafafa',
                border: '1px dashed #ddd',
                padding: 12,
                borderRadius: 8
              }}
            >
              Sem imagem selecionada
            </div>
          )}

          {/* upload */}
          <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
            <label
              style={{
                display: 'inline-block',
                border: '1px dashed #bbb',
                borderRadius: 8,
                padding: '10px 12px',
                cursor: 'pointer',
                background: '#f7f7f7'
              }}
            >
              Escolher imagem
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
                onChange={(e) => {
                  // salva valores antes de trocar imagem
                  const cache = {
                    nome: nomeRef.current?.value || '',
                    tipo: tipoRef.current?.value || '',
                    raca: racaRef.current?.value || '',
                    idade: idadeRef.current?.value || '',
                    desc: descRef.current?.value || ''
                  };

                  const file = e.target.files?.[0];
                  if (!file) {
                    imgDataRef.current = '';
                    setImgPreview(modalMode === 'edit' ? editingAnimal?.imagem || '' : '');
                    requestAnimationFrame(() => {
                      if (nomeRef.current) nomeRef.current.value = cache.nome;
                      if (tipoRef.current) tipoRef.current.value = cache.tipo;
                      if (racaRef.current) racaRef.current.value = cache.raca;
                      if (idadeRef.current) idadeRef.current.value = cache.idade;
                      if (descRef.current) descRef.current.value = cache.desc;
                    });
                    return;
                  }

                  const reader = new FileReader();
                  reader.onload = (ev) => {
                    const base64 = ev.target?.result || '';
                    imgDataRef.current = base64;
                    setImgPreview(String(base64));
                    requestAnimationFrame(() => {
                      if (nomeRef.current) nomeRef.current.value = cache.nome;
                      if (tipoRef.current) tipoRef.current.value = cache.tipo;
                      if (racaRef.current) racaRef.current.value = cache.raca;
                      if (idadeRef.current) idadeRef.current.value = cache.idade;
                      if (descRef.current) descRef.current.value = cache.desc;
                    });
                  };
                  reader.readAsDataURL(file);
                }}
              />
            </label>

            {imgPreview && (
              <button
                type="button"
                onClick={() => {
                  imgDataRef.current = '';
                  setImgPreview('');
                  if (fileInputRef.current) fileInputRef.current.value = '';
                }}
                style={{
                  border: '1px solid #ddd',
                  borderRadius: 8,
                  padding: '8px 10px',
                  background: '#fff',
                  cursor: 'pointer'
                }}
              >
                Remover imagem
              </button>
            )}
          </div>

          {/* campos */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            <input
              ref={nomeRef}
              placeholder="Nome"
              required
              defaultValue={modalMode === 'edit' ? editingAnimal?.nome || '' : ''}
            />
            <input
              ref={tipoRef}
              placeholder="Tipo (ex: cachorro)"
              defaultValue={modalMode === 'edit' ? editingAnimal?.tipo || '' : ''}
            />
            <input
              ref={racaRef}
              placeholder="Raça"
              defaultValue={modalMode === 'edit' ? editingAnimal?.raca || '' : ''}
            />
            <input
              ref={idadeRef}
              placeholder="Idade"
              defaultValue={modalMode === 'edit' ? editingAnimal?.idade || '' : ''}
            />
          </div>

          <textarea
            ref={descRef}
            placeholder="Descrição"
            rows={4}
            required
            defaultValue={modalMode === 'edit' ? editingAnimal?.descricao || '' : ''}
          />

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginTop: 6 }}>
            <button
              type="button"
              onClick={() => {
                setShowModal(false);
                setEditingId(null);
                imgDataRef.current = '';
                setImgPreview('');
                if (fileInputRef.current) fileInputRef.current.value = '';
              }}
              style={{
                padding: '8px 12px',
                borderRadius: 8,
                border: '1px solid #ddd',
                background: '#fff'
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
              {modalMode === 'edit' ? 'Salvar' : 'Adicionar'}
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
}

export default Home;
