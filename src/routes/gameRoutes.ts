// Importer Router fra Express, så vi kan lave routes i en separat fil
import { Router } from "express";
// fs = "file system", lader os læse filer fra disken
import * as fs from "fs";

// Opret en ny router – fungerer som en "mini-server", vi kan tilføje routes til
const routes = Router();

// ===== ROUTE 1: Hent ALLE spil =====
// URL: http://localhost:4000/
routes.get("/", (req, res) => {
  // Læs games.json filen som tekst (utf8)
  fs.readFile("games.json", "utf8", (err, jsonString) => {
    // Hvis filen ikke kunne læses, vis fejlen og send en besked til browseren
    if (err) {
      console.error(err);
      res.send("IT DID NOT WORK");
      return;
    }

    try {
      // Lav teksten om til et rigtigt JavaScript-objekt og send det som JSON
      const data = JSON.parse(jsonString);
      res.json(data);
    } catch (error) {
      // Hvis JSON'en er forkert skrevet, havner vi her
      console.log("Fejl ved parsing af JSON:", error);
      res.send("IT FAILED AS IM STUPID LOL");
    }
  });
});

// ===== ROUTE 2: Hent ÉT spil ud fra id (dynamisk route) =====
// URL eksempel: http://localhost:4000/3  →  Minecraft
// ":id" er en pladsholder – det der står i URL'en på den plads, havner i req.params.id
routes.get("/:id", (req, res) => {
  // Hent id'et fra URL'en
  // VIGTIGT: req.params er ALTID tekst ("3"), så vi laver det om til et tal (3) med Number()
  // ellers ville "3" === 3 være false, og vi ville aldrig finde spillet
  const id = Number(req.params.id);

  // Læs games.json filen – samme som i route 1
  fs.readFile("games.json", "utf8", (err, jsonString) => {
    // Hvis filen ikke kunne læses, send en fejl (500 = serverfejl)
    if (err) {
      console.error(err);
      res.status(500).send("Kunne ikke læse filen");
      return;
    }

    try {
      // Lav teksten om til et JavaScript-objekt
      const data = JSON.parse(jsonString);

      // Find det spil i listen, hvis id matcher id'et fra URL'en
      // .find() går igennem arrayet og giver det FØRSTE spil, hvor betingelsen er true
      // Finder den ikke noget, giver den undefined
      const game = data.games.find((g: { id: number }) => g.id === id);

      // Hvis der ikke findes et spil med det id, send 404 (= "ikke fundet")
      if (!game) {
        res.status(404).send(`Intet spil med id ${req.params.id}`);
        return;
      }

      // Send det ene spil som JSON
      res.json(game);
    } catch (error) {
      // Hvis JSON'en er forkert skrevet, havner vi her
      console.log("Fejl ved parsing af JSON:", error);
      res.status(500).send("JSON-filen er forkert skrevet");
    }
  });
});

// Eksportér routeren, så index.ts kan importere og bruge den
export const gameRoutes = routes;