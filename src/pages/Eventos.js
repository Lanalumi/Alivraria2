import React from "react";
import { useNavigate } from "react-router-dom";
import "./Page.css";

const Eventos = () => {
  const navigate = useNavigate();

  const eventos = [
    {
      id: 1,
      nome: "Encontro de Leitores 2025",
      descricao:
        "Evento anual reunindo leitores e autores para discussões e lançamentos",
      dataEvento: "2025-12-15",
      inscricoes: 156,
      valorMedio: 50.0,
      convites: 12,
    },
    {
      id: 2,
      nome: "Noite de Autógrafos",
      descricao: "Sessão de autógrafos com autores locais",
      dataEvento: "2026-04-20",
      inscricoes: 89,
      valorMedio: 25.0,
      convites: 5,
    },
    {
      id: 3,
      nome: "Workshop de Escrita Criativa",
      descricao: "Workshop prático sobre técnicas de escrita",
      dataEvento: "2026-05-10",
      inscricoes: 45,
      valorMedio: 80.0,
      convites: 3,
    },
  ];

  return (
    <div className="page">
      <div className="page-header">
        <h1>🎉 Eventos</h1>
      </div>

      <div className="cards-grid">
        {eventos.map((evento) => (
          <div
            key={evento.id}
            className="card"
            onClick={() => navigate(`/eventos/${evento.id}`)}
            style={{ cursor: "pointer" }}
          >
            <div className="card-header">
              <h3>{evento.nome}</h3>
              <span className="badge badge-success">Ativo</span>
            </div>
            <div className="card-body">
              <p className="card-text">{evento.descricao}</p>
              <div className="card-info">
                <div className="info-item">
                  <span className="info-label">📅 Data:</span>
                  <span>{evento.dataEvento}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">👥 Inscrições:</span>
                  <span>{evento.inscricoes}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">💰 Valor Médio:</span>
                  <span>R$ {evento.valorMedio.toFixed(2)}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">✉️ Convites:</span>
                  <span>{evento.convites}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Eventos;
