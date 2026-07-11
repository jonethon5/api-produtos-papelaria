const produtos = [
  {
    id: 1,
    nome: "Caneta Esferográfica Azul",
    descricao: "Caneta esferográfica ponta média, tinta azul",
    preco: 2.5,
    quantidade_estoque: 150,
    categoria: "Escolar",
    ativo: true,
    criado_em: "2026-01-10T09:00:00.000Z",
    atualizado_em: "2026-01-10T09:00:00.000Z",
  },
  {
    id: 2,
    nome: "Caderno Universitário 200 folhas",
    descricao: "Caderno espiral capa dura, 10 matérias",
    preco: 24.9,
    quantidade_estoque: 40,
    categoria: "Escolar",
    ativo: true,
    criado_em: "2026-01-12T14:30:00.000Z",
    atualizado_em: "2026-01-12T14:30:00.000Z",
  },
  {
    id: 3,
    nome: "Grampeador Médio",
    descricao: "Grampeador de mesa, capacidade 20 folhas",
    preco: 18.0,
    quantidade_estoque: 12,
    categoria: "Escritório",
    ativo: true,
    criado_em: "2026-02-01T11:15:00.000Z",
    atualizado_em: "2026-02-01T11:15:00.000Z",
  },
  {
    id: 4,
    nome: "Post-it Amarelo 76x76mm",
    descricao: "Bloco de notas adesivas, 100 folhas",
    preco: 7.9,
    quantidade_estoque: 0,
    categoria: "Escritório",
    ativo: true,
    criado_em: "2026-02-05T08:45:00.000Z",
    atualizado_em: "2026-02-05T08:45:00.000Z",
  },
  {
    id: 5,
    nome: "Régua 30cm",
    descricao: "Régua de acrílico transparente",
    preco: 3.2,
    quantidade_estoque: 80,
    categoria: "Escolar",
    ativo: false,
    criado_em: "2026-01-20T10:00:00.000Z",
    atualizado_em: "2026-03-01T16:20:00.000Z",
  },
];

function getProdutos() {
  return produtos;
}

export default getProdutos;
