import React from 'react';
import { Link } from 'react-router-dom';
import './Page.css';

const Usuarios = () => {
  const usuarios = [
    {
      id: 1,
      nome: 'Maria Silva',
      sobre: 'Apaixonada por literatura clássica',
      dataCadastro: '2023-01-15',
      tempoCadastro: '1 ano',
      evento: 'Encontro de Leitores 2024'
    },
    {
      id: 2,
      nome: 'João Santos',
      sobre: 'Fã de ficção científica',
      dataCadastro: '2023-03-20',
      tempoCadastro: '10 meses',
      evento: null
    },
    {
      id: 3,
      nome: 'Ana Costa',
      sobre: 'Especialista em poesia',
      dataCadastro: '2022-11-10',
      tempoCadastro: '1 ano e 2 meses',
      evento: 'Encontro de Leitores 2024'
    },
  ];

  return (
    <div className="page">
      <div className="page-header">
        <h1>👥 Usuários</h1>
        <Link to="/cadastro" className="btn-primary" style={{ textDecoration: 'none', display: 'inline-block' }}>+ Novo Usuário</Link>
      </div>

      <div className="cards-grid">
        {usuarios.map((usuario) => (
          <div key={usuario.id} className="card">
            <div className="card-header">
              <h3>{usuario.nome}</h3>
              <span className="badge">ID: {usuario.id}</span>
            </div>
            <div className="card-body">
              <p className="card-text"><strong>Sobre:</strong> {usuario.sobre}</p>
              <div className="card-info">
                <div className="info-item">
                  <span className="info-label">📅 Cadastro:</span>
                  <span>{usuario.dataCadastro}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">⏱️ Tempo:</span>
                  <span>{usuario.tempoCadastro}</span>
                </div>
                {usuario.evento && (
                  <div className="info-item">
                    <span className="info-label">🎉 Evento:</span>
                    <span>{usuario.evento}</span>
                  </div>
                )}
              </div>
            </div>
            <div className="card-footer">
              <button className="btn-secondary">Ver Detalhes</button>
              <button className="btn-secondary">Editar</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Usuarios;

