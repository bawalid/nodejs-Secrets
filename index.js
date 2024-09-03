//Pour voir comment le site web final doit fonctionner, exécutez "node solution.js".
//Assurez-vous d'avoir installé toutes les dépendances avec "npm i".
//Le mot de passe est ILoveProgramming
import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";

const app = express();
const port = 3000;

const __dirname = dirname(fileURLToPath(import.meta.url));
app.use(bodyParser.urlencoded({ extended: true }));

const PASSWORD = "ILoveProgramming";
let verified = false;

function verifPassword(req, res, next) {
  if (req.body.password === PASSWORD) {
    verified = true;
  }
  next();
}

app.use(verifPassword);

app.post("/check", (req, res) => {
  if (verified) {
    res.sendFile(__dirname + "/public/secret.html");
  } else {
    res.sendFile(__dirname + "/public/index.html");
  }
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.listen(port, () => {
  console.log("server is running on port " + port);
});
