const express = require("express");
const app = express();
const port = 6543;
const fs = require("fs");
const API = require("./api");
const path = require("path");

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
  const fn = path.join(__dirname, `/cache/${req.params.id}.json`);

  if (fs.existsSync(fn)) {
    res.send(fs.readFileSync(fn, "utf8"));
  } else {
    const results = await API.getBattleResults(req.params.id);

    if (!results.ongoing && !results.queued) {
      fs.writeFile(fn, JSON.stringify(results), () => {
        console.log("done");
      });
    }
    res.json(results);
  }
});

app.get("/levelimage/:id", async (req, res) => {
  res.setHeader("Content-Type", "image/svg+xml");
  const fn = path.join(__dirname, `/cache/images/${req.params.id}.svg`);

  if (fs.existsSync(fn)) {
    res.send(fs.readFileSync(fn));
  } else {
    const data = await API.getLevelImage(req.params.id);
    fs.writeFile(fn, data, () => {
      console.log("done");
    });
    res.send(data);
  }
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
