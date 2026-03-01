src/
├── app.ts — entry point, swagger, rotas, error handler
├── config/database.ts — conexão TypeORM + validação do .env
├── entities/
│ ├── User.ts — tabela users
│ ├── Comanda.ts — tabela comandas
│ └── ProdutoComanda.ts — tabela produtos_comanda
├── controllers/
│ ├── AuthController.ts — register, login, logout
│ └── ComandaController.ts — getAll, getById, create, update, delete
├── routes/
│ ├── authRoutes.ts — /auth/_ + swagger docs
│ └── comandaRoutes.ts — /comandas/_ + swagger docs
└── middlewares/
└── authMiddleware.ts — valida JWT em todas as rotas de comanda

POST = http://localhost:8080/auth/register
200 = { "login":"admin",
"senha":"admin"}

400 = {"senha":"123456"}

POST = http://localhost:8080/auth/login
200 = { "login":"teste1",
"senha":"123456"}
400 = { "login":"teste1",
"senha":"errada"}

GET = http://localhost:8080/comandas

POST = http://localhost:8080/comandas
200 = { "idCliente":1,
"nomeCliente":"João Silva",
"telefoneCliente":"11999999999",
"produtos":[
{"nome":"Produto 1",
"preco":50.00}]}
400 = {"nomeCliente":"João Silva"}

GET = http://localhost:8080/comandas/1

PATCH = http://localhost:8080/comandas/1
200 = {"produtos":[
{"nome":"Batata Frita",
"preco":8.00}]}
400 = {"produtos":[
{"id":999,
"preco":10}]}

DELETE = http://localhost:8080/comandas/1
200 = (sem body, com Authorization: Bearer <TOKEN>)
400 = (DELETE em ID 999 inexistente)
