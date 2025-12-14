import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Page.css";
import "./Foruns.css";

const Foruns = () => {
  const navigate = useNavigate();
  const [filtroAtivo, setFiltroAtivo] = useState("genero"); // 'genero', 'autor', 'livro'

  const foruns = [
    {
      id: 1,
      nome: "Fórum de Literatura Brasileira",
      descricao: "Discussões sobre autores e obras da literatura brasileira",
      genero: "Literatura Brasileira",
      autor: "Machado de Assis",
      livro: "Dom Casmurro",
      tipoForum: "Geral",
      participantes: 45,
    },
    {
      id: 2,
      nome: "Fórum de Ficção Científica",
      descricao: "Debates sobre obras de ficção científica",
      genero: "Ficção Científica",
      autor: "Frank Herbert",
      livro: "Duna",
      tipoForum: "Geral",
      participantes: 78,
    },
    {
      id: 3,
      nome: "Fórum de Poesia",
      descricao: "Compartilhamento e análise de poemas",
      genero: "Poesia",
      autor: "Diversos",
      livro: "Várias",
      tipoForum: "Especializado",
      participantes: 32,
    },
    {
      id: 4,
      nome: "Fórum: Memórias Póstumas",
      descricao: "Análise profunda de Memórias Póstumas de Brás Cubas",
      genero: "Literatura Brasileira",
      autor: "Machado de Assis",
      livro: "Memórias Póstumas de Brás Cubas",
      tipoForum: "Geral",
      participantes: 28,
    },
    {
      id: 5,
      nome: "Fórum: A Hora da Estrela",
      descricao: "Discussões sobre a obra de Clarice Lispector",
      genero: "Literatura Brasileira",
      autor: "Clarice Lispector",
      livro: "A Hora da Estrela",
      tipoForum: "Especializado",
      participantes: 41,
    },
    {
      id: 6,
      nome: "Fórum: Capitães da Areia",
      descricao: "Debates sobre a obra de Jorge Amado",
      genero: "Literatura Brasileira",
      autor: "Jorge Amado",
      livro: "Capitães da Areia",
      tipoForum: "Geral",
      participantes: 35,
    },
    {
      id: 7,
      nome: "Fórum: O Pequeno Príncipe",
      descricao: "Reflexões sobre a fábula de Saint-Exupéry",
      genero: "Literatura Infantil",
      autor: "Antoine de Saint-Exupéry",
      livro: "O Pequeno Príncipe",
      tipoForum: "Geral",
      participantes: 92,
    },
  ];

  // Agrupar fóruns por gênero
  const forunsPorGenero = {};
  foruns.forEach((forum) => {
    if (!forunsPorGenero[forum.genero]) {
      forunsPorGenero[forum.genero] = [];
    }
    forunsPorGenero[forum.genero].push(forum);
  });

  // Agrupar fóruns por autor
  const forunsPorAutor = {};
  foruns.forEach((forum) => {
    if (!forunsPorAutor[forum.autor]) {
      forunsPorAutor[forum.autor] = [];
    }
    forunsPorAutor[forum.autor].push(forum);
  });

  // Agrupar fóruns por livro
  const forunsPorLivro = {};
  foruns.forEach((forum) => {
    if (!forunsPorLivro[forum.livro]) {
      forunsPorLivro[forum.livro] = [];
    }
    forunsPorLivro[forum.livro].push(forum);
  });

  const renderForumCard = (forum) => (
    <div key={forum.id} className="card forum-card">
      <div className="card-header">
        <h3>{forum.nome}</h3>
        <span className="badge badge-primary">{forum.tipoForum}</span>
      </div>
      <div className="card-body">
        <p className="card-text">{forum.descricao}</p>
        <div className="card-info">
          <div className="info-item">
            <span className="info-label">📚 Gênero:</span>
            <span>{forum.genero}</span>
          </div>
          <div className="info-item">
            <span className="info-label">✍️ Autor:</span>
            <span>{forum.autor}</span>
          </div>
          <div className="info-item">
            <span className="info-label">📖 Livro:</span>
            <span>{forum.livro}</span>
          </div>
          <div className="info-item">
            <span className="info-label">👥 Participantes:</span>
            <span>{forum.participantes}</span>
          </div>
        </div>
      </div>
      <div className="card-footer">
        <button
          onClick={() => navigate(`/foruns/${forum.id}`)}
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
        <h1>💬 Fóruns</h1>
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
            <div key={genero} className="categoria-section">
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
            <div key={autor} className="categoria-section">
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
            <div key={livro} className="categoria-section">
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

export default Foruns;
