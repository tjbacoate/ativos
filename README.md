# Relatório Consolidado do Setor de Ativos

Modelo mensal, responsivo e pronto para GitHub Pages, criado a partir do padrão visual desenvolvido por Rose para os relatórios de estoque, garantia de fornecedores e atendimento de chamados de ativos.

## Estrutura

- `index.html`: estrutura do relatório.
- `css/style.css`: identidade visual, responsividade e impressão.
- `js/app.js`: seletor mensal, filtros, gráficos e validações.
- `dados/relatorios.js`: base mensal usada pelo painel.
- `imagens/solutis_logo.png`: marca da Solutis.

## Como visualizar

Abra `index.html` no navegador. Não é necessário instalar dependências ou executar um servidor.

## Como publicar no GitHub Pages

1. Envie esta pasta para um repositório no GitHub.
2. No repositório, acesse **Settings > Pages**.
3. Em **Build and deployment**, selecione **Deploy from a branch**.
4. Escolha a branch `main` e a pasta `/ (root)`.

## Como adicionar um novo mês

No arquivo `dados/relatorios.js`, copie o bloco da competência existente e altere:

1. A chave no formato `AAAA-MM`.
2. A descrição da competência e a data de atualização.
3. Os itens e totais de estoque.
4. Os fornecedores, status e falhas consolidadas.
5. As comarcas e quantidades de atendimentos.

O seletor é preenchido automaticamente e exibe primeiro a competência mais recente. O sistema também confere se os totais informados correspondem à soma dos dados detalhados.

## Impressão

Use o botão **Imprimir / PDF**. O modo de impressão elimina os controles interativos e reorganiza o conteúdo para papel A4.

## Observações sobre agosto de 2026

- O total de celulares foi conciliado como 469: 462 Motorola, 7 iPhones e 0 Samsung.
- O status de garantia considera 104 chamados dentro do prazo: 103 da Daten e 1 da AOC.
- Variações de grafia das principais falhas foram agrupadas para leitura gerencial.
