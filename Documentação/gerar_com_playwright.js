/**
 * Script alternativo para gerar imagem usando Playwright
 * Instale com: npm install playwright
 */
const { chromium } = require("playwright");
const fs = require("fs");
const path = require("path");

async function gerarImagem() {
  const htmlPath = path.join(__dirname, "diagrama_classes_uml.html");
  const outputPath = path.join(__dirname, "diagrama_classes_uml.png");

  if (!fs.existsSync(htmlPath)) {
    console.error("Arquivo HTML não encontrado:", htmlPath);
    process.exit(1);
  }

  const htmlContent = fs.readFileSync(htmlPath, "utf8");
  const fileUrl = `file://${htmlPath.replace(/\\/g, "/")}`;

  console.log("Iniciando navegador...");
  const browser = await chromium.launch();
  const page = await browser.newPage();

  await page.goto(fileUrl, { waitUntil: "networkidle" });

  // Aguardar o Mermaid renderizar
  await page.waitForTimeout(5000);

  // Capturar screenshot
  console.log("Gerando imagem...");
  await page.screenshot({
    path: outputPath,
    fullPage: true,
    type: "png",
  });

  await browser.close();
  console.log(`Imagem gerada com sucesso: ${outputPath}`);
}

// Verificar se playwright está instalado
try {
  require.resolve("playwright");
  gerarImagem().catch(console.error);
} catch (e) {
  console.log("Playwright não está instalado.");
  console.log("Para instalar, execute: npm install playwright");
  console.log(
    "Ou use o arquivo HTML diretamente no navegador e capture a tela."
  );
  console.log(
    "Ou use https://mermaid.live/ para visualizar e exportar o diagrama."
  );
}
