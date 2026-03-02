# Script PowerShell para gerar diagrama de classes UML
# Tenta diferentes métodos para gerar a imagem

$ErrorActionPreference = "Continue"

Write-Host "Tentando gerar diagrama de classes UML..." -ForegroundColor Green

# Método 1: Tentar usar Python com Graphviz
Write-Host "`nMétodo 1: Tentando usar Python..." -ForegroundColor Yellow
try {
    $pythonCmd = Get-Command python -ErrorAction SilentlyContinue
    if ($pythonCmd) {
        python "Documentação\gerar_diagrama_uml.py"
        if ($LASTEXITCODE -eq 0) {
            Write-Host "Diagrama gerado com sucesso usando Python!" -ForegroundColor Green
            exit 0
        }
    }
} catch {
    Write-Host "Python não encontrado ou Graphviz não instalado." -ForegroundColor Red
}

# Método 2: Tentar usar Node.js com mermaid-cli
Write-Host "`nMétodo 2: Tentando usar mermaid-cli..." -ForegroundColor Yellow
try {
    $nodeCmd = Get-Command node -ErrorAction SilentlyContinue
    if ($nodeCmd) {
        $mmdcCmd = Get-Command mmdc -ErrorAction SilentlyContinue
        if ($mmdcCmd) {
            mmdc -i "Documentação\diagrama_classes_uml.mmd" -o "Documentação\diagrama_classes_uml.png"
            if ($LASTEXITCODE -eq 0) {
                Write-Host "Diagrama gerado com sucesso usando mermaid-cli!" -ForegroundColor Green
                exit 0
            }
        } else {
            Write-Host "mermaid-cli não encontrado. Instale com: npm install -g @mermaid-js/mermaid-cli" -ForegroundColor Yellow
        }
    }
} catch {
    Write-Host "Node.js não encontrado." -ForegroundColor Red
}

# Método 3: Abrir HTML no navegador
Write-Host "`nMétodo 3: Abrindo arquivo HTML no navegador..." -ForegroundColor Yellow
$htmlPath = "Documentação\diagrama_classes_uml.html"
if (Test-Path $htmlPath) {
    Start-Process $htmlPath
    Write-Host "Arquivo HTML aberto. Você pode capturar a tela ou usar a ferramenta de impressão do navegador para salvar como PDF/PNG." -ForegroundColor Green
    Write-Host "Ou use uma ferramenta online como https://mermaid.live/ para visualizar o diagrama." -ForegroundColor Green
} else {
    Write-Host "Arquivo HTML não encontrado." -ForegroundColor Red
}

Write-Host "`nInstruções para gerar a imagem:" -ForegroundColor Cyan
Write-Host "1. Instale Python e Graphviz, depois execute: python Documentação\gerar_diagrama_uml.py" -ForegroundColor White
Write-Host "2. Instale mermaid-cli: npm install -g @mermaid-js/mermaid-cli" -ForegroundColor White
Write-Host "   Depois execute: mmdc -i Documentação\diagrama_classes_uml.mmd -o Documentação\diagrama_classes_uml.png" -ForegroundColor White
Write-Host "3. Abra o arquivo HTML no navegador e capture a tela" -ForegroundColor White
Write-Host "4. Use https://mermaid.live/ para visualizar e exportar o diagrama" -ForegroundColor White
