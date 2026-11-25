// Importerer Prisma Client – vores fælles forbindelse til databasen
import { prisma } from "./prisma.js";

import dotenv from 'dotenv';
// Importer Express – det framework vi bygger serveren med
import express from "express";
// Importer cors – lader sider på en ANDEN adresse (f.eks. Live Server) hente data herfra
import cors from "cors";
// Importer vores game-router fra routes-mappen
// VIGTIGT: skriv .js selvom filen hedder .ts (det skyldes Node + ES modules)
import { gameRoutes } from "./routes/gameRoutes.js";

// Læs .env filen og læg variablerne ind i process.env
dotenv.config();

// Hent PORT fra .env – hvis den ikke findes, brug '4000' som backup
const port = process.env.PORT || '4000';

// Opret selve Express-app'en
const app = express();

// Tillad andre sider at hente data fra serveren – skal stå FØR routes
app.use(cors());

// GET-route der henter ALLE brugere fra databasen
app.get("/users", async (req, res) => {
  // findMany() = "find mange" – henter alle rækker fra users-tabellen
  const users = await prisma.user.findMany();

  // Send brugerne tilbage som JSON
  res.json(users);
});

// Brug game-routeren – alle routes i gameRoutes.ts bliver nu en del af app'en
app.use(gameRoutes);

// Start serveren, så den lytter efter besøg på porten
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});