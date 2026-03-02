/**
 * Script para gerar imagem PNG do diagrama de classes UML usando mermaid-cli
 */
const { execSync } = require("child_process");
const path = require("path");
const fs = require("fs");

// Usar __dirname que o Node.js resolve corretamente
const mmdPath = path.join(__dirname, "diagrama_classes_uml.mmd");
const outputPath = path.join(__dirname, "diagrama_classes_uml.png");

console.log("Diretório atual:", __dirname);
console.log("Verificando arquivo:", mmdPath);

if (!fs.existsSync(mmdPath)) {
  console.error("Arquivo Mermaid não encontrado:", mmdPath);
  process.exit(1);
}

console.log("Gerando imagem do diagrama...");
console.log("Arquivo de entrada:", mmdPath);
console.log("Arquivo de saída:", outputPath);

try {
  // Usar npx para executar mmdc, mudando para o diretório correto
  // Adicionar opções para evitar problemas com puppeteer
  const command = `npx --yes @mermaid-js/mermaid-cli -i diagrama_classes_uml.mmd -o diagrama_classes_uml.png -t default -b white -w 2400`;
  console.log("Executando:", command);
  console.log("No diretório:", __dirname);

  // Definir variáveis de ambiente para puppeteer
  process.env.PUPPETEER_SKIP_CHROMIUM_DOWNLOAD = "false";

  execSync(command, {
    stdio: "inherit",
    cwd: __dirname,
    shell: true,
    env: { ...process.env, PUPPETEER_SKIP_CHROMIUM_DOWNLOAD: "false" },
  });
  console.log("\nImagem gerada com sucesso:", outputPath);
} catch (error) {
  console.error("Erro ao gerar imagem:", error.message);
  console.log("\nTentando método alternativo...");

  // Método alternativo: usar o HTML e instruir o usuário
  console.log("Como alternativa, você pode:");
  console.log("1. Abrir o arquivo diagrama_classes_uml.html no navegador");
  console.log(
    "2. Capturar a tela ou usar a ferramenta de impressão do navegador"
  );
  console.log("3. Ou usar https://mermaid.live/ para visualizar e exportar");

  process.exit(1);
}
