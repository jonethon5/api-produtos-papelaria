import getProdutos from "../db/produtos.mock.js";

async function todosOsProdutos() {
  const produtos = await getProdutos();
  return produtos;
}

async function produtosAtivos() {
  const produtos = await todosOsProdutos();
  return produtos.filter((produto) => produto.ativo);
}

async function criarProduto(q) {
  if (typeof q.nome !== "string" || q.nome.trim() === "") {
    throw new Error("O Nome deve ser uma string não vazia");
  }

  if (typeof q.categoria !== "string" || q.categoria.trim() === "") {
    throw new Error("A categoria deve ser uma string não vazia");
  }

  if (typeof q.preco !== "number" || q.preco < 0 || q.preco === null) {
    throw new Error(
      "O price não pode ser negativo e tem que ser um numero valido",
    );
  }

  if (
    typeof q.quantidade_estoque !== "number" ||
    q.quantidade_estoque < 0 ||
    q.quantidade_estoque === null
  ) {
    throw new Error(
      "O Estoque não pode ser negativo e tem que ser um numero valido",
    );
  }

  const produtos = await todosOsProdutos();

  const nomeJaExiste = produtos.some(
    (produto) =>
      produto.nome.trim().toLowerCase() === q.nome.trim().toLowerCase(),
  );

  if (nomeJaExiste) {
    throw new Error("Já existe um produto com esse nome");
  }

  const novoId = produtos.length
    ? Math.max(...produtos.map((p) => p.id)) + 1
    : 1;

  const novoProduto = {
    id: novoId,
    nome: q.nome.trim(),
    preco: q.preco,
    quantidade_estoque: q.quantidade_estoque,
    categoria: q.categoria.trim(),
    criado_em: new Date().toISOString(),
    atualizado_em: new Date().toISOString(),
    ativo: true,
  };

  produtos.push(novoProduto);

  return novoProduto;
}



async function buscarProdutoPorId(id) {
  const produtos = await todosOsProdutos();
  const produto = produtos.find((produto) => produto.id === id);
  if (produto) return produto;
  throw new Error("Produto não encontrado");
}

async function deletarProduto(id) {
  const produtos = await todosOsProdutos();

  const produto = produtos.find((produto) => produto.id === id);

  if (!produto) {
    throw new Error("Produto não encontrado");
  }

  produto.ativo = false;
  produto.atualizado_em = new Date().toISOString();

  return produto;
}

async function atualizarProduto(id, dadosAtualizados) {
  const produtos = await todosOsProdutos();

  const produto = produtos.find((produto) => produto.id === id);

  if (!produto) {
    throw new Error("Produto não encontrado");
  }

  const camposPermitidos = ["nome", "preco", "categoria", "quantidade_estoque"];

  for (const campo of camposPermitidos) {
    if (campo in dadosAtualizados) {
      produto[campo] = dadosAtualizados[campo];
    }
  }

  produto.atualizado_em = new Date().toISOString();

  return produto;
}

export {
  todosOsProdutos,
  criarProduto,
  buscarProdutoPorId,
  deletarProduto,
  atualizarProduto,
  produtosAtivos,
};
