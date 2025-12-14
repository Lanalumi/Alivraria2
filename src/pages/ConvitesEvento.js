import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Page.css';

const ConvitesEvento = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Verificar se o usuário é administrador
  if (user?.role !== 'admin') {
    return (
      <div className="page">
        <div className="no-access">
          <h2>🔒 Acesso Restrito</h2>
          <p>Esta página é exclusiva para administradores.</p>
          <button onClick={() => navigate('/')} className="btn-primary">
            Voltar para Home
          </button>
        </div>
      </div>
    );
  }
  const convites = [
    {
      id: 1,
      evento: 'Encontro de Leitores 2024',
      assinatura: 'VIP',
      dataEnvio: '2024-01-10',
      dataEvento: '2024-06-15',
      informacoes: 'Convite exclusivo para membros VIP. Inclui acesso prioritário e área VIP.',
      status: 'Enviado'
    },
    {
      id: 2,
      evento: 'Noite de Autógrafos',
      assinatura: 'Premium',
      dataEnvio: '2024-03-15',
      dataEvento: '2024-04-20',
      informacoes: 'Convite para sessão de autógrafos com autores locais.',
      status: 'Enviado'
    },
    {
      id: 3,
      evento: 'Workshop de Escrita Criativa',
      assinatura: 'Premium',
      dataEnvio: '2024-04-01',
      dataEvento: '2024-05-10',
      informacoes: 'Workshop prático sobre técnicas de escrita criativa.',
      status: 'Pendente'
    },
  ];

  return (
    <div className="page">
      <div className="page-header">
        <h1>✉️ Convites de Eventos</h1>
        <button className="btn-primary">+ Novo Convite</button>
      </div>

      <div className="cards-grid">
        {convites.map((convite) => (
          <div key={convite.id} className="card">
            <div className="card-header">
              <h3>{convite.evento}</h3>
              <span className={`badge ${convite.status === 'Enviado' ? 'badge-success' : 'badge-warning'}`}>
                {convite.status}
              </span>
            </div>
            <div className="card-body">
              <p className="card-text">{convite.informacoes}</p>
              <div className="card-info">
                <div className="info-item">
                  <span className="info-label">💳 Assinatura:</span>
                  <span>{convite.assinatura}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">📤 Enviado em:</span>
                  <span>{convite.dataEnvio}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">📅 Data do Evento:</span>
                  <span>{convite.dataEvento}</span>
                </div>
              </div>
            </div>
            <div className="card-footer">
              <button className="btn-secondary">Ver Detalhes</button>
              <button className="btn-secondary">Reenviar</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ConvitesEvento;

