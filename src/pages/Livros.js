import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Page.css";
import "./Livros.css";

const Livros = () => {
  const navigate = useNavigate();
  const { user, updateUser } = useAuth();
  const [filtroAtivo, setFiltroAtivo] = useState("genero"); // 'genero', 'autor', 'livro'

  const livros = [
    {
      id: 1,
      nome: "Dom Casmurro",
      sinopse: "Romance de Machado de Assis sobre ciúme e traição",
      dataLancamento: "1899-12-20",
      genero: "Literatura Brasileira",
      autor: "Machado de Assis",
      favoritos: 234,
    },
    {
      id: 2,
      nome: "Duna",
      sinopse: "Épico de ficção científica sobre o planeta Arrakis",
      dataLancamento: "1965-08-01",
      genero: "Ficção Científica",
      autor: "Frank Herbert",
      favoritos: 567,
    },
    {
      id: 3,
      nome: "O Pequeno Príncipe",
      sinopse: "Fábula poética sobre amizade e humanidade",
      dataLancamento: "1943-04-06",
      genero: "Literatura Infantil",
      autor: "Antoine de Saint-Exupéry",
      favoritos: 892,
    },
    {
      id: 4,
      nome: "Memórias Póstumas de Brás Cubas",
      sinopse: "Narrativa irônica e satírica sobre a vida de Brás Cubas",
      dataLancamento: "1881-03-15",
      genero: "Literatura Brasileira",
      autor: "Machado de Assis",
      favoritos: 189,
    },
    {
      id: 5,
      nome: "A Hora da Estrela",
      sinopse: "Romance sobre Macabéa, uma jovem nordestina no Rio de Janeiro",
      dataLancamento: "1977-10-26",
      genero: "Literatura Brasileira",
      autor: "Clarice Lispector",
      favoritos: 312,
    },
    {
      id: 6,
      nome: "Capitães da Areia",
      sinopse: "História de um grupo de meninos de rua em Salvador",
      dataLancamento: "1937-11-01",
      genero: "Literatura Brasileira",
      autor: "Jorge Amado",
      favoritos: 278,
    },
    {
      id: 7,
      nome: "O Cortiço",
      sinopse: "Romance naturalista sobre a vida em um cortiço carioca",
      dataLancamento: "1890-08-15",
      genero: "Literatura Brasileira",
      autor: "Aluísio Azevedo",
      favoritos: 145,
    },
  ];

  // Livros recomendados (para a lista horizontal)
  const livrosRecomendados = [
    livros[0],
    livros[1],
    livros[2],
    livros[3],
    livros[4],
  ];

  // Agrupar livros por gênero
  const livrosPorGenero = {};
  livros.forEach((livro) => {
    if (!livrosPorGenero[livro.genero]) {
      livrosPorGenero[livro.genero] = [];
    }
    livrosPorGenero[livro.genero].push(livro);
  });

  // Agrupar livros por autor
  const livrosPorAutor = {};
  livros.forEach((livro) => {
    if (!livrosPorAutor[livro.autor]) {
      livrosPorAutor[livro.autor] = [];
    }
    livrosPorAutor[livro.autor].push(livro);
  });

  // Agrupar livros por nome (para o filtro "por livro")
  const livrosPorNome = {};
  livros.forEach((livro) => {
    if (!livrosPorNome[livro.nome]) {
      livrosPorNome[livro.nome] = [];
    }
    livrosPorNome[livro.nome].push(livro);
  });

  const isFavorito = (livroId) => {
    return user?.favoritos?.some(f => f.id === livroId) || false;
  };

  const handleAddToFavorites = (livro) => {
    if (!user) {
      alert('Você precisa estar logado para adicionar favoritos!');
      navigate('/cadastro');
      return;
    }

    if (isFavorito(livro.id)) {
      // Remover dos favoritos
      const updatedFavoritos = user.favoritos.filter(f => f.id !== livro.id);
      updateUser({
        favoritos: updatedFavoritos,
        livrosFavoritos: updatedFavoritos.length
      });
    } else {
      // Adicionar aos favoritos
      const novoFavorito = {
        id: livro.id,
        nome: livro.nome,
        autor: livro.autor,
        sinopse: livro.sinopse,
        genero: livro.genero,
        dataLancamento: livro.dataLancamento,
        dataAdicionado: new Date().toISOString().split('T')[0]
      };
      
      const updatedFavoritos = [...(user.favoritos || []), novoFavorito];
      updateUser({
        favoritos: updatedFavoritos,
        livrosFavoritos: updatedFavoritos.length
      });
    }
  };

  const handleEncontreEm = (livro) => {
    // Futuramente: link para biblioteca municipal de Sorocaba
    alert(`Em breve: link para encontrar "${livro.nome}" na Biblioteca Municipal de Sorocaba`);
  };

  const renderLivroCard = (livro) => (
    <div key={livro.id} className="card livro-card">
      <div className="card-header">
        <h3>{livro.nome}</h3>
        <span className="badge badge-info">ID: {livro.id}</span>
      </div>
      <div className="card-body">
        <p className="card-text">{livro.sinopse}</p>
        <div className="card-info">
          <div className="info-item">
            <span className="info-label">✍️ Autor:</span>
            <span>{livro.autor}</span>
          </div>
          <div className="info-item">
            <span className="info-label">📚 Gênero:</span>
            <span>{livro.genero}</span>
          </div>
          <div className="info-item">
            <span className="info-label">📅 Lançamento:</span>
            <span>{livro.dataLancamento}</span>
          </div>
          <div className="info-item">
            <span className="info-label">❤️ Favoritos:</span>
            <span>{livro.favoritos}</span>
          </div>
        </div>
      </div>
      <div className="card-footer">
        <button
          onClick={() => navigate(`/livros/${livro.id}`)}
          className="btn-secondary"
        >
          Ver Detalhes
        </button>
        <button
          onClick={() => handleAddToFavorites(livro)}
          className={`btn-secondary ${isFavorito(livro.id) ? 'favorito-ativo' : ''}`}
        >
          {isFavorito(livro.id) ? '❤️ Favorito' : '🤍 Adicionar aos Favoritos'}
        </button>
      </div>
    </div>
  );

  return (
    <div className="page">
      <div className="page-header">
        <h1>📖 Livros</h1>
      </div>

      {/* Lista Horizontal de Recomendações */}
      <div className="recomendacoes-section">
        <h2 className="recomendacoes-titulo">⭐ Recomendações para Você</h2>
        <div className="recomendacoes-horizontal">
          {livrosRecomendados.map((livro) => (
            <div key={livro.id} className="recomendacao-card">
              <div className="recomendacao-header">
                <h3 className="recomendacao-titulo">{livro.nome}</h3>
                <button
                  className={`recomendacao-favorito ${isFavorito(livro.id) ? 'ativo' : ''}`}
                  onClick={() => handleAddToFavorites(livro)}
                  title={isFavorito(livro.id) ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
                >
                  {isFavorito(livro.id) ? '❤️' : '🤍'}
                </button>
              </div>
              <p className="recomendacao-autor">por {livro.autor}</p>
              <p className="recomendacao-sinopse">{livro.sinopse}</p>
              <div className="recomendacao-actions">
                <button
                  className="btn-recomendacao btn-detalhes"
                  onClick={() => navigate(`/livros/${livro.id}`)}
                >
                  📖 Detalhes
                </button>
                <button
                  className="btn-recomendacao btn-encontrar"
                  onClick={() => handleEncontreEm(livro)}
                >
                  📚 Encontre em
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Filtros */}
      <div className="livros-filtros">
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
        <div className="livros-por-categoria">
          {Object.entries(livrosPorGenero).map(([genero, livrosLista]) => (
            <div key={genero} className="categoria-section">
              <h2 className="categoria-titulo">📚 {genero}</h2>
              <div className="cards-grid">
                {livrosLista.map((livro) => renderLivroCard(livro))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Lista por Autor */}
      {filtroAtivo === "autor" && (
        <div className="livros-por-categoria">
          {Object.entries(livrosPorAutor).map(([autor, livrosLista]) => (
            <div key={autor} className="categoria-section">
              <h2 className="categoria-titulo">✍️ {autor}</h2>
              <div className="cards-grid">
                {livrosLista.map((livro) => renderLivroCard(livro))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Lista por Livro */}
      {filtroAtivo === "livro" && (
        <div className="livros-por-categoria">
          {Object.entries(livrosPorNome).map(([nome, livrosLista]) => (
            <div key={nome} className="categoria-section">
              <h2 className="categoria-titulo">📖 {nome}</h2>
              <div className="cards-grid">
                {livrosLista.map((livro) => renderLivroCard(livro))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Livros;
