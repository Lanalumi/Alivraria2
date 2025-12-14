import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Cadastro.css';

const Cadastro = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    nome: '',
    sobre: '',
    genero: '',
    evento: '',
    dataCadastro: new Date().toISOString().split('T')[0]
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  const eventos = [
    { id: 1, nome: 'Encontro de Leitores 2024' },
    { id: 2, nome: 'Noite de Autógrafos' },
    { id: 3, nome: 'Workshop de Escrita Criativa' },
    { id: 4, nome: 'Nenhum' }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Limpar erro do campo quando o usuário começar a digitar
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    
    if (!file) {
      return;
    }

    // Validar tipo de arquivo
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      setErrors(prev => ({
        ...prev,
        imagemPerfil: 'Por favor, selecione uma imagem válida (JPG, PNG, GIF ou WEBP)'
      }));
      return;
    }

    // Validar tamanho (máximo 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB em bytes
    if (file.size > maxSize) {
      setErrors(prev => ({
        ...prev,
        imagemPerfil: 'A imagem deve ter no máximo 5MB'
      }));
      return;
    }

    // Limpar erro se houver
    if (errors.imagemPerfil) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors.imagemPerfil;
        return newErrors;
      });
    }

    // Criar preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
      setImageFile(file);
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = () => {
    setImagePreview(null);
    setImageFile(null);
    // Limpar o input file
    const fileInput = document.getElementById('imagemPerfil');
    if (fileInput) {
      fileInput.value = '';
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.nome.trim()) {
      newErrors.nome = 'Nome é obrigatório';
    } else if (formData.nome.trim().length < 3) {
      newErrors.nome = 'Nome deve ter pelo menos 3 caracteres';
    }

    if (!formData.sobre.trim()) {
      newErrors.sobre = 'Sobre é obrigatório';
    } else if (formData.sobre.trim().length < 10) {
      newErrors.sobre = 'Sobre deve ter pelo menos 10 caracteres';
    }

    if (!formData.genero) {
      newErrors.genero = 'Gênero é obrigatório';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validate()) {
      return;
    }

    setIsSubmitting(true);

    // Simular envio de dados
    setTimeout(() => {
      const dadosCompletos = {
        id: Date.now(), // ID temporário
        ...formData,
        imagemPerfil: imagePreview,
        tempoCadastro: 'Novo',
        assinatura: 'Básica',
        livrosFavoritos: 0,
        forunsParticipando: 0,
        eventosInscritos: 0,
        favoritos: []
      };
      
      // Fazer login com o novo usuário
      login(dadosCompletos);
      
      console.log('Dados do cadastro:', dadosCompletos);
      alert('Usuário cadastrado com sucesso! Você foi logado automaticamente.');
      setIsSubmitting(false);
      
      // Limpar formulário
      setFormData({
        nome: '',
        sobre: '',
        genero: '',
        evento: '',
        dataCadastro: new Date().toISOString().split('T')[0]
      });
      setImagePreview(null);
      setImageFile(null);
      const fileInput = document.getElementById('imagemPerfil');
      if (fileInput) {
        fileInput.value = '';
      }
      
      // Redirecionar para o perfil
      navigate('/perfil');
    }, 1000);
  };

  return (
    <div className="cadastro-page">
      <div className="cadastro-container">
        <div className="cadastro-header">
          <h1>📝 Cadastro de Usuário</h1>
          <p>Preencha os dados abaixo para criar uma nova conta</p>
        </div>

        <form onSubmit={handleSubmit} className="cadastro-form">
          <div className="form-group form-group-image">
            <label htmlFor="imagemPerfil">
              Foto de Perfil
            </label>
            <div className="image-upload-container">
              {imagePreview ? (
                <div className="image-preview-wrapper">
                  <img src={imagePreview} alt="Preview" className="image-preview" />
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="btn-remove-image"
                    title="Remover imagem"
                  >
                    ×
                  </button>
                </div>
              ) : (
                <label htmlFor="imagemPerfil" className="image-upload-label">
                  <div className="image-upload-placeholder">
                    <span className="upload-icon">📷</span>
                    <span className="upload-text">Clique para adicionar uma foto</span>
                    <span className="upload-hint">JPG, PNG, GIF ou WEBP (máx. 5MB)</span>
                  </div>
                </label>
              )}
              <input
                type="file"
                id="imagemPerfil"
                name="imagemPerfil"
                accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
                onChange={handleImageChange}
                className="image-input"
              />
            </div>
            {errors.imagemPerfil && <span className="error-message">{errors.imagemPerfil}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="nome">
              Nome Completo <span className="required">*</span>
            </label>
            <input
              type="text"
              id="nome"
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              className={errors.nome ? 'input-error' : ''}
              placeholder="Digite seu nome completo"
            />
            {errors.nome && <span className="error-message">{errors.nome}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="sobre">
              Sobre <span className="required">*</span>
            </label>
            <textarea
              id="sobre"
              name="sobre"
              value={formData.sobre}
              onChange={handleChange}
              className={errors.sobre ? 'input-error' : ''}
              placeholder="Conte um pouco sobre você..."
              rows="4"
            />
            {errors.sobre && <span className="error-message">{errors.sobre}</span>}
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="genero">
                Gênero <span className="required">*</span>
              </label>
              <select
                id="genero"
                name="genero"
                value={formData.genero}
                onChange={handleChange}
                className={errors.genero ? 'input-error' : ''}
              >
                <option value="">Selecione um gênero</option>
                <option value="Masculino">Masculino</option>
                <option value="Feminino">Feminino</option>
                <option value="Outro">Outro</option>
                <option value="Prefiro não informar">Prefiro não informar</option>
              </select>
              {errors.genero && <span className="error-message">{errors.genero}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="evento">Evento</label>
              <select
                id="evento"
                name="evento"
                value={formData.evento}
                onChange={handleChange}
              >
                <option value="">Selecione um evento (opcional)</option>
                {eventos.map(evento => (
                  <option key={evento.id} value={evento.nome}>
                    {evento.nome}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="dataCadastro">Data de Cadastro</label>
            <input
              type="date"
              id="dataCadastro"
              name="dataCadastro"
              value={formData.dataCadastro}
              onChange={handleChange}
              disabled
              className="input-disabled"
            />
            <small className="form-hint">Data preenchida automaticamente</small>
          </div>

          <div className="form-actions">
            <button
              type="button"
              onClick={() => navigate('/usuarios')}
              className="btn-cancel"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="btn-submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Cadastrando...' : 'Cadastrar Usuário'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Cadastro;

