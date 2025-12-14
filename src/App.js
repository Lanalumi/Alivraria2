import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Perfil from './pages/Perfil';
import Foruns from './pages/Foruns';
import ForumDetalhes from './pages/ForumDetalhes';
import ForumExclusivo from './pages/ForumExclusivo';
import ForumExclusivoDetalhes from './pages/ForumExclusivoDetalhes';
import Livros from './pages/Livros';
import LivroDetalhes from './pages/LivroDetalhes';
import Autores from './pages/Autores';
import AutorDetalhes from './pages/AutorDetalhes';
import Eventos from './pages/Eventos';
import EventoDetalhes from './pages/EventoDetalhes';
import Assinaturas from './pages/Assinaturas';
import Favoritos from './pages/Favoritos';
import Cupons from './pages/Cupons';
import ConvitesEvento from './pages/ConvitesEvento';
import Cadastro from './pages/Cadastro';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/perfil" element={<Perfil />} />
          <Route path="/foruns" element={<Foruns />} />
          <Route path="/foruns/:id" element={<ForumDetalhes />} />
          <Route path="/forum-exclusivo" element={<ForumExclusivo />} />
          <Route path="/forum-exclusivo/:id" element={<ForumExclusivoDetalhes />} />
          <Route path="/livros" element={<Livros />} />
          <Route path="/livros/:id" element={<LivroDetalhes />} />
          <Route path="/autores/:id" element={<AutorDetalhes />} />
          <Route path="/eventos" element={<Eventos />} />
          <Route path="/eventos/:id" element={<EventoDetalhes />} />
          <Route path="/assinaturas" element={<Assinaturas />} />
          <Route path="/favoritos" element={<Favoritos />} />
          <Route path="/cupons" element={<Cupons />} />
          <Route path="/convites-evento" element={<ConvitesEvento />} />
          <Route path="/cadastro" element={<Cadastro />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;

