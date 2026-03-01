import { DataSource } from "typeorm";
import { User } from "../entities/User";
import { Comanda } from "../entities/Comanda";
import { ProdutoComanda } from "../entities/ProdutoComanda";

// Validar credenciais obrigatórias
const dbHost = process.env.DB_HOST;
const dbPort = process.env.DB_PORT;
const dbUsername = process.env.DB_USERNAME;
const dbPassword = process.env.DB_PASSWORD;
const dbName = process.env.DB_DATABASE;
const jwtSecret = process.env.JWT_SECRET;

if (!dbHost || !dbPort || !dbUsername || !dbPassword || !dbName) {
  throw new Error("❌ Variáveis de banco de dados não configuradas no .env");
}

if (!jwtSecret) {
  throw new Error("❌ JWT_SECRET não configurado no .env");
}

export const AppDataSource = new DataSource({
  type: "postgres",
  host: dbHost,
  port: parseInt(dbPort),
  username: dbUsername,
  password: dbPassword,
  database: dbName,
  entities: [User, Comanda, ProdutoComanda],
  synchronize: true,
  logging: false,
});
