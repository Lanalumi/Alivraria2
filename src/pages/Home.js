import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();
  const { user, updateUser } = useAuth();
  const [addingFavorites, setAddingFavorites] = useState({});

  const livros = [
    {
      id: 1,
      nome: 'Dom Casmurro',
      sinopse: 'Romance de Machado de Assis sobre ciúme e traição',
      dataLancamento: '1899-12-20',
      genero: 'Literatura Brasileira',
      autor: 'Machado de Assis',
      favoritos: 234
    },
    {
      id: 2,
      nome: 'Duna',
      sinopse: 'Épico de ficção científica sobre o planeta Arrakis',
      dataLancamento: '1965-08-01',
      genero: 'Ficção Científica',
      autor: 'Frank Herbert',
      favoritos: 567
    },
    {
      id: 3,
      nome: 'O Pequeno Príncipe',
      sinopse: 'Fábula poética sobre amizade e humanidade',
      dataLancamento: '1943-04-06',
      genero: 'Literatura Infantil',
      autor: 'Antoine de Saint-Exupéry',
      favoritos: 892
    },
    {
      id: 4,
      nome: 'Memórias Póstumas de Brás Cubas',
      sinopse: 'Narrativa irônica e satírica sobre a vida de Brás Cubas',
      dataLancamento: '1881-03-15',
      genero: 'Literatura Brasileira',
      autor: 'Machado de Assis',
      favoritos: 456
    },
    {
      id: 5,
      nome: 'A Hora da Estrela',
      sinopse: 'Romance sobre Macabéa, uma jovem nordestina no Rio de Janeiro',
      dataLancamento: '1977-10-26',
      genero: 'Literatura Brasileira',
      autor: 'Clarice Lispector',
      favoritos: 678
    },
  ];

  const autores = [
    {
      id: 1,
      nome: 'Machado de Assis',
      sobre: 'Escritor brasileiro, considerado o maior nome da literatura nacional',
      genero: 'Masculino',
      livros: 9,
      forunsExclusivos: 2
    },
    {
      id: 2,
      nome: 'Clarice Lispector',
      sobre: 'Escritora brasileira de origem ucraniana, conhecida por sua prosa introspectiva',
      genero: 'Feminino',
      livros: 12,
      forunsExclusivos: 1
    },
    {
      id: 3,
      nome: 'Jorge Amado',
      sobre: 'Escritor brasileiro, um dos mais traduzidos autores do país',
      genero: 'Masculino',
      livros: 15,
      forunsExclusivos: 0
    },
  ];

  const foruns = [
    {
      id: 1,
      nome: 'Fórum de Literatura Brasileira',
      descricao: 'Discussões sobre autores e obras da literatura brasileira',
      genero: 'Literatura Nacional',
      obra: 'Dom Casmurro',
      tipoForum: 'Geral',
      participantes: 45
    },
    {
      id: 2,
      nome: 'Fórum de Ficção Científica',
      descricao: 'Debates sobre obras de ficção científica',
      genero: 'Ficção Científica',
      obra: 'Duna',
      tipoForum: 'Geral',
      participantes: 78
    },
    {
      id: 3,
      nome: 'Fórum de Poesia',
      descricao: 'Compartilhamento e análise de poemas',
      genero: 'Poesia',
      obra: 'Várias',
      tipoForum: 'Especializado',
      participantes: 32
    },
  ];

  const forunsExclusivos = [
    {
      id: 1,
      titulo: 'Fórum Exclusivo: Machado de Assis',
      descricao: 'Análise profunda das obras de Machado de Assis',
      genero: 'Literatura Clássica',
      autor: 'Machado de Assis',
      assinatura: 'Premium',
      participantes: 12
    },
    {
      id: 2,
      titulo: 'Fórum Exclusivo: Autores Contemporâneos',
      descricao: 'Discussões sobre autores contemporâneos brasileiros',
      genero: 'Literatura Contemporânea',
      autor: 'Diversos',
      assinatura: 'VIP',
      participantes: 8
    },
    {
      id: 3,
      titulo: 'Fórum Exclusivo: Literatura Fantástica',
      descricao: 'Exploração de mundos fantásticos e narrativas mágicas',
      genero: 'Fantasia',
      autor: 'Diversos',
      assinatura: 'Premium',
      participantes: 15
    },
  ];

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
      alert('Livro removido dos favoritos!');
    } else {
      // Adicionar aos favoritos
      setAddingFavorites(prev => ({ ...prev, [livro.id]: true }));
      
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
      
      setTimeout(() => {
        setAddingFavorites(prev => ({ ...prev, [livro.id]: false }));
        alert('Livro adicionado aos favoritos!');
      }, 500);
    }
  };

  return (
    <div className="home">
      <div className="hero">
        <h1>Bem-vindo ao Alivraria</h1>
        <p>Sistema de gerenciamento de fóruns, livros e eventos</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">👥</div>
          <div className="stat-value">1,234</div>
          <div className="stat-label">Usuários</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">💬</div>
          <div className="stat-value">56</div>
          <div className="stat-label">Fóruns</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">📖</div>
          <div className="stat-value">892</div>
          <div className="stat-label">Livros</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">🎉</div>
          <div className="stat-value">23</div>
          <div className="stat-label">Eventos</div>
        </div>
      </div>

      <div className="home-content-grid">
        {/* Coluna Esquerda - Livros */}
        <div className="home-left-column">
          <div className="section-header">
            <h2>📖 Livros Disponíveis</h2>
            <button 
              onClick={() => navigate('/livros')} 
              className="btn-view-all"
            >
              Ver Todos →
            </button>
          </div>
          <div className="livros-list">
            {livros.map((livro) => (
              <div key={livro.id} className="livro-item-home">
                <div className="livro-item-content">
                  <div className="livro-item-icon">📖</div>
                  <div className="livro-item-info">
                    <h3>{livro.nome}</h3>
                    <p className="livro-item-author">por {livro.autor}</p>
                    <p className="livro-item-sinopse">{livro.sinopse}</p>
                    <div className="livro-item-meta">
                      <span className="livro-item-genre">{livro.genero}</span>
                      <span className="livro-item-favorites">❤️ {livro.favoritos}</span>
                    </div>
                  </div>
                </div>
                <div className="livro-item-actions">
                  <button
                    onClick={() => handleAddToFavorites(livro)}
                    className={`btn-icon-favorite ${isFavorito(livro.id) ? 'favorited' : ''}`}
                    disabled={addingFavorites[livro.id]}
                    title={isFavorito(livro.id) ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
                  >
                    {addingFavorites[livro.id] ? (
                      <span className="btn-icon-spinner">⏳</span>
                    ) : isFavorito(livro.id) ? (
                      <span>❤️</span>
                    ) : (
                      <span>🤍</span>
                    )}
                  </button>
                  <button
                    onClick={() => navigate(`/livros/${livro.id}`)}
                    className="btn-icon-details"
                    title="Ver detalhes do livro"
                  >
                    👁️
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Coluna Direita - Autores e Fóruns */}
        <div className="home-right-column">
          {/* Lista de Autores */}
          <div className="section-card">
            <div className="section-header">
              <h2>✍️ Autores</h2>
            </div>
            <div className="autores-list">
              {autores.map((autor) => (
                <div 
                  key={autor.id} 
                  className="autor-item-home"
                  onClick={() => navigate(`/autores/${autor.id}`)}
                >
                  <div className="autor-item-icon">👤</div>
                  <div className="autor-item-info">
                    <h3>{autor.nome}</h3>
                    <p className="autor-item-about">{autor.sobre}</p>
                    <div className="autor-item-meta">
                      <span>📖 {autor.livros} livros</span>
                      {autor.forunsExclusivos > 0 && (
                        <span>⭐ {autor.forunsExclusivos} fóruns</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Lista de Fóruns */}
          <div className="section-card">
            <div className="section-header">
              <h2>💬 Fóruns Disponíveis</h2>
              <button 
                onClick={() => navigate('/foruns')} 
                className="btn-view-all"
              >
                Ver Todos →
              </button>
            </div>
            <div className="foruns-list">
              {foruns.map((forum) => (
                <div 
                  key={forum.id} 
                  className="forum-item-home"
                  onClick={() => navigate(`/foruns/${forum.id}`)}
                >
                  <div className="forum-item-icon">💬</div>
                  <div className="forum-item-info">
                    <h3>{forum.nome}</h3>
                    <p className="forum-item-desc">{forum.descricao}</p>
                    <div className="forum-item-meta">
                      <span className="forum-item-badge">{forum.tipoForum}</span>
                      <span>👥 {forum.participantes} participantes</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Lista de Fóruns Exclusivos */}
          <div className="section-card section-card-exclusive">
            <div className="section-header">
              <h2>⭐ Fóruns Exclusivos</h2>
              <button 
                onClick={() => navigate('/forum-exclusivo')} 
                className="btn-view-all"
              >
                Ver Todos →
              </button>
            </div>
            <div className="foruns-exclusivos-list">
              {forunsExclusivos.map((forum) => (
                <div 
                  key={forum.id} 
                  className="forum-exclusivo-item-home"
                  onClick={() => navigate(`/forum-exclusivo/${forum.id}`)}
                >
                  <div className="forum-exclusivo-item-icon">⭐</div>
                  <div className="forum-exclusivo-item-info">
                    <h3>{forum.titulo}</h3>
                    <p className="forum-exclusivo-item-desc">{forum.descricao}</p>
                    <div className="forum-exclusivo-item-meta">
                      <span className="forum-exclusivo-badge">{forum.assinatura}</span>
                      <span>👥 {forum.participantes} participantes</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
