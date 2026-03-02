/**
 * Script para gerar imagem PNG do diagrama de classes UML
 * Requer: npm install puppeteer
 */
const puppeteer = require("puppeteer");
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

  console.log("Iniciando navegador...");
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.setContent(htmlContent, { waitUntil: "networkidle0" });

  // Aguardar o Mermaid renderizar
  await page.waitForTimeout(3000);

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

// Verificar se puppeteer está instalado
try {
  require.resolve("puppeteer");
  gerarImagem().catch(console.error);
} catch (e) {
  console.log("Puppeteer não está instalado.");
  console.log("Para instalar, execute: npm install puppeteer");
  console.log(
    "Ou use o arquivo HTML diretamente no navegador e capture a tela."
  );
  console.log(
    "Ou use o script Python original se tiver Python e Graphviz instalados."
  );
}
