/**
 * Script para gerar diagrama de classes UML baseado no diagrama ER
 * Usa a biblioteca mermaid para gerar o diagrama
 */
const fs = require("fs");
const path = require("path");

// Criar o diagrama em formato Mermaid
const mermaidDiagram = `classDiagram
    class TipoForum {
        +int IdTipoForum [PK]
        +string Tipo
    }
    
    class Autor {
        +int IdAutor [PK]
        +string Nome
        +string Sobre
        +string Genero
    }
    
    class ForumExclusivo {
        +int IdForumExclusivo [PK]
        +string Titulo
        +string Descricao
        +string Genero
        +datetime DataCriacao
        +int IdAssinatura [FK]
        +int IdAutor [FK]
        +int IdTipoForum [FK]
    }
    
    class Forum {
        +int IdForum [PK]
        +string Nome
        +string Descricao
        +string Genero
        +string Obra
        +int IdTipoForum [FK]
    }
    
    class Assinatura {
        +int IdAssinatura [PK]
        +string Nome
        +string Descricao
    }
    
    class Cupom {
        +int IdCupom [PK]
        +decimal Desconto
        +datetime DataCriacao
        +datetime DataValidade
        +int IdAssinatura [FK]
    }
    
    class Evento {
        +int IdEvento [PK]
        +string Nome
        +string Descricao
        +date DataEvento
    }
    
    class UsuariosAssinantes {
        +int IdAssinatura [FK]
        +int IdUsuario [FK]
        +int TotalAssinantes
    }
    
    class ConviteEvento {
        +date DataEnvio
        +date DataEvento
        +string Informacoes
        +int IdEvento [FK]
        +int IdAssinatura [FK]
    }
    
    class Usuario {
        +int IdUsuario [PK]
        +string Nome
        +string Sobre
        +datetime DataCadastro
        +string TempoCadastro
        +int IdEvento [FK]
    }
    
    class ForumParticipantes {
        +int IdTipoForum [FK]
        +int IdUsuario [FK]
        +int IdForum [FK]
        +datetime DataEntrada
        +datetime UltimaInteracao
    }
    
    class ForumExclusivoParticipantes {
        +int IdTipoForum [FK]
        +int IdAssinatura [FK]
        +int IdForumExclusivo [FK]
        +datetime DataEntrada
        +datetime UltimaInteracao
    }
    
    class Favoritos {
        +int IdFavoritos [PK]
        +int IdUsuario [FK]
    }
    
    class Inscricao {
        +date DataInscricao
        +decimal ValorPago
        +int IdEvento [FK]
        +int IdUsuario [FK]
    }
    
    class Livro {
        +int IdLivro [PK]
        +string Nome
        +string Sinopse
        +date DataLancamento
        +string Genero
        +int IdAutor [FK]
        +int IdFavoritos [FK]
    }
    
    %% Relacionamentos
    TipoForum "1" --> "*" ForumExclusivo : classifica
    TipoForum "1" --> "*" Forum : classifica
    Autor "1" --> "*" ForumExclusivo : cria
    Autor "1" --> "*" Livro : cria
    Assinatura "1" --> "*" ForumExclusivo : habilita
    Assinatura "1" --> "*" UsuariosAssinantes : relaciona
    Assinatura "1" --> "*" Cupom : tem
    Assinatura "1" --> "*" ConviteEvento : oferece
    Assinatura "1" --> "*" ForumExclusivoParticipantes : permite
    Evento "1" --> "*" ConviteEvento : oferece
    Evento "1" --> "*" Inscricao : recebe
    Usuario "1" --> "*" Evento : escreve
    Usuario "1" --> "*" UsuariosAssinantes : relaciona
    Usuario "1" --> "*" ForumParticipantes : participa
    Usuario "1" --> "*" Favoritos : possui
    Usuario "1" --> "*" Inscricao : realiza
    Forum "1" --> "*" ForumParticipantes : participa
    ForumExclusivo "1" --> "*" ForumExclusivoParticipantes : tem
    Favoritos "1" --> "*" Livro : contem
    TipoForum "1" --> "*" ForumParticipantes : classifica
    TipoForum "1" --> "*" ForumExclusivoParticipantes : classifica
`;

// Salvar o arquivo Mermaid
const outputPath = path.join(__dirname, "diagrama_classes_uml.mmd");
fs.writeFileSync(outputPath, mermaidDiagram, "utf8");
console.log(`Diagrama Mermaid gerado com sucesso: ${outputPath}`);
console.log("Você pode visualizar este diagrama em: https://mermaid.live/");
console.log("Ou instale o mermaid-cli: npm install -g @mermaid-js/mermaid-cli");
console.log(
  "E execute: mmdc -i diagrama_classes_uml.mmd -o diagrama_classes_uml.png"
);
