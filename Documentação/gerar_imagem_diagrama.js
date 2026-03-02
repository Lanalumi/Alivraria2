/**
 * Script para gerar imagem PNG do diagrama de classes UML
 * Usa puppeteer para renderizar o Mermaid e capturar como imagem
 */
const fs = require("fs");
const path = require("path");

async function gerarImagem() {
  const mmdPath = path.join(__dirname, "diagrama_classes_uml.mmd");
  const outputPath = path.join(__dirname, "diagrama_classes_uml.png");

  if (!fs.existsSync(mmdPath)) {
    console.error("Arquivo Mermaid não encontrado:", mmdPath);
    process.exit(1);
  }

  const mermaidContent = fs.readFileSync(mmdPath, "utf8");

  // Criar HTML temporário com Mermaid
  const htmlContent = `<!DOCTYPE html>
<html lang="pt-BR">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Diagrama de Classes UML - Alivraria</title>
    <script type="module">
      import mermaid from "https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.esm.min.mjs";
      mermaid.initialize({ 
        startOnLoad: true, 
        theme: "default",
        flowchart: { useMaxWidth: true, htmlLabels: true }
      });
    </script>
    <style>
      body {
        margin: 0;
        padding: 20px;
        background-color: white;
        font-family: Arial, sans-serif;
      }
      .mermaid {
        display: flex;
        justify-content: center;
        align-items: center;
      }
    </style>
  </head>
  <body>
    <div class="mermaid">
${mermaidContent}
    </div>
  </body>
</html>`;

  // Verificar se puppeteer está disponível
  let puppeteer;
  try {
    puppeteer = require("puppeteer");
  } catch (e) {
    console.log("Puppeteer não está instalado.");
    console.log("Para instalar, execute: npm install puppeteer");
    console.log(
      "Ou use o arquivo HTML diretamente no navegador e capture a tela."
    );

    // Salvar HTML para uso manual
    const htmlPath = path.join(__dirname, "diagrama_classes_uml_temp.html");
    fs.writeFileSync(htmlPath, htmlContent, "utf8");
    console.log(`HTML temporário salvo em: ${htmlPath}`);
    console.log("Abra este arquivo no navegador e capture a tela.");
    return;
  }

  console.log("Iniciando navegador...");
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  const page = await browser.newPage();

  await page.setContent(htmlContent, { waitUntil: "networkidle0" });

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

gerarImagem().catch(console.error);
