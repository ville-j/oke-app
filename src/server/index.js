const express = require("express");
const app = express();
const port = 6543;

const API = require("./api");

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get("/", (req, res) => res.send("Hello World!"));

app.get("/battles", async (req, res) => {
  const battles = await API.getBattles();
  res.json(battles);
});

app.get("/battles/:id", async (req, res) => {
  const results = await API.getBattleResults(req.params.id);
  res.json(results);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
