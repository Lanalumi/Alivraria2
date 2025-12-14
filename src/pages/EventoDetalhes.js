import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './EventoDetalhes.css';

const EventoDetalhes = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isInscrito, setIsInscrito] = useState(false);

  // Base de dados de eventos (em produção, isso viria de uma API)
  const eventosDatabase = [
    {
      id: 1,
      nome: "Encontro de Leitores 2025",
      descricao: "Evento anual reunindo leitores e autores para discussões e lançamentos",
      descricaoCompleta: "O Encontro de Leitores 2025 é o maior evento literário do ano, reunindo apaixonados por livros, autores renomados e editoras. Durante três dias, os participantes terão a oportunidade de participar de palestras, mesas-redondas, sessões de autógrafos e lançamentos exclusivos. O evento também conta com uma feira de livros, onde editoras apresentam seus principais lançamentos com descontos especiais. É uma experiência única para quem ama literatura e quer se conectar com outros leitores e escritores.",
      dataEvento: "2025-06-15",
      horaEvento: "09:00",
      local: "Centro de Convenções - São Paulo, SP",
      endereco: "Av. Paulista, 1578 - Bela Vista, São Paulo - SP",
      inscricoes: 156,
      inscricoesMaximas: 300,
      valorMedio: 50.0,
      valorInscricao: 50.0,
      convites: 12,
      convitesDisponiveis: 12,
      status: "Ativo",
      categoria: "Encontro Literário",
      organizador: "Alivraria",
      telefone: "(11) 3456-7890",
      email: "eventos@alivraria.com.br",
      programacao: [
        { horario: "09:00", atividade: "Credenciamento e Café de Boas-vindas" },
        { horario: "10:00", atividade: "Palestra: O Futuro da Literatura Brasileira" },
        { horario: "14:00", atividade: "Mesa-redonda: Autores Contemporâneos" },
        { horario: "16:00", atividade: "Sessão de Autógrafos" },
        { horario: "18:00", atividade: "Cocktail de Encerramento" }
      ],
      autoresParticipantes: [
        {
          id: 1,
          nome: "Machado de Assis",
          resumo: "Considerado o maior nome da literatura brasileira, Machado de Assis é autor de obras fundamentais como 'Dom Casmurro' e 'Memórias Póstumas de Brás Cubas'. Sua obra é marcada pela ironia, pelo realismo psicológico e pela crítica social."
        },
        {
          id: 2,
          nome: "Clarice Lispector",
          resumo: "Escritora brasileira de origem ucraniana, conhecida por sua prosa introspectiva e inovadora. Autora de 'A Hora da Estrela' e 'Perto do Coração Selvagem', sua obra explora a condição humana e os dilemas existenciais."
        },
        {
          id: 3,
          nome: "Jorge Amado",
          resumo: "Um dos mais traduzidos autores do país, Jorge Amado retratou a cultura e o povo baiano em obras como 'Gabriela, Cravo e Canela' e 'Capitães da Areia'. Sua literatura combina realismo social com elementos do folclore brasileiro."
        }
      ]
    },
    {
      id: 2,
      nome: "Noite de Autógrafos",
      descricao: "Sessão de autógrafos com autores locais",
      descricaoCompleta: "Uma noite especial dedicada aos amantes de livros, onde autores locais e regionais estarão presentes para autografar suas obras e conversar com os leitores. O evento oferece uma atmosfera intimista e acolhedora, perfeita para conhecer seus autores favoritos pessoalmente. Além dos autógrafos, haverá uma pequena feira de livros com obras dos autores participantes. Venha compartilhar histórias e criar memórias inesquecíveis!",
      dataEvento: "2025-04-20",
      horaEvento: "19:00",
      local: "Livraria Cultural - Shopping Center",
      endereco: "Rua das Flores, 123 - Centro, São Paulo - SP",
      inscricoes: 89,
      inscricoesMaximas: 150,
      valorMedio: 25.0,
      valorInscricao: 25.0,
      convites: 5,
      convitesDisponiveis: 5,
      status: "Ativo",
      categoria: "Autógrafos",
      organizador: "Alivraria",
      telefone: "(11) 3456-7890",
      email: "eventos@alivraria.com.br",
      programacao: [
        { horario: "19:00", atividade: "Abertura e Recepção" },
        { horario: "19:30", atividade: "Sessão de Autógrafos - Primeira Turma" },
        { horario: "20:30", atividade: "Intervalo com Coffee Break" },
        { horario: "21:00", atividade: "Sessão de Autógrafos - Segunda Turma" },
        { horario: "22:00", atividade: "Encerramento" }
      ],
      autoresParticipantes: [
        {
          id: 1,
          nome: "Machado de Assis",
          resumo: "Considerado o maior nome da literatura brasileira, Machado de Assis é autor de obras fundamentais como 'Dom Casmurro' e 'Memórias Póstumas de Brás Cubas'."
        },
        {
          id: 2,
          nome: "Clarice Lispector",
          resumo: "Escritora brasileira de origem ucraniana, conhecida por sua prosa introspectiva e inovadora. Autora de 'A Hora da Estrela' e 'Perto do Coração Selvagem'."
        }
      ]
    },
    {
      id: 3,
      nome: "Workshop de Escrita Criativa",
      descricao: "Workshop prático sobre técnicas de escrita",
      descricaoCompleta: "Um workshop intensivo de 8 horas dedicado ao desenvolvimento de habilidades de escrita criativa. Ministrado por escritores experientes, o curso aborda técnicas de narrativa, desenvolvimento de personagens, construção de diálogos e muito mais. Os participantes terão a oportunidade de praticar através de exercícios práticos e receber feedback personalizado. Ideal para iniciantes que querem começar a escrever e para escritores que desejam aprimorar suas técnicas. Material didático incluso.",
      dataEvento: "2025-05-10",
      horaEvento: "08:00",
      local: "Espaço Cultural - Biblioteca Municipal",
      endereco: "Praça da República, 456 - Centro, São Paulo - SP",
      inscricoes: 45,
      inscricoesMaximas: 50,
      valorMedio: 80.0,
      valorInscricao: 80.0,
      convites: 3,
      convitesDisponiveis: 3,
      status: "Ativo",
      categoria: "Workshop",
      organizador: "Alivraria",
      telefone: "(11) 3456-7890",
      email: "eventos@alivraria.com.br",
      programacao: [
        { horario: "08:00", atividade: "Credenciamento" },
        { horario: "08:30", atividade: "Módulo 1: Fundamentos da Narrativa" },
        { horario: "10:30", atividade: "Coffee Break" },
        { horario: "11:00", atividade: "Módulo 2: Desenvolvimento de Personagens" },
        { horario: "13:00", atividade: "Almoço (não incluso)" },
        { horario: "14:30", atividade: "Módulo 3: Diálogos e Descrições" },
        { horario: "16:30", atividade: "Coffee Break" },
        { horario: "17:00", atividade: "Módulo 4: Revisão e Edição" },
        { horario: "18:00", atividade: "Encerramento e Certificado" }
      ],
      autoresParticipantes: [
        {
          id: 2,
          nome: "Clarice Lispector",
          resumo: "Escritora brasileira de origem ucraniana, conhecida por sua prosa introspectiva e inovadora. Ministrará módulos sobre desenvolvimento de personagens e construção de diálogos."
        },
        {
          id: 3,
          nome: "Jorge Amado",
          resumo: "Um dos mais traduzidos autores do país, Jorge Amado compartilhará suas técnicas de narrativa e construção de histórias baseadas em realismo social."
        }
      ]
    },
  ];

  const evento = eventosDatabase.find(e => e.id === parseInt(id));

  if (!evento) {
    return (
      <div className="evento-detalhes-page">
        <div className="error-state">
          <h2>Evento não encontrado</h2>
          <p>O evento que você está procurando não existe.</p>
          <button onClick={() => navigate('/eventos')} className="btn-primary">
            Voltar para Eventos
          </button>
        </div>
      </div>
    );
  }

  const handleInscrever = () => {
    if (!isInscrito) {
      setIsInscrito(true);
      alert('Inscrição realizada com sucesso!');
    } else {
      setIsInscrito(false);
      alert('Inscrição cancelada.');
    }
  };

  const formatarData = (data) => {
    return new Date(data).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  };

  const calcularDiasRestantes = (dataEvento) => {
    const hoje = new Date();
    const evento = new Date(dataEvento);
    const diffTime = evento - hoje;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const diasRestantes = calcularDiasRestantes(evento.dataEvento);
  const vagasDisponiveis = evento.inscricoesMaximas - evento.inscricoes;

  return (
    <div className="evento-detalhes-page">
      <button 
        onClick={() => navigate(-1)} 
        className="btn-back"
        title="Voltar"
      >
        ← Voltar
      </button>

      <div className="evento-detalhes-container">
        {/* Header do Evento */}
        <div className="evento-header">
          <div className="evento-icon-container">
            <div className="evento-icon-placeholder">
              <span className="evento-icon">🎉</span>
            </div>
          </div>
          
          <div className="evento-header-info">
            <div className="evento-header-top">
              <span className="badge badge-categoria">{evento.categoria}</span>
              <span className={`badge badge-status ${evento.status.toLowerCase()}`}>
                {evento.status}
              </span>
            </div>
            <h1>{evento.nome}</h1>
            <p className="evento-organizador">Organizado por {evento.organizador}</p>
            
            <div className="evento-stats">
              <div className="stat-item">
                <span className="stat-icon">👥</span>
                <div className="stat-content">
                  <span className="stat-value">{evento.inscricoes}</span>
                  <span className="stat-label">Inscritos</span>
                </div>
              </div>
              <div className="stat-item">
                <span className="stat-icon">📅</span>
                <div className="stat-content">
                  <span className="stat-value">{diasRestantes}</span>
                  <span className="stat-label">Dias restantes</span>
                </div>
              </div>
              <div className="stat-item">
                <span className="stat-icon">💰</span>
                <div className="stat-content">
                  <span className="stat-value">R$ {evento.valorInscricao.toFixed(2)}</span>
                  <span className="stat-label">Valor</span>
                </div>
              </div>
            </div>

            <div className="evento-actions">
              <button
                onClick={handleInscrever}
                className={`btn-inscrever ${isInscrito ? 'inscrito' : ''}`}
              >
                {isInscrito ? '✓ Inscrito' : '📝 Inscrever-se'}
              </button>
            </div>
          </div>
        </div>

        {/* Informações Detalhadas */}
        <div className="evento-details-section">
          <h2>📋 Informações do Evento</h2>
          <div className="details-grid">
            <div className="detail-box">
              <span className="detail-icon">📅</span>
              <div className="detail-content">
                <span className="detail-label">Data do Evento</span>
                <span className="detail-value">
                  {formatarData(evento.dataEvento)}
                </span>
              </div>
            </div>
            <div className="detail-box">
              <span className="detail-icon">🕐</span>
              <div className="detail-content">
                <span className="detail-label">Horário</span>
                <span className="detail-value">{evento.horaEvento}</span>
              </div>
            </div>
            <div className="detail-box">
              <span className="detail-icon">📍</span>
              <div className="detail-content">
                <span className="detail-label">Local</span>
                <span className="detail-value">{evento.local}</span>
              </div>
            </div>
            <div className="detail-box">
              <span className="detail-icon">🏠</span>
              <div className="detail-content">
                <span className="detail-label">Endereço</span>
                <span className="detail-value">{evento.endereco}</span>
              </div>
            </div>
            <div className="detail-box">
              <span className="detail-icon">👥</span>
              <div className="detail-content">
                <span className="detail-label">Vagas Disponíveis</span>
                <span className="detail-value">{vagasDisponiveis} de {evento.inscricoesMaximas}</span>
              </div>
            </div>
            <div className="detail-box">
              <span className="detail-icon">💰</span>
              <div className="detail-content">
                <span className="detail-label">Valor da Inscrição</span>
                <span className="detail-value">R$ {evento.valorInscricao.toFixed(2)}</span>
              </div>
            </div>
            <div className="detail-box">
              <span className="detail-icon">📞</span>
              <div className="detail-content">
                <span className="detail-label">Telefone</span>
                <span className="detail-value">{evento.telefone}</span>
              </div>
            </div>
            <div className="detail-box">
              <span className="detail-icon">✉️</span>
              <div className="detail-content">
                <span className="detail-label">E-mail</span>
                <span className="detail-value">{evento.email}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Descrição */}
        <div className="evento-descricao-section">
          <h2>📖 Sobre o Evento</h2>
          <p className="descricao-text">{evento.descricaoCompleta || evento.descricao}</p>
        </div>

        {/* Autores Participantes */}
        {evento.autoresParticipantes && evento.autoresParticipantes.length > 0 && (
          <div className="evento-autores-section">
            <h2>✍️ Autores Participantes</h2>
            <div className="autores-grid">
              {evento.autoresParticipantes.map((autor) => (
                <div key={autor.id} className="autor-card">
                  <div className="autor-avatar">
                    <span className="autor-icon">👤</span>
                  </div>
                  <div className="autor-info">
                    <h3>{autor.nome}</h3>
                    <p className="autor-resumo">{autor.resumo}</p>
                    <button 
                      onClick={() => navigate(`/autores/${autor.id}`)} 
                      className="btn-ver-autor"
                    >
                      Ver Perfil →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Programação */}
        {evento.programacao && evento.programacao.length > 0 && (
          <div className="evento-programacao-section">
            <h2>📅 Programação</h2>
            <div className="programacao-list">
              {evento.programacao.map((item, index) => (
                <div key={index} className="programacao-item">
                  <div className="programacao-horario">
                    <span className="horario-badge">{item.horario}</span>
                  </div>
                  <div className="programacao-atividade">
                    <span>{item.atividade}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventoDetalhes;

