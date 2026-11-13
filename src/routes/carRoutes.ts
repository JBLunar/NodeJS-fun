// Importer Router fra Express, så vi kan lave routes i en separat fil
import { Router } from "express";
// fs = "file system", lader os læse filer fra disken
import * as fs from "fs";

// Opret en ny router – fungerer som en "mini-server", vi kan tilføje routes til
const routes = Router();

// Når nogen besøger roden af denne router "/", læs games.json og send den
// (Det er præcis den samme kode som før – den er bare flyttet fra index.ts hertil)
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

// Eksportér routeren, så index.ts kan importere og bruge den
export const gameRoutes = routes;