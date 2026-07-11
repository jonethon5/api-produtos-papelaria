import {
  listaProdutos,
  adicionarProduto,
  buscarId,
  validateIdParam,
  deletarProd,
  atualizarProd
} from "../controller/produtos.controller.js";

import express from "express";

const router = express.Router();

// Rotas para produtos
router.get("/produtos", listaProdutos);
router.post("/produtos", adicionarProduto);
router.get("/produtos/:id", validateIdParam, buscarId);
router.delete("/produtos/:id", validateIdParam, deletarProd);
router.put("/produtos/:id", validateIdParam, atualizarProd);

export default router;
