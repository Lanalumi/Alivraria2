import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './AutorDetalhes.css';

const AutorDetalhes = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Base de dados de autores (em produção, isso viria de uma API)
  const autoresDatabase = [
    {
      id: 1,
      nome: 'Machado de Assis',
      sobre: 'Escritor brasileiro, considerado o maior nome da literatura nacional',
      genero: 'Masculino',
      dataNascimento: '1839-06-21',
      dataFalecimento: '1908-09-29',
      localNascimento: 'Rio de Janeiro, RJ',
      historiaVida: 'Joaquim Maria Machado de Assis nasceu no Rio de Janeiro em 1839, filho de um operário mestiço e uma lavadeira portuguesa. Autodidata, superou as dificuldades de origem humilde e problemas de saúde para se tornar um dos maiores escritores da língua portuguesa. Foi funcionário público, jornalista e fundador da Academia Brasileira de Letras, da qual foi o primeiro presidente. Sua obra é marcada pela ironia, pelo realismo psicológico e pela crítica social sutil.',
      estiloEscrita: 'Machado de Assis desenvolveu um estilo único caracterizado pela ironia fina, pelo humor sutil e pela análise psicológica profunda dos personagens. Sua prosa é elegante e refinada, com diálogos afiados e narrativas que frequentemente quebram a linearidade temporal. É considerado o precursor do realismo psicológico no Brasil.',
      tipoLiterario: 'Realismo, Realismo Psicológico, Romantismo (fase inicial)',
      livros: [
        {
          id: 1,
          nome: 'Dom Casmurro',
          dataLancamento: '1899-12-20',
          genero: 'Literatura Brasileira'
        },
        {
          id: 4,
          nome: 'Memórias Póstumas de Brás Cubas',
          dataLancamento: '1881-03-15',
          genero: 'Literatura Brasileira'
        },
        {
          id: 5,
          nome: 'Quincas Borba',
          dataLancamento: '1891-12-15',
          genero: 'Literatura Brasileira'
        },
        {
          id: 6,
          nome: 'O Alienista',
          dataLancamento: '1882-01-01',
          genero: 'Literatura Brasileira'
        },
        {
          id: 7,
          nome: 'Esaú e Jacó',
          dataLancamento: '1904-01-01',
          genero: 'Literatura Brasileira'
        }
      ],
      forunsExclusivos: [
        {
          id: 1,
          titulo: 'Fórum Exclusivo: Machado de Assis',
          descricao: 'Análise profunda das obras de Machado de Assis',
          genero: 'Literatura Clássica',
          assinatura: 'Premium',
          participantes: 12
        }
      ]
    },
    {
      id: 2,
      nome: 'Clarice Lispector',
      sobre: 'Escritora brasileira de origem ucraniana, conhecida por sua prosa introspectiva',
      genero: 'Feminino',
      dataNascimento: '1920-12-10',
      dataFalecimento: '1977-12-09',
      localNascimento: 'Chechelnyk, Ucrânia',
      historiaVida: 'Clarice Lispector nasceu na Ucrânia em 1920, mas chegou ao Brasil ainda bebê, em 1922, estabelecendo-se em Recife e depois no Rio de Janeiro. Formou-se em Direito, mas dedicou-se à literatura e ao jornalismo. Trabalhou como jornalista e viveu em vários países devido ao trabalho diplomático do marido. Sua obra é considerada uma das mais importantes da literatura brasileira do século XX, explorando a condição humana e os dilemas existenciais.',
      estiloEscrita: 'Clarice Lispector desenvolveu uma prosa única e inovadora, caracterizada pela introspecção profunda, pelo fluxo de consciência e pela exploração dos estados psicológicos dos personagens. Sua escrita é poética e filosófica, frequentemente fragmentada e não linear, explorando temas como a solidão, a identidade e a busca pelo sentido da existência.',
      tipoLiterario: 'Modernismo, Literatura Contemporânea, Prosa Poética',
      livros: [
        {
          id: 5,
          nome: 'A Hora da Estrela',
          dataLancamento: '1977-10-26',
          genero: 'Literatura Brasileira'
        },
        {
          id: 8,
          nome: 'Perto do Coração Selvagem',
          dataLancamento: '1943-12-01',
          genero: 'Literatura Brasileira'
        },
        {
          id: 9,
          nome: 'A Paixão Segundo G.H.',
          dataLancamento: '1964-01-01',
          genero: 'Literatura Brasileira'
        },
        {
          id: 10,
          nome: 'Laços de Família',
          dataLancamento: '1960-01-01',
          genero: 'Literatura Brasileira'
        }
      ],
      forunsExclusivos: [
        {
          id: 2,
          titulo: 'Fórum Exclusivo: Autores Contemporâneos',
          descricao: 'Discussões sobre autores contemporâneos brasileiros',
          genero: 'Literatura Contemporânea',
          assinatura: 'VIP',
          participantes: 8
        }
      ]
    },
    {
      id: 3,
      nome: 'Jorge Amado',
      sobre: 'Escritor brasileiro, um dos mais traduzidos autores do país',
      genero: 'Masculino',
      dataNascimento: '1912-08-10',
      dataFalecimento: '2001-08-06',
      localNascimento: 'Itabuna, BA',
      historiaVida: 'Jorge Amado nasceu em Itabuna, Bahia, em 1912. Formou-se em Direito no Rio de Janeiro, mas dedicou-se integralmente à literatura. Foi membro da Academia Brasileira de Letras e um dos escritores brasileiros mais traduzidos no mundo. Sua obra retrata a cultura e o povo baiano, especialmente de Salvador, com foco nas classes populares, na cultura afro-brasileira e nas tradições regionais.',
      estiloEscrita: 'Jorge Amado desenvolveu um estilo narrativo marcado pelo realismo social, pela riqueza de personagens populares e pela descrição vívida da cultura baiana. Sua prosa é fluente e acessível, combinando elementos do realismo com aspectos do folclore e da cultura popular brasileira. É conhecido por criar personagens memoráveis e por retratar a vida urbana e rural da Bahia.',
      tipoLiterario: 'Realismo Social, Regionalismo, Literatura Popular',
      livros: [
        {
          id: 11,
          nome: 'Gabriela, Cravo e Canela',
          dataLancamento: '1958-01-01',
          genero: 'Literatura Brasileira'
        },
        {
          id: 12,
          nome: 'Capitães da Areia',
          dataLancamento: '1937-01-01',
          genero: 'Literatura Brasileira'
        },
        {
          id: 13,
          nome: 'Dona Flor e Seus Dois Maridos',
          dataLancamento: '1966-01-01',
          genero: 'Literatura Brasileira'
        },
        {
          id: 14,
          nome: 'Tieta do Agreste',
          dataLancamento: '1977-01-01',
          genero: 'Literatura Brasileira'
        }
      ],
      forunsExclusivos: []
    },
  ];

  const autor = autoresDatabase.find(a => a.id === parseInt(id));

  if (!autor) {
    return (
      <div className="autor-detalhes-page">
        <div className="error-state">
          <h2>Autor não encontrado</h2>
          <p>O autor que você está procurando não existe.</p>
          <button onClick={() => navigate('/')} className="btn-primary">
            Voltar para Home
          </button>
        </div>
      </div>
    );
  }

  const formatarData = (data) => {
    return new Date(data).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <div className="autor-detalhes-page">
      <button 
        onClick={() => navigate(-1)} 
        className="btn-back"
        title="Voltar"
      >
        ← Voltar
      </button>

      <div className="autor-detalhes-container">
        {/* Header do Autor */}
        <div className="autor-header">
          <div className="autor-photo-container">
            <div className="autor-photo">
              <span className="autor-photo-icon">👤</span>
            </div>
          </div>
          
          <div className="autor-header-info">
            <h1>{autor.nome}</h1>
            <div className="autor-meta">
              <span className="badge badge-genero">{autor.genero}</span>
              <span className="autor-dates">
                {formatarData(autor.dataNascimento)} - {autor.dataFalecimento ? formatarData(autor.dataFalecimento) : 'Presente'}
              </span>
            </div>
            <p className="autor-local">📍 {autor.localNascimento}</p>
            <div className="autor-stats">
              <div className="stat-item">
                <span className="stat-icon">📖</span>
                <div className="stat-content">
                  <span className="stat-value">{autor.livros.length}</span>
                  <span className="stat-label">Obras</span>
                </div>
              </div>
              <div className="stat-item">
                <span className="stat-icon">⭐</span>
                <div className="stat-content">
                  <span className="stat-value">{autor.forunsExclusivos.length}</span>
                  <span className="stat-label">Fóruns Exclusivos</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sobre o Autor */}
        <div className="autor-sobre-section">
          <h2>📖 Sobre o Autor</h2>
          <div className="sobre-content">
            <div className="sobre-item">
              <h3>História de Vida</h3>
              <p>{autor.historiaVida}</p>
            </div>
            <div className="sobre-item">
              <h3>Estilo de Escrita</h3>
              <p>{autor.estiloEscrita}</p>
            </div>
            <div className="sobre-item">
              <h3>Tipo Literário</h3>
              <div className="tipos-literarios">
                {autor.tipoLiterario.split(', ').map((tipo, index) => (
                  <span key={index} className="badge-tipo">{tipo}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Obras Escritas */}
        <div className="autor-obras-section">
          <h2>📚 Obras Escritas</h2>
          <div className="obras-list">
            {autor.livros.map((livro) => (
              <div 
                key={livro.id} 
                className="obra-item"
                onClick={() => navigate(`/livros/${livro.id}`)}
              >
                <div className="obra-icon">📖</div>
                <div className="obra-info">
                  <h3>{livro.nome}</h3>
                  <div className="obra-meta">
                    <span className="obra-genero">{livro.genero}</span>
                    <span className="obra-data">{formatarData(livro.dataLancamento)}</span>
                  </div>
                </div>
                <div className="obra-arrow">→</div>
              </div>
            ))}
          </div>
        </div>

        {/* Fóruns Exclusivos */}
        {autor.forunsExclusivos && autor.forunsExclusivos.length > 0 && (
          <div className="autor-foruns-section">
            <h2>⭐ Fóruns Exclusivos</h2>
            <div className="foruns-list">
              {autor.forunsExclusivos.map((forum) => (
                <div 
                  key={forum.id} 
                  className="forum-item"
                  onClick={() => navigate(`/forum-exclusivo/${forum.id}`)}
                >
                  <div className="forum-icon">⭐</div>
                  <div className="forum-info">
                    <h3>{forum.titulo}</h3>
                    <p className="forum-desc">{forum.descricao}</p>
                    <div className="forum-meta">
                      <span className="badge-forum">{forum.assinatura}</span>
                      <span className="forum-genero">{forum.genero}</span>
                      <span className="forum-participantes">👥 {forum.participantes} participantes</span>
                    </div>
                  </div>
                  <div className="forum-arrow">→</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AutorDetalhes;

