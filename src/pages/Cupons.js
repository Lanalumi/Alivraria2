import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Page.css';

const Cupons = () => {
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
  const cupons = [
    {
      id: 1,
      assinatura: 'Premium',
      desconto: 15.00,
      dataCriacao: '2024-01-15',
      dataValidade: '2024-12-31',
      status: 'Ativo'
    },
    {
      id: 2,
      assinatura: 'VIP',
      desconto: 25.00,
      dataCriacao: '2024-02-01',
      dataValidade: '2024-06-30',
      status: 'Ativo'
    },
    {
      id: 3,
      assinatura: 'Básica',
      desconto: 10.00,
      dataCriacao: '2023-12-01',
      dataValidade: '2024-03-31',
      status: 'Expirado'
    },
  ];

  return (
    <div className="page">
      <div className="page-header">
        <h1>🎫 Cupons</h1>
        <button className="btn-primary">+ Novo Cupom</button>
      </div>

      <div className="cards-grid">
        {cupons.map((cupom) => (
          <div key={cupom.id} className="card">
            <div className="card-header">
              <h3>Cupom #{cupom.id}</h3>
              <span className={`badge ${cupom.status === 'Ativo' ? 'badge-success' : 'badge-danger'}`}>
                {cupom.status}
              </span>
            </div>
            <div className="card-body">
              <div className="card-info">
                <div className="info-item">
                  <span className="info-label">💳 Assinatura:</span>
                  <span>{cupom.assinatura}</span>
                </div>
                <div className="info-item highlight">
                  <span className="info-label">💰 Desconto:</span>
                  <span className="discount-value">{cupom.desconto}%</span>
                </div>
                <div className="info-item">
                  <span className="info-label">📅 Criado em:</span>
                  <span>{cupom.dataCriacao}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">⏰ Válido até:</span>
                  <span>{cupom.dataValidade}</span>
                </div>
              </div>
            </div>
            <div className="card-footer">
              <button className="btn-secondary">Copiar Código</button>
              <button className="btn-secondary">Editar</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cupons;

