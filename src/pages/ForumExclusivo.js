import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Page.css';
import './ForumExclusivo.css';

const ForumExclusivo = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';
  const [filtroAtivo, setFiltroAtivo] = useState("genero"); // 'genero', 'autor', 'livro'
  
  const forunsExclusivos = [
    {
      id: 1,
      titulo: 'Fórum Exclusivo: Machado de Assis',
      descricao: 'Análise profunda das obras de Machado de Assis',
      genero: 'Literatura Clássica',
      autor: 'Machado de Assis',
      livro: 'Dom Casmurro',
      assinatura: 'Premium',
      tipoForum: 'Exclusivo',
      dataCriacao: '2024-01-10',
      participantes: 12
    },
    {
      id: 2,
      titulo: 'Fórum Exclusivo: Autores Contemporâneos',
      descricao: 'Discussões sobre autores contemporâneos brasileiros',
      genero: 'Literatura Contemporânea',
      autor: 'Diversos',
      livro: 'Várias',
      assinatura: 'VIP',
      tipoForum: 'Exclusivo',
      dataCriacao: '2024-02-15',
      participantes: 8
    },
    {
      id: 3,
      titulo: 'Fórum Exclusivo: Memórias Póstumas',
      descricao: 'Análise exclusiva de Memórias Póstumas de Brás Cubas',
      genero: 'Literatura Clássica',
      autor: 'Machado de Assis',
      livro: 'Memórias Póstumas de Brás Cubas',
      assinatura: 'Premium',
      tipoForum: 'Exclusivo',
      dataCriacao: '2024-03-01',
      participantes: 15
    },
    {
      id: 4,
      titulo: 'Fórum Exclusivo: Clarice Lispector',
      descricao: 'Discussões profundas sobre a obra de Clarice Lispector',
      genero: 'Literatura Contemporânea',
      autor: 'Clarice Lispector',
      livro: 'A Hora da Estrela',
      assinatura: 'VIP',
      tipoForum: 'Exclusivo',
      dataCriacao: '2024-03-20',
      participantes: 10
    },
    {
      id: 5,
      titulo: 'Fórum Exclusivo: Jorge Amado',
      descricao: 'Análise exclusiva das obras de Jorge Amado',
      genero: 'Literatura Brasileira',
      autor: 'Jorge Amado',
      livro: 'Capitães da Areia',
      assinatura: 'Premium',
      tipoForum: 'Exclusivo',
      dataCriacao: '2024-04-05',
      participantes: 18
    },
    {
      id: 6,
      titulo: 'Fórum Exclusivo: Poesia Brasileira',
      descricao: 'Discussões sobre poesia brasileira contemporânea',
      genero: 'Poesia',
      autor: 'Diversos',
      livro: 'Várias',
      assinatura: 'VIP',
      tipoForum: 'Exclusivo',
      dataCriacao: '2024-04-15',
      participantes: 7
    },
  ];

  // Agrupar fóruns por gênero
  const forunsPorGenero = {};
  forunsExclusivos.forEach((forum) => {
    if (!forunsPorGenero[forum.genero]) {
      forunsPorGenero[forum.genero] = [];
    }
    forunsPorGenero[forum.genero].push(forum);
  });

  // Agrupar fóruns por autor
  const forunsPorAutor = {};
  forunsExclusivos.forEach((forum) => {
    if (!forunsPorAutor[forum.autor]) {
      forunsPorAutor[forum.autor] = [];
    }
    forunsPorAutor[forum.autor].push(forum);
  });

  // Agrupar fóruns por livro
  const forunsPorLivro = {};
  forunsExclusivos.forEach((forum) => {
    if (!forunsPorLivro[forum.livro]) {
      forunsPorLivro[forum.livro] = [];
    }
    forunsPorLivro[forum.livro].push(forum);
  });

  const renderForumCard = (forum) => (
    <div key={forum.id} className="card card-exclusive forum-exclusivo-card">
      <div className="card-header">
        <h3>{forum.titulo}</h3>
        <span className="badge badge-exclusive">⭐ Exclusivo</span>
      </div>
      <div className="card-body">
        <p className="card-text">{forum.descricao}</p>
        <div className="card-info">
          <div className="info-item">
            <span className="info-label">✍️ Autor:</span>
            <span>{forum.autor}</span>
          </div>
          <div className="info-item">
            <span className="info-label">📚 Gênero:</span>
            <span>{forum.genero}</span>
          </div>
          <div className="info-item">
            <span className="info-label">📖 Livro:</span>
            <span>{forum.livro}</span>
          </div>
          <div className="info-item">
            <span className="info-label">💳 Assinatura:</span>
            <span className="badge-small">{forum.assinatura}</span>
          </div>
          <div className="info-item">
            <span className="info-label">📅 Criado em:</span>
            <span>{forum.dataCriacao}</span>
          </div>
          <div className="info-item">
            <span className="info-label">👥 Participantes:</span>
            <span>{forum.participantes}</span>
          </div>
        </div>
      </div>
      <div className="card-footer">
        <button 
          onClick={() => navigate(`/forum-exclusivo/${forum.id}`)}
          className="btn-secondary"
        >
          Acessar Fórum
        </button>
      </div>
    </div>
  );

  return (
    <div className="page">
      <div className="page-header">
        <h1>⭐ Fóruns Exclusivos</h1>
        {isAdmin && (
          <button className="btn-primary">+ Novo Fórum Exclusivo</button>
        )}
      </div>

      {/* Filtros */}
      <div className="foruns-filtros">
        <button
          className={`filtro-btn ${filtroAtivo === "genero" ? "ativo" : ""}`}
          onClick={() => setFiltroAtivo("genero")}
        >
          📚 Por Gênero Literário
        </button>
        <button
          className={`filtro-btn ${filtroAtivo === "autor" ? "ativo" : ""}`}
          onClick={() => setFiltroAtivo("autor")}
        >
          ✍️ Por Autor
        </button>
        <button
          className={`filtro-btn ${filtroAtivo === "livro" ? "ativo" : ""}`}
          onClick={() => setFiltroAtivo("livro")}
        >
          📖 Por Livro
        </button>
      </div>

      {/* Lista por Gênero Literário */}
      {filtroAtivo === "genero" && (
        <div className="foruns-por-categoria">
          {Object.entries(forunsPorGenero).map(([genero, forunsLista]) => (
            <div key={genero} className="categoria-section categoria-exclusiva">
              <h2 className="categoria-titulo">📚 {genero}</h2>
              <div className="cards-grid">
                {forunsLista.map((forum) => renderForumCard(forum))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Lista por Autor */}
      {filtroAtivo === "autor" && (
        <div className="foruns-por-categoria">
          {Object.entries(forunsPorAutor).map(([autor, forunsLista]) => (
            <div key={autor} className="categoria-section categoria-exclusiva">
              <h2 className="categoria-titulo">✍️ {autor}</h2>
              <div className="cards-grid">
                {forunsLista.map((forum) => renderForumCard(forum))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Lista por Livro */}
      {filtroAtivo === "livro" && (
        <div className="foruns-por-categoria">
          {Object.entries(forunsPorLivro).map(([livro, forunsLista]) => (
            <div key={livro} className="categoria-section categoria-exclusiva">
              <h2 className="categoria-titulo">📖 {livro}</h2>
              <div className="cards-grid">
                {forunsLista.map((forum) => renderForumCard(forum))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ForumExclusivo;

