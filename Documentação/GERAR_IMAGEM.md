# Como Gerar a Imagem do Diagrama de Classes UML

O diagrama de classes UML foi atualizado baseado no diagrama ER. Para gerar a imagem PNG, você tem as seguintes opções:

## Opção 1: Usar o arquivo HTML (Recomendado)

1. Abra o arquivo `diagrama_classes_uml.html` no seu navegador
2. Use a ferramenta de captura de tela do Windows (Win + Shift + S)
3. Ou use a ferramenta de impressão do navegador (Ctrl + P) e salve como PDF
4. Ou use uma extensão do navegador para capturar a página completa

## Opção 2: Usar Mermaid Live Editor

1. Acesse https://mermaid.live/
2. Abra o arquivo `diagrama_classes_uml.mmd`
3. Copie o conteúdo e cole no editor
4. Use o botão "Actions" > "Download PNG" para baixar a imagem

## Opção 3: Instalar mermaid-cli (se tiver Node.js)

Se você tiver Node.js instalado, pode usar:

```bash
npm install -g @mermaid-js/mermaid-cli
mmdc -i diagrama_classes_uml.mmd -o diagrama_classes_uml.png
```

## Opção 4: Usar Python com Graphviz (se tiver Python)

Se você tiver Python e Graphviz instalados:

```bash
python gerar_diagrama_uml.py
```

## Arquivos Disponíveis

- `diagrama_classes_uml.mmd` - Código fonte do diagrama em Mermaid
- `diagrama_classes_uml.html` - Visualização HTML do diagrama
- `gerar_diagrama_uml.py` - Script Python para gerar com Graphviz
- `gerar_imagem.js` - Script Node.js para gerar com mermaid-cli
