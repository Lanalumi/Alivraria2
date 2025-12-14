import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Favoritos.css';

const Favoritos = () => {
  const { user, updateUser } = useAuth();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  if (!user) {
    return (
      <div className="page">
        <div className="no-user">
          <h2>Nenhum usuário logado</h2>
          <p>Faça login para ver seus livros favoritos.</p>
        </div>
      </div>
    );
  }

  const favoritos = user.favoritos || [];
  const totalFavoritos = favoritos.length;

  // Filtrar favoritos pela busca
  const filteredFavoritos = favoritos.filter(livro =>
    livro.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    livro.autor.toLowerCase().includes(searchTerm.toLowerCase()) ||
    livro.genero.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleRemoveFavorite = (livroId) => {
    if (window.confirm('Tem certeza que deseja remover este livro dos favoritos?')) {
      const updatedFavoritos = favoritos.filter(livro => livro.id !== livroId);
      updateUser({
        favoritos: updatedFavoritos,
        livrosFavoritos: updatedFavoritos.length
      });
    }
  };

  const handleLerAgora = (livro) => {
    // URL base da biblioteca municipal de Sorocaba
    // Em produção, substituir pela URL real da biblioteca
    const bibliotecaBaseUrl = 'https://biblioteca.sorocaba.sp.gov.br';
    
    // Criar URL de busca baseada no nome do livro
    // Formato: bibliotecaBaseUrl/busca?q=nome+do+livro
    const nomeLivroEncoded = encodeURIComponent(livro.nome);
    const urlBusca = `${bibliotecaBaseUrl}/busca?q=${nomeLivroEncoded}`;
    
    // Abrir link em nova aba
    window.open(urlBusca, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="favoritos-page">
      <div className="favoritos-header">
        <div className="header-content">
          <div className="header-title-section">
            <button 
              onClick={() => navigate('/perfil')} 
              className="btn-back-to-profile"
              title="Voltar ao perfil"
            >
              ← Perfil
            </button>
            <h1>❤️ Meus Favoritos</h1>
            <p className="header-subtitle">
              {totalFavoritos === 0 
                ? 'Você ainda não tem livros favoritos' 
                : `${totalFavoritos} ${totalFavoritos === 1 ? 'livro favorito' : 'livros favoritos'}`
              }
            </p>
          </div>
        </div>
        {totalFavoritos > 0 && (
          <div className="search-container">
            <input
              type="text"
              placeholder="🔍 Buscar por título, autor ou gênero..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
        )}
      </div>

      {totalFavoritos === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">📚</div>
          <h2>Nenhum livro favorito ainda</h2>
          <p>Comece a adicionar livros aos seus favoritos para encontrá-los facilmente!</p>
          <button 
            onClick={() => navigate('/livros')} 
            className="btn-primary"
          >
            Explorar Livros
          </button>
        </div>
      ) : filteredFavoritos.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">🔍</div>
          <h2>Nenhum resultado encontrado</h2>
          <p>Tente buscar com outros termos.</p>
          <button 
            onClick={() => setSearchTerm('')} 
            className="btn-secondary"
          >
            Limpar Busca
          </button>
        </div>
      ) : (
        <div className="favoritos-grid">
          {filteredFavoritos.map((livro) => (
            <div key={livro.id} className="favorito-card">
              <div className="favorito-header">
                <div className="favorito-icon">📖</div>
                <button
                  onClick={() => handleRemoveFavorite(livro.id)}
                  className="btn-remove-favorite"
                  title="Remover dos favoritos"
                >
                  ❌
                </button>
              </div>
              <div className="favorito-body">
                <h3 className="favorito-title">{livro.nome}</h3>
                <p className="favorito-author">por {livro.autor}</p>
                <p className="favorito-sinopse">{livro.sinopse}</p>
                <div className="favorito-details">
                  <div className="detail-tag">
                    <span className="tag-icon">📚</span>
                    <span>{livro.genero}</span>
                  </div>
                  <div className="detail-tag">
                    <span className="tag-icon">📅</span>
                    <span>Lançado em {new Date(livro.dataLancamento).getFullYear()}</span>
                  </div>
                </div>
                <div className="favorito-date">
                  <span className="date-label">Adicionado em:</span>
                  <span className="date-value">
                    {new Date(livro.dataAdicionado).toLocaleDateString('pt-BR', {
                      day: '2-digit',
                      month: 'long',
                      year: 'numeric'
                    })}
                  </span>
                </div>
              </div>
              <div className="favorito-footer">
                <button 
                  onClick={() => navigate(`/livros/${livro.id}`)}
                  className="btn-favorite-action"
                >
                  Ver Detalhes
                </button>
                <button 
                  onClick={() => handleLerAgora(livro)}
                  className="btn-favorite-action btn-ler-agora"
                  title={`Encontrar "${livro.nome}" na Biblioteca Municipal de Sorocaba`}
                >
                  📚 Ler Agora
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favoritos;
