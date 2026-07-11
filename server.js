import express from "express";
const app = express();
const port = 3000;

import produtos from "./src/routes/produtos.routes.js";

app.use(express.json());

app.use("/api/papelaria", produtos);


app.listen(port, (req, res) => {
  console.log(`Servidor rodando na porta ${port} 🚀🚀`);
});
