import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './ForumDetalhes.css';

const ForumDetalhes = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [newPost, setNewPost] = useState('');
  const [isParticipating, setIsParticipating] = useState(true);

  // Base de dados de fóruns
  const forunsDatabase = [
    {
      id: 1,
      nome: 'Fórum de Literatura Brasileira',
      descricao: 'Discussões sobre autores e obras da literatura brasileira. Este é um espaço para compartilhar análises, interpretações e reflexões sobre os grandes clássicos da nossa literatura.',
      descricaoCompleta: 'Este fórum é dedicado à literatura brasileira em todas as suas formas e épocas. Aqui você pode discutir desde os clássicos de Machado de Assis até os autores contemporâneos. Compartilhe suas leituras, análises críticas e descubra novas obras através das recomendações dos outros participantes.',
      genero: 'Literatura Nacional',
      obra: 'Dom Casmurro',
      tipoForum: 'Geral',
      participantes: 45,
      posts: 128,
      criadoEm: '2023-06-15',
      moderador: 'Ana Silva',
      participantesLista: [
        { id: 1, nome: 'Maria Silva', avatar: null },
        { id: 2, nome: 'João Santos', avatar: null },
        { id: 3, nome: 'Ana Costa', avatar: null },
        { id: 4, nome: 'Pedro Oliveira', avatar: null },
        { id: 5, nome: 'Carla Mendes', avatar: null },
      ]
    },
    {
      id: 2,
      nome: 'Fórum de Ficção Científica',
      descricao: 'Debates sobre obras de ficção científica',
      descricaoCompleta: 'Explore os universos da ficção científica! Discuta sobre mundos distantes, tecnologias futuras, viagens no tempo e todas as possibilidades que a ficção científica nos oferece. De Isaac Asimov a autores contemporâneos.',
      genero: 'Ficção Científica',
      obra: 'Duna',
      tipoForum: 'Geral',
      participantes: 78,
      posts: 234,
      criadoEm: '2023-04-20',
      moderador: 'Carlos Lima',
      participantesLista: [
        { id: 1, nome: 'Maria Silva', avatar: null },
        { id: 2, nome: 'João Santos', avatar: null },
        { id: 3, nome: 'Ana Costa', avatar: null },
      ]
    },
    {
      id: 3,
      nome: 'Fórum de Poesia',
      descricao: 'Compartilhamento e análise de poemas',
      descricaoCompleta: 'Um espaço dedicado à poesia em todas as suas formas. Compartilhe seus poemas favoritos, discuta sobre estilos poéticos, participe de análises e descubra novos poetas através da comunidade.',
      genero: 'Poesia',
      obra: 'Várias',
      tipoForum: 'Especializado',
      participantes: 32,
      posts: 89,
      criadoEm: '2023-08-10',
      moderador: 'Beatriz Alves',
      participantesLista: [
        { id: 1, nome: 'Maria Silva', avatar: null },
        { id: 2, nome: 'João Santos', avatar: null },
      ]
    },
  ];

  const forum = forunsDatabase.find(f => f.id === parseInt(id));

  // Posts simulados
  const [posts] = useState([
    {
      id: 1,
      autor: 'Maria Silva',
      avatar: null,
      data: '2024-01-15',
      hora: '14:30',
      conteudo: 'Adorei a discussão sobre Dom Casmurro! A ambiguidade da narrativa de Machado de Assis é realmente fascinante. Alguém mais tem alguma interpretação sobre o final?',
      curtidas: 12,
      respostas: 5
    },
    {
      id: 2,
      autor: 'João Santos',
      avatar: null,
      data: '2024-01-14',
      hora: '10:15',
      conteudo: 'Recomendo a leitura de "Memórias Póstumas de Brás Cubas" para quem gostou de Dom Casmurro. O humor e a ironia de Machado são únicos!',
      curtidas: 8,
      respostas: 3
    },
    {
      id: 3,
      autor: 'Ana Costa',
      avatar: null,
      data: '2024-01-13',
      hora: '16:45',
      conteudo: 'Alguém já leu "Quincas Borba"? É outra obra-prima do Machado que merece ser discutida aqui.',
      curtidas: 15,
      respostas: 7
    },
  ]);

  if (!forum) {
    return (
      <div className="forum-detalhes-page">
        <div className="error-state">
          <h2>Fórum não encontrado</h2>
          <p>O fórum que você está procurando não existe.</p>
          <button onClick={() => navigate('/foruns')} className="btn-primary">
            Voltar para Fóruns
          </button>
        </div>
      </div>
    );
  }

  const handleParticipar = () => {
    setIsParticipating(true);
    alert('Você entrou no fórum!');
  };

  const handleSair = () => {
    setIsParticipating(false);
    alert('Você saiu do fórum.');
  };

  const handlePostar = (e) => {
    e.preventDefault();
    if (newPost.trim()) {
      alert('Post criado com sucesso!');
      setNewPost('');
    }
  };

  return (
    <div className="forum-detalhes-page">
      <button 
        onClick={() => navigate('/foruns')} 
        className="btn-back"
        title="Voltar"
      >
        ← Voltar
      </button>

      <div className="forum-detalhes-container">
        {/* Header do Fórum */}
        <div className="forum-header">
          <div className="forum-header-content">
            <div className="forum-badge-section">
              <span className="forum-badge">{forum.tipoForum}</span>
            </div>
            <h1>{forum.nome}</h1>
            <p className="forum-descricao">{forum.descricaoCompleta || forum.descricao}</p>
            
            <div className="forum-stats">
              <div className="stat-item">
                <span className="stat-icon">👥</span>
                <span className="stat-value">{forum.participantes}</span>
                <span className="stat-label">Participantes</span>
              </div>
              <div className="stat-item">
                <span className="stat-icon">💬</span>
                <span className="stat-value">{forum.posts}</span>
                <span className="stat-label">Posts</span>
              </div>
              <div className="stat-item">
                <span className="stat-icon">📅</span>
                <span className="stat-value">{new Date(forum.criadoEm).toLocaleDateString('pt-BR')}</span>
                <span className="stat-label">Criado em</span>
              </div>
            </div>

            <div className="forum-actions">
              {isParticipating ? (
                <button onClick={handleSair} className="btn-leave">
                  Sair do Fórum
                </button>
              ) : (
                <button onClick={handleParticipar} className="btn-join">
                  Participar do Fórum
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="forum-content-grid">
          {/* Coluna Principal - Posts */}
          <div className="forum-main-content">
            <div className="section-header">
              <h2>💬 Discussões</h2>
            </div>

            {/* Formulário de Novo Post */}
            {isParticipating && (
              <div className="new-post-section">
                <form onSubmit={handlePostar} className="new-post-form">
                  <textarea
                    value={newPost}
                    onChange={(e) => setNewPost(e.target.value)}
                    placeholder="Compartilhe suas ideias, perguntas ou reflexões..."
                    className="new-post-input"
                    rows="4"
                  />
                  <div className="new-post-actions">
                    <button type="submit" className="btn-post" disabled={!newPost.trim()}>
                      Publicar Post
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Lista de Posts */}
            <div className="posts-list">
              {posts.map((post) => (
                <div key={post.id} className="post-card">
                  <div className="post-header">
                    <div className="post-author">
                      <div className="post-avatar">
                        {post.avatar ? (
                          <img src={post.avatar} alt={post.autor} />
                        ) : (
                          <span>👤</span>
                        )}
                      </div>
                      <div className="post-author-info">
                        <strong>{post.autor}</strong>
                        <span className="post-date">
                          {new Date(post.data).toLocaleDateString('pt-BR')} às {post.hora}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="post-content">
                    <p>{post.conteudo}</p>
                  </div>
                  <div className="post-footer">
                    <button className="post-action">
                      ❤️ {post.curtidas}
                    </button>
                    <button className="post-action">
                      💬 {post.respostas} respostas
                    </button>
                    <button className="post-action">
                      🔗 Compartilhar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar - Informações e Participantes */}
          <div className="forum-sidebar">
            <div className="sidebar-section">
              <h3>📋 Informações</h3>
              <div className="info-list">
                <div className="info-item">
                  <span className="info-label">📚 Gênero:</span>
                  <span>{forum.genero}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">📖 Obra:</span>
                  <span>{forum.obra}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">👮 Moderador:</span>
                  <span>{forum.moderador}</span>
                </div>
              </div>
            </div>

            <div className="sidebar-section">
              <h3>👥 Participantes ({forum.participantes})</h3>
              <div className="participantes-list">
                {forum.participantesLista.map((participante) => (
                  <div key={participante.id} className="participante-item">
                    <div className="participante-avatar">
                      {participante.avatar ? (
                        <img src={participante.avatar} alt={participante.nome} />
                      ) : (
                        <span>👤</span>
                      )}
                    </div>
                    <span className="participante-nome">{participante.nome}</span>
                  </div>
                ))}
                {forum.participantes > forum.participantesLista.length && (
                  <div className="participante-item more">
                    <span>+{forum.participantes - forum.participantesLista.length} mais</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForumDetalhes;


