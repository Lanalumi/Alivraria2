import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Layout.css';

const Layout = ({ children }) => {
  const location = useLocation();
  const { user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const isActive = (path) => location.pathname === path;
  const isAdmin = user?.role === 'admin';

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="layout">
      {/* Sidebar */}
      <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <Link to="/" className="sidebar-logo" onClick={() => setSidebarOpen(false)}>
            📚 Alivraria
          </Link>
          <button className="sidebar-close" onClick={toggleSidebar}>
            ×
          </button>
        </div>
        
        <nav className="sidebar-nav">
          <Link 
            to="/" 
            className={`nav-link ${isActive('/') ? 'active' : ''}`}
            onClick={() => setSidebarOpen(false)}
          >
            <span className="nav-icon">🏠</span>
            <span className="nav-text">Home</span>
          </Link>
          <Link 
            to="/perfil" 
            className={`nav-link ${isActive('/perfil') ? 'active' : ''}`}
            onClick={() => setSidebarOpen(false)}
          >
            <span className="nav-icon">👤</span>
            <span className="nav-text">Meu Perfil</span>
          </Link>
          <Link 
            to="/foruns" 
            className={`nav-link ${isActive('/foruns') ? 'active' : ''}`}
            onClick={() => setSidebarOpen(false)}
          >
            <span className="nav-icon">💬</span>
            <span className="nav-text">Fóruns</span>
          </Link>
          <Link 
            to="/forum-exclusivo" 
            className={`nav-link ${isActive('/forum-exclusivo') ? 'active' : ''}`}
            onClick={() => setSidebarOpen(false)}
          >
            <span className="nav-icon">⭐</span>
            <span className="nav-text">Fóruns Exclusivos</span>
          </Link>
          <Link 
            to="/livros" 
            className={`nav-link ${isActive('/livros') ? 'active' : ''}`}
            onClick={() => setSidebarOpen(false)}
          >
            <span className="nav-icon">📖</span>
            <span className="nav-text">Livros</span>
          </Link>
          <Link 
            to="/eventos" 
            className={`nav-link ${isActive('/eventos') ? 'active' : ''}`}
            onClick={() => setSidebarOpen(false)}
          >
            <span className="nav-icon">🎉</span>
            <span className="nav-text">Eventos</span>
          </Link>
          <Link 
            to="/assinaturas" 
            className={`nav-link ${isActive('/assinaturas') ? 'active' : ''}`}
            onClick={() => setSidebarOpen(false)}
          >
            <span className="nav-icon">💳</span>
            <span className="nav-text">Assinaturas</span>
          </Link>
          <Link 
            to="/favoritos" 
            className={`nav-link ${isActive('/favoritos') ? 'active' : ''}`}
            onClick={() => setSidebarOpen(false)}
          >
            <span className="nav-icon">❤️</span>
            <span className="nav-text">Favoritos</span>
          </Link>
          {isAdmin && (
            <Link 
              to="/cupons" 
              className={`nav-link ${isActive('/cupons') ? 'active' : ''}`}
              onClick={() => setSidebarOpen(false)}
            >
              <span className="nav-icon">🎫</span>
              <span className="nav-text">Cupons</span>
            </Link>
          )}
          {isAdmin && (
            <Link 
              to="/convites-evento" 
              className={`nav-link ${isActive('/convites-evento') ? 'active' : ''}`}
              onClick={() => setSidebarOpen(false)}
            >
              <span className="nav-icon">✉️</span>
              <span className="nav-text">Convites</span>
            </Link>
          )}
          <Link 
            to="/cadastro" 
            className={`nav-link ${isActive('/cadastro') ? 'active' : ''}`}
            onClick={() => setSidebarOpen(false)}
          >
            <span className="nav-icon">📝</span>
            <span className="nav-text">Cadastro</span>
          </Link>
        </nav>
      </aside>

      {/* Overlay para mobile */}
      {sidebarOpen && (
        <div className="sidebar-overlay" onClick={toggleSidebar}></div>
      )}

      {/* Conteúdo Principal */}
      <div className="main-wrapper">
        <button className="sidebar-toggle" onClick={toggleSidebar}>
          ☰
        </button>
        <main className="main-content">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;

