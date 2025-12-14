import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Perfil.css';

const Perfil = () => {
  const { user, updateUser } = useAuth();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [livrosFavoritosCount, setLivrosFavoritosCount] = useState(0);
  const [editData, setEditData] = useState({
    nome: user?.nome || '',
    sobre: user?.sobre || '',
    genero: user?.genero || '',
    email: user?.email || '',
    telefone: user?.telefone || '',
    interessesLiterarios: user?.interessesLiterarios || ''
  });
  const [imagePreview, setImagePreview] = useState(user?.imagemPerfil || null);

  // Atualizar contador de favoritos baseado no array real
  useEffect(() => {
    if (user?.favoritos) {
      const count = user.favoritos.length;
      setLivrosFavoritosCount(count);
    } else {
      setLivrosFavoritosCount(0);
    }
  }, [user?.favoritos]);

  const handleFavoritosClick = () => {
    navigate('/favoritos');
  };

  const handleForunsClick = () => {
    navigate('/foruns');
  };

  const handleEventosClick = () => {
    navigate('/eventos');
  };

  if (!user) {
    return (
      <div className="page">
        <div className="no-user">
          <h2>Nenhum usuário logado</h2>
          <p>Faça login ou cadastre-se para acessar seu perfil.</p>
        </div>
      </div>
    );
  }

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditData({
      nome: user.nome,
      sobre: user.sobre,
      genero: user.genero,
      email: user.email || '',
      telefone: user.telefone || '',
      interessesLiterarios: user.interessesLiterarios || ''
    });
    setImagePreview(user.imagemPerfil);
  };

  const handleSave = () => {
    updateUser({
      ...editData,
      imagemPerfil: imagePreview
    });
    setIsEditing(false);
    alert('Perfil atualizado com sucesso!');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Formatação do telefone (00) 00000-0000
    if (name === 'telefone') {
      const formatted = value.replace(/\D/g, '').replace(/(\d{2})(\d)/, '($1) $2').replace(/(\d{5})(\d)/, '$1-$2').slice(0, 15);
      setEditData(prev => ({
        ...prev,
        [name]: formatted
      }));
      return;
    }
    
    setEditData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      alert('Por favor, selecione uma imagem válida (JPG, PNG, GIF ou WEBP)');
      return;
    }

    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      alert('A imagem deve ter no máximo 5MB');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = () => {
    setImagePreview(null);
    const fileInput = document.getElementById('editImagemPerfil');
    if (fileInput) {
      fileInput.value = '';
    }
  };

  return (
    <div className="perfil-page">
      <div className="perfil-container">
        {/* Header do Perfil */}
        <div className="perfil-header">
          <div className="perfil-avatar-section">
            {isEditing ? (
              <div className="avatar-edit">
                {imagePreview ? (
                  <div className="avatar-preview-wrapper">
                    <img src={imagePreview} alt="Perfil" className="avatar-preview" />
                    <button
                      type="button"
                      onClick={handleRemoveImage}
                      className="btn-remove-avatar"
                      title="Remover foto"
                    >
                      ×
                    </button>
                  </div>
                ) : (
                  <div className="avatar-placeholder">
                    <span className="avatar-icon">👤</span>
                  </div>
                )}
                <label htmlFor="editImagemPerfil" className="btn-change-photo">
                  📷 Alterar Foto
                </label>
                <input
                  type="file"
                  id="editImagemPerfil"
                  accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
                  onChange={handleImageChange}
                  className="image-input-hidden"
                />
              </div>
            ) : (
              <div className="avatar-display">
                {user.imagemPerfil || imagePreview ? (
                  <img 
                    src={user.imagemPerfil || imagePreview} 
                    alt={user.nome} 
                    className="avatar-image"
                  />
                ) : (
                  <div className="avatar-default">
                    <span className="avatar-icon-large">👤</span>
                  </div>
                )}
              </div>
            )}
          </div>
          
          <div className="perfil-info-header">
            {isEditing ? (
              <input
                type="text"
                name="nome"
                value={editData.nome}
                onChange={handleChange}
                className="edit-name-input"
                placeholder="Nome completo"
              />
            ) : (
              <h1>{user.nome}</h1>
            )}
            <div className="perfil-badges">
              <span className="badge badge-premium">{user.assinatura || 'Básica'}</span>
              <span className="badge badge-member">Membro desde {new Date(user.dataCadastro).getFullYear()}</span>
            </div>
          </div>
        </div>

        {/* Estatísticas */}
        <div className="perfil-stats">
          <div 
            className="stat-item stat-item-clickable" 
            onClick={handleFavoritosClick}
            title="Ver meus livros favoritos"
          >
            <div className="stat-icon">📖</div>
            <div className="stat-content">
              <div className="stat-value">{livrosFavoritosCount}</div>
              <div className="stat-label">Livros Favoritos</div>
            </div>
            <div className="stat-arrow">→</div>
          </div>
          <div 
            className="stat-item stat-item-clickable" 
            onClick={handleForunsClick}
            title="Ver meus fóruns"
          >
            <div className="stat-icon">💬</div>
            <div className="stat-content">
              <div className="stat-value">{user.forunsParticipando || 0}</div>
              <div className="stat-label">Fóruns</div>
            </div>
            <div className="stat-arrow">→</div>
          </div>
          <div 
            className="stat-item stat-item-clickable" 
            onClick={handleEventosClick}
            title="Ver meus eventos"
          >
            <div className="stat-icon">🎉</div>
            <div className="stat-content">
              <div className="stat-value">{user.eventosInscritos || 0}</div>
              <div className="stat-label">Eventos</div>
            </div>
            <div className="stat-arrow">→</div>
          </div>
          <div className="stat-item">
            <div className="stat-icon">⏱️</div>
            <div className="stat-content">
              <div className="stat-value">{user.tempoCadastro || '1 ano'}</div>
              <div className="stat-label">No Alivraria</div>
            </div>
          </div>
        </div>

        {/* Informações Pessoais */}
        <div className="perfil-section">
          <div className="section-header">
            <h2>Informações Pessoais</h2>
            {!isEditing && (
              <button onClick={handleEdit} className="btn-edit">
                ✏️ Editar Perfil
              </button>
            )}
          </div>

          <div className="perfil-details">
            <div className="detail-item">
              <span className="detail-label">📝 Sobre</span>
              {isEditing ? (
                <textarea
                  name="sobre"
                  value={editData.sobre}
                  onChange={handleChange}
                  className="edit-textarea"
                  rows="4"
                  placeholder="Conte um pouco sobre você..."
                />
              ) : (
                <p className="detail-value">{user.sobre}</p>
              )}
            </div>

            <div className="detail-row">
              <div className="detail-item">
                <span className="detail-label">👤 Gênero</span>
                {isEditing ? (
                  <select
                    name="genero"
                    value={editData.genero}
                    onChange={handleChange}
                    className="edit-select"
                  >
                    <option value="Masculino">Masculino</option>
                    <option value="Feminino">Feminino</option>
                    <option value="Outro">Outro</option>
                    <option value="Prefiro não informar">Prefiro não informar</option>
                  </select>
                ) : (
                  <p className="detail-value">{user.genero}</p>
                )}
              </div>

              <div className="detail-item">
                <span className="detail-label">📅 Data de Cadastro</span>
                <p className="detail-value">{user.dataCadastro}</p>
              </div>
            </div>

            <div className="detail-row">
              <div className="detail-item">
                <span className="detail-label">✉️ E-mail</span>
                {isEditing ? (
                  <input
                    type="email"
                    name="email"
                    value={editData.email}
                    onChange={handleChange}
                    className="edit-input"
                    placeholder="seu@email.com"
                  />
                ) : (
                  <p className="detail-value">{user.email || 'Não informado'}</p>
                )}
              </div>

              <div className="detail-item">
                <span className="detail-label">📞 Telefone</span>
                {isEditing ? (
                  <input
                    type="tel"
                    name="telefone"
                    value={editData.telefone}
                    onChange={handleChange}
                    className="edit-input"
                    placeholder="(00) 00000-0000"
                  />
                ) : (
                  <p className="detail-value">{user.telefone || 'Não informado'}</p>
                )}
              </div>
            </div>

            <div className="detail-item">
              <span className="detail-label">📚 Interesses Literários</span>
              {isEditing ? (
                <textarea
                  name="interessesLiterarios"
                  value={editData.interessesLiterarios}
                  onChange={handleChange}
                  className="edit-textarea"
                  rows="3"
                  placeholder="Ex: Literatura Brasileira, Ficção Científica, Poesia, Romance..."
                />
              ) : (
                <p className="detail-value">{user.interessesLiterarios || 'Não informado'}</p>
              )}
            </div>
          </div>

          {isEditing && (
            <div className="edit-actions">
              <button onClick={handleCancel} className="btn-cancel">
                Cancelar
              </button>
              <button onClick={handleSave} className="btn-save">
                Salvar Alterações
              </button>
            </div>
          )}
        </div>

        {/* Convites e Cupons */}
        <div className="perfil-section-grid">
          {/* Convites de Eventos */}
          <div className="perfil-section perfil-section-small">
            <div className="section-header">
              <h2>✉️ Meus Convites</h2>
            </div>
            <div className="convites-list">
              {user.convitesEventos && user.convitesEventos.length > 0 ? (
                user.convitesEventos.map((convite) => (
                  <div key={convite.id} className="convite-item">
                    <div className="convite-icon">✉️</div>
                    <div className="convite-info">
                      <h3>{convite.evento}</h3>
                      <div className="convite-meta">
                        <span className={`badge ${convite.status === 'Enviado' ? 'badge-success' : 'badge-warning'}`}>
                          {convite.status}
                        </span>
                        <span className="convite-data">📅 {convite.dataEvento}</span>
                      </div>
                      <p className="convite-desc">{convite.informacoes}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="empty-state">
                  <span className="empty-icon">✉️</span>
                  <p>Você ainda não possui convites de eventos.</p>
                </div>
              )}
            </div>
          </div>

          {/* Cupons */}
          <div className="perfil-section perfil-section-small">
            <div className="section-header">
              <h2>🎫 Meus Cupons</h2>
            </div>
            <div className="cupons-list">
              {user.cupons && user.cupons.length > 0 ? (
                user.cupons.map((cupom) => (
                  <div key={cupom.id} className="cupom-item">
                    <div className="cupom-icon">🎫</div>
                    <div className="cupom-info">
                      <h3>Cupom #{cupom.id}</h3>
                      <div className="cupom-meta">
                        <span className={`badge ${cupom.status === 'Ativo' ? 'badge-success' : 'badge-danger'}`}>
                          {cupom.status}
                        </span>
                        <span className="cupom-desconto">💰 {cupom.desconto}% OFF</span>
                      </div>
                      <p className="cupom-desc">
                        Válido até {new Date(cupom.dataValidade).toLocaleDateString('pt-BR')}
                      </p>
                    </div>
                    {cupom.status === 'Ativo' && (
                      <button className="btn-copiar-cupom" onClick={() => {
                        navigator.clipboard.writeText(`CUPOM${cupom.id}`);
                        alert('Código do cupom copiado!');
                      }}>
                        📋 Copiar
                      </button>
                    )}
                  </div>
                ))
              ) : (
                <div className="empty-state">
                  <span className="empty-icon">🎫</span>
                  <p>Você ainda não possui cupons disponíveis.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Perfil;

