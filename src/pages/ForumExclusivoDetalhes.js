import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './ForumExclusivoDetalhes.css';

const ForumExclusivoDetalhes = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [newPost, setNewPost] = useState('');
  const [newQuestionToAuthor, setNewQuestionToAuthor] = useState('');
  const [isParticipating, setIsParticipating] = useState(true);
  const [activeTab, setActiveTab] = useState('author'); // 'author' ou 'discussions'

  // Base de dados de fóruns exclusivos
  const forunsExclusivosDatabase = [
    {
      id: 1,
      titulo: 'Fórum Exclusivo: Machado de Assis',
      descricao: 'Análise profunda das obras de Machado de Assis',
      descricaoCompleta: 'Este fórum exclusivo é dedicado à análise detalhada e profunda das obras de Machado de Assis. Apenas assinantes Premium e VIP têm acesso a discussões especializadas, análises críticas avançadas e debates sobre os aspectos mais sutis da obra machadiana. Participe de conversas exclusivas com outros entusiastas da literatura brasileira.',
      genero: 'Literatura Clássica',
      autor: 'Machado de Assis',
      assinatura: 'Premium',
      tipoForum: 'Exclusivo',
      dataCriacao: '2024-01-10',
      participantes: 12,
      posts: 45,
      moderador: 'Prof. Carlos Mendes',
      participantesLista: [
        { id: 1, nome: 'Maria Silva', avatar: null },
        { id: 2, nome: 'João Santos', avatar: null },
        { id: 3, nome: 'Ana Costa', avatar: null },
      ]
    },
    {
      id: 2,
      titulo: 'Fórum Exclusivo: Autores Contemporâneos',
      descricao: 'Discussões sobre autores contemporâneos brasileiros',
      descricaoCompleta: 'Um espaço exclusivo para discussões sobre a literatura brasileira contemporânea. Explore obras recentes, descubra novos autores e participe de análises profundas sobre as tendências literárias atuais. Acesso restrito a assinantes VIP.',
      genero: 'Literatura Contemporânea',
      autor: 'Diversos',
      assinatura: 'VIP',
      tipoForum: 'Exclusivo',
      dataCriacao: '2024-02-15',
      participantes: 8,
      posts: 23,
      moderador: 'Dra. Beatriz Alves',
      participantesLista: [
        { id: 1, nome: 'Maria Silva', avatar: null },
        { id: 2, nome: 'João Santos', avatar: null },
      ]
    },
    {
      id: 3,
      titulo: 'Fórum Exclusivo: Literatura Fantástica',
      descricao: 'Exploração de mundos fantásticos e narrativas mágicas',
      descricaoCompleta: 'Entre em um universo exclusivo dedicado à literatura fantástica. Discuta sobre mundos mágicos, narrativas épicas e autores que criam universos extraordinários. Este fórum é exclusivo para assinantes Premium.',
      genero: 'Fantasia',
      autor: 'Diversos',
      assinatura: 'Premium',
      tipoForum: 'Exclusivo',
      dataCriacao: '2024-03-01',
      participantes: 15,
      posts: 67,
      moderador: 'Ricardo Oliveira',
      participantesLista: [
        { id: 1, nome: 'Maria Silva', avatar: null },
        { id: 2, nome: 'João Santos', avatar: null },
        { id: 3, nome: 'Ana Costa', avatar: null },
        { id: 4, nome: 'Pedro Oliveira', avatar: null },
      ]
    },
  ];

  const forum = forunsExclusivosDatabase.find(f => f.id === parseInt(id));

  // Mapear autor do fórum para nome real e ID (simulação)
  const getAutorInfo = (autorNome) => {
    const autorMap = {
      'Machado de Assis': { nome: 'Machado de Assis', id: 1 },
      'Clarice Lispector': { nome: 'Clarice Lispector', id: 2 },
      'Jorge Amado': { nome: 'Jorge Amado', id: 3 },
      'Diversos': { nome: 'Autor Convidado', id: null }
    };
    return autorMap[autorNome] || { nome: autorNome, id: null };
  };
  
  const autorInfo = forum ? getAutorInfo(forum.autor) : { nome: 'Autor Desconhecido', id: null };
  const autorNome = autorInfo.nome;

  // Posts de conversa com o autor
  const [authorConversations] = useState([
    {
      id: 1,
      autor: 'Maria Silva',
      avatar: null,
      data: '2024-01-22',
      hora: '10:15',
      conteudo: 'Olá! Tenho uma dúvida sobre Dom Casmurro. Qual foi sua inspiração para criar um narrador tão complexo e ambíguo como Bentinho?',
      curtidas: 5,
      isQuestion: true,
      resposta: {
        autor: autorNome,
        avatar: null,
        data: '2024-01-22',
        hora: '14:30',
        conteudo: 'Excelente pergunta! A ambiguidade do narrador foi uma escolha deliberada para explorar a subjetividade da memória e da percepção. Bentinho não é apenas um narrador, mas um filtro através do qual vemos os eventos, e esse filtro está contaminado por suas próprias emoções e suspeitas.',
        curtidas: 12
      }
    },
    {
      id: 2,
      autor: 'João Santos',
      avatar: null,
      data: '2024-01-21',
      hora: '16:45',
      conteudo: 'Qual obra você considera sua mais importante e por quê?',
      curtidas: 8,
      isQuestion: true,
      resposta: {
        autor: autorNome,
        avatar: null,
        data: '2024-01-21',
        hora: '18:20',
        conteudo: 'Cada obra tem seu lugar especial, mas "Memórias Póstumas de Brás Cubas" foi revolucionária por sua inovação narrativa. A ironia e o humor negro abriram novos caminhos para a literatura brasileira, enquanto "Dom Casmurro" explora profundamente a psicologia humana.',
        curtidas: 15
      }
    },
    {
      id: 3,
      autor: 'Ana Costa',
      avatar: null,
      data: '2024-01-20',
      hora: '09:30',
      conteudo: 'Como você desenvolveu o estilo único de narrativa que caracteriza suas obras?',
      curtidas: 6,
      isQuestion: true,
      resposta: null // Pergunta ainda não respondida
    },
  ]);

  // Posts de discussões gerais
  const [posts] = useState([
    {
      id: 1,
      autor: 'Maria Silva',
      avatar: null,
      data: '2024-01-20',
      hora: '15:30',
      conteudo: 'A análise do narrador em Dom Casmurro é realmente fascinante. A ambiguidade proposital de Machado nos faz questionar constantemente a veracidade do que lemos. Alguém mais notou os paralelos com outras obras dele?',
      curtidas: 8,
      respostas: 4
    },
    {
      id: 2,
      autor: 'João Santos',
      avatar: null,
      data: '2024-01-19',
      hora: '11:20',
      conteudo: 'Estou relendo "Memórias Póstumas" e descobrindo nuances que não havia percebido antes. A ironia machadiana é uma camada que se revela a cada leitura.',
      curtidas: 12,
      respostas: 6
    },
  ]);

  if (!forum) {
    return (
      <div className="forum-exclusivo-detalhes-page">
        <div className="error-state">
          <h2>Fórum não encontrado</h2>
          <p>O fórum exclusivo que você está procurando não existe.</p>
          <button onClick={() => navigate('/forum-exclusivo')} className="btn-primary">
            Voltar para Fóruns Exclusivos
          </button>
        </div>
      </div>
    );
  }

  const handleParticipar = () => {
    setIsParticipating(true);
    alert('Você entrou no fórum exclusivo!');
  };

  const handleSair = () => {
    setIsParticipating(false);
    alert('Você saiu do fórum exclusivo.');
  };

  const handlePostar = (e) => {
    e.preventDefault();
    if (newPost.trim()) {
      alert('Post criado com sucesso!');
      setNewPost('');
    }
  };

  const handlePerguntarAutor = (e) => {
    e.preventDefault();
    if (newQuestionToAuthor.trim()) {
      alert('Pergunta enviada ao autor! Ele receberá uma notificação e poderá responder em breve.');
      setNewQuestionToAuthor('');
    }
  };

  return (
    <div className="forum-exclusivo-detalhes-page">
      <button 
        onClick={() => navigate('/forum-exclusivo')} 
        className="btn-back"
        title="Voltar"
      >
        ← Voltar
      </button>

      <div className="forum-exclusivo-detalhes-container">
        {/* Header do Fórum Exclusivo */}
        <div className="forum-exclusivo-header">
          <div className="forum-exclusivo-header-content">
            <div className="forum-exclusivo-badge-section">
              <span className="forum-exclusivo-badge">⭐ Exclusivo</span>
              <span className="forum-assinatura-badge">{forum.assinatura}</span>
            </div>
            <h1>{forum.titulo}</h1>
            <p className="forum-exclusivo-descricao">{forum.descricaoCompleta || forum.descricao}</p>
            
            <div className="forum-exclusivo-stats">
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
                <span className="stat-value">{new Date(forum.dataCriacao).toLocaleDateString('pt-BR')}</span>
                <span className="stat-label">Criado em</span>
              </div>
            </div>

            <div className="forum-exclusivo-actions">
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

        <div className="forum-exclusivo-content-grid">
          {/* Coluna Principal - Posts */}
          <div className="forum-exclusivo-main-content">
            {/* Tabs */}
            <div className="forum-tabs">
              <button 
                className={`tab-button ${activeTab === 'author' ? 'active' : ''}`}
                onClick={() => setActiveTab('author')}
              >
                ✍️ Conversar com o Autor
              </button>
              <button 
                className={`tab-button ${activeTab === 'discussions' ? 'active' : ''}`}
                onClick={() => setActiveTab('discussions')}
              >
                💬 Discussões Gerais
              </button>
            </div>

            {/* Tab: Conversar com o Autor */}
            {activeTab === 'author' && (
              <>
                {/* Banner de Destaque */}
                <div className="author-chat-banner">
                  <div className="author-chat-banner-content">
                    <div className="author-chat-icon">✍️</div>
                    <div className="author-chat-text">
                      <h3>Conversar com {autorNome}</h3>
                      <p>Este é um espaço exclusivo para fazer perguntas diretamente ao autor. Suas perguntas serão respondidas pessoalmente!</p>
                    </div>
                  </div>
                </div>

                {/* Formulário para Perguntar ao Autor */}
                {isParticipating && (
                  <div className="ask-author-section">
                    <h3>💬 Faça uma pergunta ao autor</h3>
                    <form onSubmit={handlePerguntarAutor} className="ask-author-form">
                      <textarea
                        value={newQuestionToAuthor}
                        onChange={(e) => setNewQuestionToAuthor(e.target.value)}
                        placeholder={`O que você gostaria de perguntar a ${autorNome}?`}
                        className="ask-author-input"
                        rows="4"
                      />
                      <div className="ask-author-actions">
                        <button type="submit" className="btn-ask-author" disabled={!newQuestionToAuthor.trim()}>
                          Enviar Pergunta ao Autor
                        </button>
                      </div>
                    </form>
                  </div>
                )}

                {/* Lista de Conversas com o Autor */}
                <div className="author-conversations-list">
                  {authorConversations.map((conversation) => (
                    <div key={conversation.id} className="conversation-thread">
                      {/* Pergunta do Usuário */}
                      <div className="post-card post-card-question">
                        <div className="post-header">
                          <div className="post-author">
                            <div className="post-avatar">
                              {conversation.avatar ? (
                                <img src={conversation.avatar} alt={conversation.autor} />
                              ) : (
                                <span>👤</span>
                              )}
                            </div>
                            <div className="post-author-info">
                              <strong>{conversation.autor}</strong>
                              <span className="post-badge-question">❓ Pergunta</span>
                              <span className="post-date">
                                {new Date(conversation.data).toLocaleDateString('pt-BR')} às {conversation.hora}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="post-content">
                          <p>{conversation.conteudo}</p>
                        </div>
                        <div className="post-footer">
                          <button className="post-action">
                            ❤️ {conversation.curtidas}
                          </button>
                        </div>
                      </div>

                      {/* Resposta do Autor */}
                      {conversation.resposta ? (
                        <div className="post-card post-card-author-response">
                          <div className="post-header">
                            <div className="post-author">
                              <div className="post-avatar post-avatar-author">
                                <span>✍️</span>
                              </div>
                              <div className="post-author-info">
                                <strong>{conversation.resposta.autor}</strong>
                                <span className="post-badge-author">⭐ Autor</span>
                                <span className="post-date">
                                  {new Date(conversation.resposta.data).toLocaleDateString('pt-BR')} às {conversation.resposta.hora}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="post-content">
                            <p>{conversation.resposta.conteudo}</p>
                          </div>
                          <div className="post-footer">
                            <button className="post-action">
                              ❤️ {conversation.resposta.curtidas}
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="waiting-response">
                          <span className="waiting-icon">⏳</span>
                          <span className="waiting-text">Aguardando resposta do autor...</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </>
            )}

            {/* Tab: Discussões Gerais */}
            {activeTab === 'discussions' && (
              <>
                <div className="section-header">
                  <h2>💬 Discussões Exclusivas</h2>
                </div>

                {/* Formulário de Novo Post */}
                {isParticipating && (
                  <div className="new-post-section">
                    <form onSubmit={handlePostar} className="new-post-form">
                      <textarea
                        value={newPost}
                        onChange={(e) => setNewPost(e.target.value)}
                        placeholder="Compartilhe suas análises e reflexões exclusivas..."
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
                    <div key={post.id} className="post-card post-card-exclusive">
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
              </>
            )}
          </div>

          {/* Sidebar - Informações e Participantes */}
          <div className="forum-exclusivo-sidebar">
            <div className="sidebar-section sidebar-section-exclusive">
              <h3>📋 Informações</h3>
              <div className="info-list">
                <div className="info-item">
                  <span className="info-label">✍️ Autor:</span>
                  {autorInfo.id ? (
                    <span 
                      onClick={() => navigate(`/autores/${autorInfo.id}`)} 
                      style={{ cursor: 'pointer', color: '#667eea', textDecoration: 'underline' }}
                    >
                      {forum.autor}
                    </span>
                  ) : (
                    <span>{forum.autor}</span>
                  )}
                </div>
                <div className="info-item">
                  <span className="info-label">📚 Gênero:</span>
                  <span>{forum.genero}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">💳 Assinatura:</span>
                  <span className="badge-assinatura">{forum.assinatura}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">👮 Moderador:</span>
                  <span>{forum.moderador}</span>
                </div>
              </div>
            </div>

            <div className="sidebar-section sidebar-section-exclusive">
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

export default ForumExclusivoDetalhes;

