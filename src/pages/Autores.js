import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Page.css';

const Autores = () => {
  const navigate = useNavigate();
  
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

  return (
    <div className="page">
      <div className="page-header">
        <h1>✍️ Autores</h1>
        <button className="btn-primary">+ Novo Autor</button>
      </div>

      <div className="cards-grid">
        {autores.map((autor) => (
          <div 
            key={autor.id} 
            className="card"
            onClick={() => navigate(`/autores/${autor.id}`)}
            style={{ cursor: 'pointer' }}
          >
            <div className="card-header">
              <h3>{autor.nome}</h3>
              <span className="badge">ID: {autor.id}</span>
            </div>
            <div className="card-body">
              <p className="card-text">{autor.sobre}</p>
              <div className="card-info">
                <div className="info-item">
                  <span className="info-label">👤 Gênero:</span>
                  <span>{autor.genero}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">📖 Livros:</span>
                  <span>{autor.livros}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">⭐ Fóruns Exclusivos:</span>
                  <span>{autor.forunsExclusivos}</span>
                </div>
              </div>
            </div>
            <div className="card-footer">
              <button className="btn-secondary">Ver Livros</button>
              <button className="btn-secondary">Ver Fóruns</button>
              <button className="btn-secondary">Editar</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Autores;

