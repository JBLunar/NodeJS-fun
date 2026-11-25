// Indlæser miljøvariabler fra .env
import "dotenv/config";

// Importerer den genererede Prisma Client
import { PrismaClient } from "./generated/prisma/client.js";

// Importerer SQLite adapteren
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";

// Opretter forbindelse til SQLite databasen
const adapter = new PrismaBetterSqlite3({
  url: process.env.DATABASE_URL ?? "file:./dev.db"
});

// Opretter og eksporterer Prisma Client
export const prisma = new PrismaClient({ adapter });