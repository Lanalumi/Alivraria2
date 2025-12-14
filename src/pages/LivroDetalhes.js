import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './LivroDetalhes.css';

const LivroDetalhes = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, updateUser } = useAuth();
  const [isAdding, setIsAdding] = useState(false);

  // Base de dados de livros (em produção, isso viria de uma API)
  const livrosDatabase = [
    {
      id: 1,
      nome: 'Dom Casmurro',
      sinopse: 'Dom Casmurro é um romance escrito por Machado de Assis, publicado em 1899. A obra narra a história de Bentinho (Dom Casmurro), que suspeita que sua esposa Capitu o traiu com seu melhor amigo Escobar, e que o filho Ezequiel não é seu. O romance é considerado uma das maiores obras da literatura brasileira e explora temas como ciúme, traição, memória e a subjetividade da narrativa.',
      sinopseCompleta: 'Dom Casmurro é um romance escrito por Machado de Assis, publicado em 1899. A obra narra a história de Bentinho (Dom Casmurro), que suspeita que sua esposa Capitu o traiu com seu melhor amigo Escobar, e que o filho Ezequiel não é seu. O romance é considerado uma das maiores obras da literatura brasileira e explora temas como ciúme, traição, memória e a subjetividade da narrativa. A narrativa é feita em primeira pessoa, com Bentinho já idoso relembrando sua juventude e o relacionamento com Capitu. A ambiguidade da narrativa - nunca se sabe ao certo se Capitu realmente traiu Bentinho - é uma das características mais marcantes da obra.',
      dataLancamento: '1899-12-20',
      genero: 'Literatura Brasileira',
      autor: 'Machado de Assis',
      autorId: 1,
      favoritos: 234,
      paginas: 256,
      editora: 'Editora Globo',
      isbn: '978-85-250-0123-4',
      avaliacao: 4.8,
      totalAvaliacoes: 1234,
      idioma: 'Português',
      formato: 'Físico e Digital'
    },
    {
      id: 2,
      nome: 'Duna',
      sinopse: 'Duna é um épico de ficção científica escrito por Frank Herbert, publicado originalmente em 1965. A história se passa no planeta desértico Arrakis, a única fonte da especiaria melange, a substância mais valiosa do universo. O romance segue Paul Atreides, cuja família assume o controle de Arrakis, e sua jornada para se tornar o líder messiânico dos Fremen.',
      sinopseCompleta: 'Duna é um épico de ficção científica escrito por Frank Herbert, publicado originalmente em 1965. A história se passa no planeta desértico Arrakis, a única fonte da especiaria melange, a substância mais valiosa do universo. O romance segue Paul Atreides, cuja família assume o controle de Arrakis, e sua jornada para se tornar o líder messiânico dos Fremen. A obra explora temas complexos como política, religião, ecologia, poder e a natureza humana. Duna é considerado um dos maiores romances de ficção científica já escritos e ganhou os prêmios Hugo e Nebula.',
      dataLancamento: '1965-08-01',
      genero: 'Ficção Científica',
      autor: 'Frank Herbert',
      autorId: 2,
      favoritos: 567,
      paginas: 688,
      editora: 'Editora Aleph',
      isbn: '978-85-7657-123-4',
      avaliacao: 4.9,
      totalAvaliacoes: 2345,
      idioma: 'Português',
      formato: 'Físico e Digital'
    },
    {
      id: 3,
      nome: 'O Pequeno Príncipe',
      sinopse: 'O Pequeno Príncipe é uma fábula poética escrita por Antoine de Saint-Exupéry, publicada em 1943. A história narra o encontro entre um aviador perdido no deserto do Saara e um pequeno príncipe que veio de um asteroide distante. Através de suas conversas, o livro explora temas profundos sobre amizade, amor, perda e a essência da vida.',
      sinopseCompleta: 'O Pequeno Príncipe é uma fábula poética escrita por Antoine de Saint-Exupéry, publicada em 1943. A história narra o encontro entre um aviador perdido no deserto do Saara e um pequeno príncipe que veio de um asteroide distante. Através de suas conversas, o livro explora temas profundos sobre amizade, amor, perda e a essência da vida. Com ilustrações do próprio autor, a obra é considerada um clássico da literatura mundial e já foi traduzida para mais de 300 idiomas. A frase "O essencial é invisível aos olhos" tornou-se uma das mais famosas da literatura.',
      dataLancamento: '1943-04-06',
      genero: 'Literatura Infantil',
      autor: 'Antoine de Saint-Exupéry',
      autorId: 3,
      favoritos: 892,
      paginas: 96,
      editora: 'Editora Agir',
      isbn: '978-85-220-1234-5',
      avaliacao: 5.0,
      totalAvaliacoes: 4567,
      idioma: 'Português',
      formato: 'Físico e Digital'
    },
  ];

  const livro = livrosDatabase.find(l => l.id === parseInt(id));

  if (!livro) {
    return (
      <div className="livro-detalhes-page">
        <div className="error-state">
          <h2>Livro não encontrado</h2>
          <p>O livro que você está procurando não existe.</p>
          <button onClick={() => navigate('/livros')} className="btn-primary">
            Voltar para Livros
          </button>
        </div>
      </div>
    );
  }

  const isFavorito = user?.favoritos?.some(f => f.id === livro.id) || false;

  const handleAddToFavorites = () => {
    if (!user) {
      alert('Você precisa estar logado para adicionar favoritos!');
      navigate('/cadastro');
      return;
    }

    if (isFavorito) {
      // Remover dos favoritos
      const updatedFavoritos = user.favoritos.filter(f => f.id !== livro.id);
      updateUser({
        favoritos: updatedFavoritos,
        livrosFavoritos: updatedFavoritos.length
      });
      alert('Livro removido dos favoritos!');
    } else {
      // Adicionar aos favoritos
      setIsAdding(true);
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
        setIsAdding(false);
        alert('Livro adicionado aos favoritos!');
      }, 500);
    }
  };

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
      <div className="stars">
        {[...Array(fullStars)].map((_, i) => (
          <span key={i} className="star full">⭐</span>
        ))}
        {hasHalfStar && <span className="star half">⭐</span>}
        {[...Array(emptyStars)].map((_, i) => (
          <span key={i} className="star empty">☆</span>
        ))}
        <span className="rating-number">{rating.toFixed(1)}</span>
      </div>
    );
  };

  return (
    <div className="livro-detalhes-page">
      <button 
        onClick={() => navigate(-1)} 
        className="btn-back"
        title="Voltar"
      >
        ← Voltar
      </button>

      <div className="livro-detalhes-container">
        {/* Header do Livro */}
        <div className="livro-header">
          <div className="livro-cover">
            <div className="cover-placeholder">
              <span className="cover-icon">📖</span>
            </div>
          </div>
          
          <div className="livro-header-info">
            <h1>{livro.nome}</h1>
            <p className="livro-author">por {livro.autor}</p>
            
            <div className="livro-rating">
              {renderStars(livro.avaliacao)}
              <span className="rating-count">({livro.totalAvaliacoes} avaliações)</span>
            </div>

            <div className="livro-badges">
              <span className="badge badge-genre">{livro.genero}</span>
              <span className="badge badge-favorites">❤️ {livro.favoritos} favoritos</span>
            </div>

            <div className="livro-actions">
              <button
                onClick={handleAddToFavorites}
                className={`btn-favorite ${isFavorito ? 'favorited' : ''}`}
                disabled={isAdding}
              >
                {isAdding ? 'Adicionando...' : isFavorito ? '❤️ Remover dos Favoritos' : '🤍 Adicionar aos Favoritos'}
              </button>
              <button className="btn-read">
                📚 Encontre em
              </button>
            </div>
          </div>
        </div>

        {/* Informações Detalhadas */}
        <div className="livro-details-section">
          <h2>📚 Sobre o Livro</h2>
          <div className="details-grid">
            <div className="detail-box">
              <span className="detail-icon">📅</span>
              <div className="detail-content">
                <span className="detail-label">Data de Lançamento</span>
                <span className="detail-value">
                  {new Date(livro.dataLancamento).toLocaleDateString('pt-BR', {
                    day: '2-digit',
                    month: 'long',
                    year: 'numeric'
                  })}
                </span>
              </div>
            </div>
            <div className="detail-box">
              <span className="detail-icon">📄</span>
              <div className="detail-content">
                <span className="detail-label">Páginas</span>
                <span className="detail-value">{livro.paginas}</span>
              </div>
            </div>
            <div className="detail-box">
              <span className="detail-icon">🏢</span>
              <div className="detail-content">
                <span className="detail-label">Editora</span>
                <span className="detail-value">{livro.editora}</span>
              </div>
            </div>
            <div className="detail-box">
              <span className="detail-icon">🔢</span>
              <div className="detail-content">
                <span className="detail-label">ISBN</span>
                <span className="detail-value">{livro.isbn}</span>
              </div>
            </div>
            <div className="detail-box">
              <span className="detail-icon">🌐</span>
              <div className="detail-content">
                <span className="detail-label">Idioma</span>
                <span className="detail-value">{livro.idioma}</span>
              </div>
            </div>
            <div className="detail-box">
              <span className="detail-icon">📱</span>
              <div className="detail-content">
                <span className="detail-label">Formato</span>
                <span className="detail-value">{livro.formato}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Sinopse */}
        <div className="livro-sinopse-section">
          <h2>📖 Sinopse</h2>
          <p className="sinopse-text">{livro.sinopseCompleta || livro.sinopse}</p>
        </div>

        {/* Informações do Autor */}
        <div className="livro-author-section">
          <h2>✍️ Sobre o Autor</h2>
          <div className="author-info">
            <div className="author-avatar">
              <span className="author-icon">👤</span>
            </div>
            <div className="author-details">
              <h3>{livro.autor}</h3>
              {livro.autorId && (
                <button 
                  onClick={() => navigate(`/autores/${livro.autorId}`)} 
                  className="btn-view-author"
                >
                  Ver Perfil do Autor →
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LivroDetalhes;


