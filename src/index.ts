// Importer Express – det framework vi bygger serveren med (erstatter Node's indbyggede "http")
import express from "express";
// Importer cors – lader sider på en ANDEN adresse (f.eks. Live Server på port 5501) hente data herfra
// Kræver også "@types/cors" (devDependency), så TypeScript ved, hvad cors er
import cors from "cors"
import * as fs from "fs"; // fs = "file system", lader os læse filer fra disken

// Porten serveren kører på – frontenden fetcher fra http://localhost:4000/
const port = 4000;
// express er "fabrikken" – express() med parenteser LAVER selve app'en, som vi bruger resten af filen
const app = express();

// Tillad andre sider (f.eks. Live Server) at hente data fra serveren
// app.use = gælder for ALLE routes. Skal stå FØR app.get, fordi Express kører tingene oppefra og ned
// Uden denne linje blokerer BROWSEREN svaret (CORS-fejl), selvom serveren faktisk svarer med 200
// HUSK: genstart serveren (Ctrl+C → npm run dev), hvis en ændring ikke ser ud til at virke!
app.use(cors());

// Når nogen besøger forsiden "/", kør denne funktion
// req = forespørgslen (det browseren spørger om), res = svaret (det vi sender tilbage)
app.get("/", (req, res) => {
  // Læs games.json filen som tekst (utf8)
  // Stien er i forhold til mappen, hvor "npm run dev" køres (projektets rodmappe), ikke src-mappen
  // readFile står INDE i routen, så filen læses hver gang nogen besøger siden,
  // og så "data" og "res" kan nå hinanden (scope)
  fs.readFile("games.json", "utf8", (err, jsonString) => {
    // Hvis filen ikke kunne læses, vis fejlen og stop
    if (err) {
      // console = til MIG i terminalen, res.send = til den besøgende i browseren
      console.error(err);
      // Send en fejlbesked til browseren, så den ikke venter for evigt
      res.send("IT DID NOT WORK");
      // return stopper funktionen her, så vi ikke også prøver at parse og sende igen nedenfor
      // (man må kun sende ÉT svar pr. besøg)
      return;
    }

    try {
      // Lav teksten om til et rigtigt JavaScript-objekt
      // Hvis JSON-filen er forkert skrevet (f.eks. manglende komma), kaster JSON.parse en fejl → catch
      const data = JSON.parse(jsonString);
      // Laver objektet om til JSON-tekst og sender det til browseren (res.send er til almindelig tekst/HTML)
      // res.json fortæller også browseren "det her er JSON" – derfor viser Firefox den pæne JSON-viewer
      res.json(data);
    } catch (error) {
      // Hvis JSON'en er forkert skrevet, havner vi her
      console.log("Fejl ved parsing af JSON:", error);
      // Send en fejlbesked til browseren, så den ikke venter for evigt
      res.send("IT FAILED AS IM STUPID LOL");
    }
  });
});

// Start serveren, så den lytter efter besøg på porten
// Det er "app" (ikke "express") der lytter – fabrikken lytter ikke, kun den app den har lavet
// Køres med "npm run dev" → "tsx watch src/index.ts" (watch = genstarter selv, når filen gemmes)
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});