# API de Produtos — Papelaria

API REST desenvolvida em Node.js + Express para gerenciamento de cadastro de produtos de uma papelaria, com regras de negócio de estoque, soft delete e prevenção de duplicidade.

> Projeto desenvolvido como exercício prático de backend, com foco em CRUD, validação de dados, regras de negócio e boas práticas de arquitetura em camadas (routes → controller → service → data).

## 🚀 Tecnologias

- Node.js
- Express
- ES Modules (`import`/`export`)
- Persistência em memória (mock) — sem banco de dados externo nessa versão

## 📁 Estrutura do projeto

```
src/
  routes/
    produtos.routes.js       # Definição das rotas HTTP
  controllers/
    produtos.controller.js   # Recebe requisição, chama o service, monta resposta
  services/
    produtos.service.js      # Regras de negócio e manipulação dos dados
  db/
    produtos.mock.js         # "Banco de dados" em memória (array mock)
server.js                    # Ponto de entrada da aplicação
```

## ▶️ Como rodar o projeto

```bash
# Instalar dependências
npm install

# Rodar em modo produção
npm start

# Rodar em modo desenvolvimento (reinicia sozinho a cada alteração, requer nodemon)
npm run dev
```

O servidor sobe em `http://localhost:3000`, com as rotas prefixadas em `/api/papelaria`.

## 📌 Endpoints

| Método | Rota | Descrição |
|---|---|---|
| `GET` | `/api/papelaria/produtos` | Lista todos os produtos **ativos** |
| `GET` | `/api/papelaria/produtos/:id` | Busca um produto específico por ID |
| `POST` | `/api/papelaria/produtos` | Cadastra um novo produto |
| `PUT` | `/api/papelaria/produtos/:id` | Atualiza um produto existente |
| `DELETE` | `/api/papelaria/produtos/:id` | Remove um produto (soft delete) |

### Exemplo de payload — `POST /produtos`

```json
{
  "nome": "Caneta Esferográfica Azul",
  "categoria": "Escolar",
  "preco": 2.5,
  "quantidade_estoque": 150
}
```

## 🗃️ Modelo de dados — Produto

| Campo | Tipo | Observação |
|---|---|---|
| id | number | gerado automaticamente |
| nome | string | obrigatório, único |
| categoria | string | obrigatório |
| preco | number | obrigatório, maior que zero |
| quantidade_estoque | number | obrigatório, não pode ser negativo |
| ativo | boolean | padrão `true`, controlado via soft delete |
| criado_em | string (ISO date) | preenchido automaticamente |
| atualizado_em | string (ISO date) | atualizado a cada modificação |

## 📐 Regras de negócio implementadas

- Nome do produto não pode ser vazio nem duplicado (comparação case-insensitive).
- Preço deve ser sempre maior que zero.
- Quantidade em estoque não pode ser negativa.
- Exclusão é feita via **soft delete** (`ativo: false`), o produto nunca é removido fisicamente.
- Listagem padrão (`GET /produtos`) retorna apenas produtos com `ativo: true`.
- Atualização de produto bloqueia **mass assignment** — apenas os campos `nome`, `preco`, `categoria` e `quantidade_estoque` podem ser alterados via `PUT`, mesmo que o cliente envie outros campos no body.
- Campo `atualizado_em` é sempre recalculado a cada alteração (update ou delete).

## 🧪 Testando a API

Recomenda-se usar Postman, Insomnia ou `curl`. Fluxo sugerido de teste:

1. `POST /produtos` — cria um produto novo
2. `GET /produtos` — confirma que o produto aparece na listagem
3. `PUT /produtos/:id` — atualiza um campo permitido
4. `DELETE /produtos/:id` — remove o produto (soft delete)
5. `GET /produtos` — confirma que o produto removido não aparece mais
6. `POST /produtos` com nome já existente — confirma que retorna erro

## 📝 Notas de desenvolvimento

Este projeto foi construído de forma incremental, com revisão de código (code review) a cada etapa, simulando o fluxo de trabalho de um time de desenvolvimento real. Os principais aprendizados técnicos ao longo do processo:

- Diferença entre **mutar um objeto por referência** (`objeto.propriedade = valor`) e **criar uma cópia** (`{ ...objeto }`) — e o impacto disso em persistência de dados em memória.
- Separação entre função de **leitura bruta** dos dados (uso interno) e **leitura filtrada** exposta ao cliente da API.
- Prevenção de **mass assignment** através de whitelist de campos editáveis.

## 🔜 Próximos passos

- Migração da persistência em memória para um banco de dados relacional (SQL)
- Relacionamento entre tabelas (ex: produtos ↔ pedidos)
- Paginação e filtros na listagem
- Testes automatizados