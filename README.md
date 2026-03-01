# FurbWeb API

Trabalho de prova de suficiência na matéria de **Programação Web 2 (Backend)**.

---

## Sobre

API REST para gerenciamento de comandas, desenvolvida com Node.js, TypeScript e PostgreSQL.

---

## Requisitos atendidos

| #   | Requisito                                                           | Tecnologia                         |
| --- | ------------------------------------------------------------------- | ---------------------------------- |
| 1   | Web Service REST com comunicação JSON e códigos de erro corretos    | Express.js                         |
| 2   | Persistência em banco relacional via ORM, nomenclatura padrão de BD | TypeORM + PostgreSQL               |
| 3   | Cadastro de usuário com senha criptografada                         | bcrypt                             |
| 4   | Autenticação por token em rotas protegidas                          | JWT                                |
| 5   | Documentação da API                                                 | Swagger                            |
| 6   | Arquitetura MVC + DAO                                               | Controllers + TypeORM Repository   |
| 7   | Validação de todos os atributos                                     | Validações manuais nos controllers |

---

## Stack

- **Runtime:** Node.js + TypeScript
- **Framework:** Express.js
- **Banco de dados:** PostgreSQL 15
- **ORM:** TypeORM
- **Autenticação:** JWT (jsonwebtoken) + bcrypt
- **Documentação:** Swagger (swagger-jsdoc + swagger-ui-express)
- **Infra:** Docker

---

## Como rodar

**Pré-requisitos:** Docker e Node.js instalados.

```bash
# 1. Subir o banco de dados
docker compose up -d

# 2. Instalar dependências
npm install

# 3. Iniciar o servidor
npm run dev
```

Servidor disponível em `http://localhost:3000/FurbWeb/v1`

Swagger disponível em `http://localhost:3000/docs`

---

## Endpoints

### Autenticação (`/FurbWeb/v1/auth`)

| Método | Rota        | Descrição                | Auth |
| ------ | ----------- | ------------------------ | ---- |
| POST   | `/register` | Cadastrar usuário        | Não  |
| POST   | `/login`    | Login e geração do token | Não  |
| POST   | `/logout`   | Logout                   | Sim  |

### Comandas (`/FurbWeb/v1/comandas`)

| Método | Rota   | Descrição                    | Auth |
| ------ | ------ | ---------------------------- | ---- |
| GET    | `/`    | Listar todas as comandas     | Sim  |
| POST   | `/`    | Criar nova comanda           | Sim  |
| GET    | `/:id` | Buscar comanda por ID        | Sim  |
| PUT    | `/:id` | Atualizar dados da comanda   | Sim  |
| PATCH  | `/:id` | Adicionar/atualizar produtos | Sim  |
| DELETE | `/:id` | Deletar comanda              | Sim  |

---

## Variáveis de ambiente

Crie um arquivo `.env` na raiz com:

```env
# Server Configuration
PORT=3000

# Database Configuration (PostgreSQL)
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_DATABASE=furbweb

# JWT Configuration
JWT_SECRET=jwt-secret-key-2026-production
JWT_EXPIRES_IN=86400

# Node Environment
NODE_ENV=development
```

---

## Usuário padrão

Na primeira execução, um usuário administrador é criado automaticamente:

```
login: admin
senha: admin
```
