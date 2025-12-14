import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  // Simular usuário logado (em produção, isso viria de uma API ou localStorage)
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('alivraria_user');
    return savedUser ? JSON.parse(savedUser) : {
      id: 1,
      nome: 'Maria Silva',
      sobre: 'Apaixonada por literatura clássica e sempre em busca de novas histórias para descobrir.',
      genero: 'Feminino',
      email: 'maria.silva@email.com',
      telefone: '(11) 98765-4321',
      interessesLiterarios: 'Literatura Brasileira, Romance, Poesia, Literatura Clássica',
      dataCadastro: '2023-01-15',
      tempoCadastro: '1 ano',
      imagemPerfil: null,
      assinatura: 'Premium',
      role: 'user', // 'user' ou 'admin'
      livrosFavoritos: 12,
      forunsParticipando: 5,
      eventosInscritos: 2,
      favoritos: [
        { 
          id: 1,
          nome: 'Dom Casmurro', 
          autor: 'Machado de Assis',
          sinopse: 'Romance de Machado de Assis sobre ciúme e traição',
          genero: 'Literatura Brasileira',
          dataLancamento: '1899-12-20',
          dataAdicionado: '2023-02-10'
        },
        { 
          id: 2,
          nome: 'Memórias Póstumas de Brás Cubas', 
          autor: 'Machado de Assis',
          sinopse: 'Narrativa irônica e satírica sobre a vida de Brás Cubas',
          genero: 'Literatura Brasileira',
          dataLancamento: '1881-03-15',
          dataAdicionado: '2023-03-05'
        },
        { 
          id: 3,
          nome: 'O Pequeno Príncipe', 
          autor: 'Antoine de Saint-Exupéry',
          sinopse: 'Fábula poética sobre amizade e humanidade',
          genero: 'Literatura Infantil',
          dataLancamento: '1943-04-06',
          dataAdicionado: '2023-01-20'
        },
        { 
          id: 4,
          nome: 'A Hora da Estrela', 
          autor: 'Clarice Lispector',
          sinopse: 'Romance sobre Macabéa, uma jovem nordestina no Rio de Janeiro',
          genero: 'Literatura Brasileira',
          dataLancamento: '1977-10-26',
          dataAdicionado: '2023-04-15'
        },
        { 
          id: 5,
          nome: 'Capitães da Areia', 
          autor: 'Jorge Amado',
          sinopse: 'História de um grupo de meninos de rua em Salvador',
          genero: 'Literatura Brasileira',
          dataLancamento: '1937-11-01',
          dataAdicionado: '2023-05-22'
        },
        { 
          id: 6,
          nome: 'O Cortiço', 
          autor: 'Aluísio Azevedo',
          sinopse: 'Romance naturalista sobre a vida em um cortiço carioca',
          genero: 'Literatura Brasileira',
          dataLancamento: '1890-08-15',
          dataAdicionado: '2023-06-10'
        }
      ],
      convitesEventos: [
        {
          id: 1,
          evento: 'Encontro de Leitores 2025',
          dataEvento: '2025-12-15',
          informacoes: 'Convite exclusivo para membros Premium. Inclui acesso prioritário e área VIP.',
          status: 'Enviado'
        },
        {
          id: 2,
          evento: 'Noite de Autógrafos',
          dataEvento: '2026-04-20',
          informacoes: 'Convite para sessão de autógrafos com autores locais.',
          status: 'Enviado'
        }
      ],
      cupons: [
        {
          id: 1,
          desconto: 15,
          dataValidade: '2024-12-31',
          status: 'Ativo'
        },
        {
          id: 2,
          desconto: 10,
          dataValidade: '2024-06-30',
          status: 'Ativo'
        }
      ]
    };
  });

  useEffect(() => {
    localStorage.setItem('alivraria_user', JSON.stringify(user));
  }, [user]);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('alivraria_user', JSON.stringify(userData));
  };

  const updateUser = (updatedData) => {
    const updatedUser = { ...user, ...updatedData };
    setUser(updatedUser);
    localStorage.setItem('alivraria_user', JSON.stringify(updatedUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('alivraria_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, updateUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

