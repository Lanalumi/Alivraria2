import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import "./Page.css";
import "./Assinaturas.css";

const Assinaturas = () => {
  const { user } = useAuth();
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [dadosPagamento, setDadosPagamento] = useState({
    numeroCartao: "",
    nomeCartao: "",
    validade: "",
    cvv: "",
    cpf: "",
    cep: "",
    endereco: "",
    numero: "",
    complemento: "",
    cidade: "",
    estado: "",
  });

  const assinaturas = [
    {
      id: 1,
      nome: "Premium",
      descricao: "Acesso completo a todos os recursos e convites prioritários",
      preco: 49.9,
      forunsExclusivos: 8,
      cupons: 12,
    },
  ];

  // Histórico de pagamentos (em produção, viria de uma API)
  const historicoPagamentos = [
    {
      id: 1,
      data: "2024-01-15",
      valor: 49.9,
      status: "Pago",
      metodo: "Cartão de Crédito",
      assinatura: "Premium",
    },
    {
      id: 2,
      data: "2023-12-15",
      valor: 49.9,
      status: "Pago",
      metodo: "Cartão de Crédito",
      assinatura: "Premium",
    },
    {
      id: 3,
      data: "2023-11-15",
      valor: 49.9,
      status: "Pago",
      metodo: "Cartão de Crédito",
      assinatura: "Premium",
    },
  ];

  const proximoPagamento = {
    data: "2024-02-15",
    valor: 49.9,
    assinatura: "Premium",
  };

  const formatarData = (data) => {
    return new Date(data).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Formatação do número do cartão (adiciona espaços a cada 4 dígitos)
    if (name === "numeroCartao") {
      const formatted = value
        .replace(/\s/g, "")
        .replace(/(.{4})/g, "$1 ")
        .trim();
      setDadosPagamento({ ...dadosPagamento, [name]: formatted });
      return;
    }

    // Formatação da validade (MM/AA)
    if (name === "validade") {
      const formatted = value
        .replace(/\D/g, "")
        .replace(/(\d{2})(\d)/, "$1/$2")
        .slice(0, 5);
      setDadosPagamento({ ...dadosPagamento, [name]: formatted });
      return;
    }

    // Formatação do CPF (XXX.XXX.XXX-XX)
    if (name === "cpf") {
      const formatted = value
        .replace(/\D/g, "")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
      setDadosPagamento({ ...dadosPagamento, [name]: formatted });
      return;
    }

    // Formatação do CEP (XXXXX-XXX)
    if (name === "cep") {
      const formatted = value
        .replace(/\D/g, "")
        .replace(/(\d{5})(\d)/, "$1-$2")
        .slice(0, 9);
      setDadosPagamento({ ...dadosPagamento, [name]: formatted });
      return;
    }

    setDadosPagamento({ ...dadosPagamento, [name]: value });
  };

  const handleAssinar = () => {
    setMostrarFormulario(true);
  };

  const handleSubmitPagamento = (e) => {
    e.preventDefault();
    alert("Pagamento processado com sucesso! Assinatura ativada.");
    setMostrarFormulario(false);
    // Aqui você processaria o pagamento em produção
  };

  const handleCancelarFormulario = () => {
    setMostrarFormulario(false);
    setDadosPagamento({
      numeroCartao: "",
      nomeCartao: "",
      validade: "",
      cvv: "",
      cpf: "",
      cep: "",
      endereco: "",
      numero: "",
      complemento: "",
      cidade: "",
      estado: "",
    });
  };

  return (
    <div className="page">
      <div className="page-header">
        <h1>💳 Assinaturas</h1>
      </div>

      <div className="assinaturas-layout">
        {/* Coluna de Assinaturas */}
        <div className="assinaturas-coluna">
          <h2>Planos Disponíveis</h2>
          <div className="cards-grid">
            {assinaturas.map((assinatura) => (
              <div key={assinatura.id} className="card assinatura-card">
                <div className="card-header">
                  <h3>{assinatura.nome}</h3>
                  <div className="preco-box">
                    <span className="preco-valor">
                      R$ {assinatura.preco.toFixed(2)}
                    </span>
                    <span className="preco-periodo">/mês</span>
                  </div>
                </div>
                <div className="card-body">
                  <p className="card-text">{assinatura.descricao}</p>
                  <div className="card-info">
                    <div className="info-item">
                      <span className="info-label">⭐ Fóruns Exclusivos:</span>
                      <span>{assinatura.forunsExclusivos}</span>
                    </div>
                    <div className="info-item">
                      <span className="info-label">🎫 Cupons Disponíveis:</span>
                      <span>{assinatura.cupons}</span>
                    </div>
                  </div>
                </div>
                <div className="card-footer">
                  {user?.assinatura === assinatura.nome ? (
                    <>
                      <button className="btn-assinante">
                        ✓ Você é Assinante Premium
                      </button>
                      <button className="btn-secondary btn-cancelar">
                        Cancelar Assinatura
                      </button>
                    </>
                  ) : (
                    <button className="btn-secondary" onClick={handleAssinar}>
                      Assinar
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Formulário de Pagamento */}
          {mostrarFormulario && !user?.assinatura && (
            <div className="formulario-pagamento-box">
              <h2>💳 Dados de Pagamento</h2>
              <form
                onSubmit={handleSubmitPagamento}
                className="formulario-pagamento"
              >
                {/* Dados do Cartão */}
                <div className="form-section">
                  <h3>Dados do Cartão</h3>
                  <div className="form-group">
                    <label htmlFor="numeroCartao">Número do Cartão</label>
                    <input
                      type="text"
                      id="numeroCartao"
                      name="numeroCartao"
                      value={dadosPagamento.numeroCartao}
                      onChange={handleInputChange}
                      placeholder="0000 0000 0000 0000"
                      maxLength="19"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="nomeCartao">Nome no Cartão</label>
                    <input
                      type="text"
                      id="nomeCartao"
                      name="nomeCartao"
                      value={dadosPagamento.nomeCartao}
                      onChange={handleInputChange}
                      placeholder="NOME COMO ESTÁ NO CARTÃO"
                      required
                    />
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="validade">Validade</label>
                      <input
                        type="text"
                        id="validade"
                        name="validade"
                        value={dadosPagamento.validade}
                        onChange={handleInputChange}
                        placeholder="MM/AA"
                        maxLength="5"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="cvv">CVV</label>
                      <input
                        type="text"
                        id="cvv"
                        name="cvv"
                        value={dadosPagamento.cvv}
                        onChange={handleInputChange}
                        placeholder="123"
                        maxLength="4"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Dados Pessoais */}
                <div className="form-section">
                  <h3>Dados Pessoais</h3>
                  <div className="form-group">
                    <label htmlFor="cpf">CPF</label>
                    <input
                      type="text"
                      id="cpf"
                      name="cpf"
                      value={dadosPagamento.cpf}
                      onChange={handleInputChange}
                      placeholder="000.000.000-00"
                      maxLength="14"
                      required
                    />
                  </div>
                </div>

                {/* Endereço de Cobrança */}
                <div className="form-section">
                  <h3>Endereço de Cobrança</h3>
                  <div className="form-group">
                    <label htmlFor="cep">CEP</label>
                    <input
                      type="text"
                      id="cep"
                      name="cep"
                      value={dadosPagamento.cep}
                      onChange={handleInputChange}
                      placeholder="00000-000"
                      maxLength="9"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="endereco">Endereço</label>
                    <input
                      type="text"
                      id="endereco"
                      name="endereco"
                      value={dadosPagamento.endereco}
                      onChange={handleInputChange}
                      placeholder="Rua, Avenida, etc."
                      required
                    />
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="numero">Número</label>
                      <input
                        type="text"
                        id="numero"
                        name="numero"
                        value={dadosPagamento.numero}
                        onChange={handleInputChange}
                        placeholder="123"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="complemento">Complemento</label>
                      <input
                        type="text"
                        id="complemento"
                        name="complemento"
                        value={dadosPagamento.complemento}
                        onChange={handleInputChange}
                        placeholder="Apto, Bloco, etc."
                      />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="cidade">Cidade</label>
                      <input
                        type="text"
                        id="cidade"
                        name="cidade"
                        value={dadosPagamento.cidade}
                        onChange={handleInputChange}
                        placeholder="São Paulo"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="estado">Estado</label>
                      <input
                        type="text"
                        id="estado"
                        name="estado"
                        value={dadosPagamento.estado}
                        onChange={handleInputChange}
                        placeholder="SP"
                        maxLength="2"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Botões */}
                <div className="form-actions">
                  <button
                    type="button"
                    onClick={handleCancelarFormulario}
                    className="btn-secondary"
                  >
                    Cancelar
                  </button>
                  <button type="submit" className="btn-primary">
                    Confirmar Pagamento
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>

        {/* Coluna de Histórico */}
        <div className="historico-coluna">
          <div className="historico-box">
            <h2>📊 Histórico de Pagamentos</h2>

            {/* Próximo Pagamento */}
            <div className="proximo-pagamento">
              <h3>Próximo Pagamento</h3>
              <div className="pagamento-item proximo">
                <div className="pagamento-info">
                  <div className="pagamento-data">
                    <span className="pagamento-icon">📅</span>
                    <span>{formatarData(proximoPagamento.data)}</span>
                  </div>
                  <div className="pagamento-valor">
                    <span className="valor-label">Valor:</span>
                    <span className="valor-numero">
                      R$ {proximoPagamento.valor.toFixed(2)}
                    </span>
                  </div>
                  <div className="pagamento-assinatura">
                    <span className="badge badge-premium">
                      {proximoPagamento.assinatura}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Histórico */}
            <div className="historico-pagamentos">
              <h3>Últimos Pagamentos</h3>
              <div className="pagamentos-list">
                {historicoPagamentos.map((pagamento) => (
                  <div key={pagamento.id} className="pagamento-item">
                    <div className="pagamento-info">
                      <div className="pagamento-data">
                        <span className="pagamento-icon">✅</span>
                        <span>{formatarData(pagamento.data)}</span>
                      </div>
                      <div className="pagamento-valor">
                        <span className="valor-label">Valor:</span>
                        <span className="valor-numero">
                          R$ {pagamento.valor.toFixed(2)}
                        </span>
                      </div>
                      <div className="pagamento-detalhes">
                        <span className="badge badge-success">
                          {pagamento.status}
                        </span>
                        <span className="pagamento-metodo">
                          {pagamento.metodo}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Assinaturas;
