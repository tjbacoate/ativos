/*
 * Base mensal do relatório.
 * Para adicionar uma competência, duplique o bloco "2026-08", altere a chave
 * e substitua os dados com base nos três arquivos mensais.
 */
window.RELATORIOS_ATIVOS = {
  "2026-08": {
    competencia: "Agosto de 2026",
    atualizadoEm: "11/09/2026",
    atualizadoPor: "Kamylle Assad",
    estoque: {
      total: 6488,
      itens: [
        { nome: "Microcomputador", quantidade: 2419, modelos: { "Daten DC5A-U": 2365, "Daten DC4D-U": 49, "Daten DC3E-S": 5 } },
        { nome: "Monitor", quantidade: 1614, modelos: { "AOC": 1614 } },
        { nome: "Scanner", quantidade: 811, modelos: { "Canon DR-S150": 464, "Canon DR-C230": 347 } },
        { nome: "Chip", quantidade: 545, modelos: { "Vivo Voz": 485, "Vivo Dados": 60 } },
        { nome: "Celular", quantidade: 469, modelos: { "Motorola": 462, "iPhone": 7, "Samsung": 0 } },
        { nome: "Webcam", quantidade: 432, modelos: { "3Atech": 432 } },
        { nome: "Modem", quantidade: 124, modelos: { "Vivo": 124 } },
        { nome: "Notebook", quantidade: 71, modelos: { "Lenovo": 63, "Daten": 8 } },
        { nome: "Roteador", quantidade: 3, modelos: { "Vivo": 3 } },
        { nome: "Tablet", quantidade: 0, modelos: { "Samsung": 0 } }
      ]
    },
    garantias: {
      total: 150,
      fornecedores: { "Daten": 149, "AOC": 1 },
      status: [
        { nome: "Dentro do prazo", quantidade: 104, cor: "#24a36a" },
        { nome: "Em andamento", quantidade: 11, cor: "#f29d38" },
        { nome: "Fora do prazo", quantidade: 35, cor: "#dc5960" }
      ],
      falhasConsolidadas: [
        { nome: "Falha no SSD", quantidade: 28 },
        { nome: "Superaquecimento", quantidade: 21 },
        { nome: "Travamento", quantidade: 18 },
        { nome: "Não liga", quantidade: 16 },
        { nome: "Tela azul", quantidade: 12 }
      ],
      observacao: "Falhas equivalentes e variações de grafia foram agrupadas para leitura gerencial."
    },
    atendimentos: {
      total: 358,
      comarcas: {
        "Alagoinhas": 1, "Amargosa": 3, "Amélia Rodrigues": 4, "Antas": 1, "Barreiras": 4,
        "Bom Jesus da Lapa": 2, "Caetité": 1, "Camaçari": 4, "Camamu": 6, "Candeias": 3,
        "Capim Grosso": 1, "Caravelas": 1, "Casa Nova": 1, "Cipó": 1, "Conceição do Coité": 2,
        "Coração de Maria": 1, "Encruzilhada": 1, "Euclides da Cunha": 1, "Eunápolis": 1,
        "Feira de Santana": 1, "Gandu": 1, "Gentio do Ouro": 1, "Guaratinga": 1, "Ilhéus": 3,
        "Ipiaú": 1, "Ipirá": 1, "Irará": 3, "Itabuna": 2, "Itacaré": 1, "Itamaraju": 1,
        "Itapetinga": 1, "Itiúba": 12, "Itororó": 2, "Ituberá": 10, "Jequié": 3,
        "Jeremoabo": 4, "João Dourado": 3, "Juazeiro": 3, "Laje": 1, "Lauro de Freitas": 13,
        "Macaúbas": 3, "Mata de São João": 13, "Nazaré": 4, "Nova Viçosa": 3, "Olindina": 1,
        "Oliveira dos Brejinhos": 1, "Paramirim": 2, "Paulo Afonso": 1, "Pilão Arcado": 1,
        "Pindobaçu": 4, "Poções": 2, "Porto Seguro": 1, "Riachão do Jacuípe": 1,
        "Ribeira do Pombal": 3, "Rio Real": 4, "Salvador": 138, "Santa Bárbara": 2,
        "Santa Rita de Cássia": 13, "Santana": 2, "Santo Antônio de Jesus": 1,
        "São Francisco do Conde": 4, "São Gonçalo dos Campos": 1, "Serra Dourada": 19,
        "Serrinha": 5, "Simões Filho": 6, "Teixeira de Freitas": 3, "Valença": 4,
        "Vitória da Conquista": 9
      }
    }
  }
};
