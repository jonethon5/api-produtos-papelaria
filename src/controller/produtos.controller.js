import {
  todosOsProdutos,
  criarProduto,
  buscarProdutoPorId,
  deletarProduto,
  atualizarProduto,
  produtosAtivos,
} from "../service/produtos.service.js";

// Middleware para validar o parâmetro "id" nas rotas que precisam de um id de livro
function validateIdParam(req, res, next) {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) {
    return res.status(400).json({ error: "ID inválido" });
  }
  req.produtoId = id; // Converte o id para número e armazena de volta em req.params
  return next();
}

async function listaProdutos(req, res) {
  try {
    const produtos = await produtosAtivos();
    res.status(200).json(produtos);
  } catch (error) {
    res.status(500).json({ message: "Server error occurred", error });
  }
}

async function adicionarProduto(req, res) {
  try {
    const novoProduto = await criarProduto(req.body);
    res.status(200).json(novoProduto);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Erro ao criar produto", error: error.message });
  }
}

async function buscarId(req, res) {
  try {
    const id = req.produtoId;
    const produto = await buscarProdutoPorId(id);
    return res.status(200).json(produto);
  } catch (error) {
    res
      .status(404)
      .json({ message: "Erro ao buscar produto", error: error.message });
  }
}

async function deletarProd(req, res) {
  try {
    const id = req.produtoId;
    const produto = await deletarProduto(id);
    return res.status(200).json(produto);
  } catch (error) {
    res
      .status(404)
      .json({ message: "Erro ao buscar produto", error: error.message });
  }
}

async function atualizarProd(req, res) {
  try {
    const id = req.produtoId;
    const produtoAtualizado = await atualizarProduto(id, req.body);
    return res.status(200).json(produtoAtualizado);
  } catch (error) {
    res
      .status(404)
      .json({ message: "Erro ao atualizar produto", error: error.message });
  }
}

export {
  listaProdutos,
  adicionarProduto,
  validateIdParam,
  buscarId,
  deletarProd,
  atualizarProd,
};
