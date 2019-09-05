const cheerio = require("cheerio");
const axios = require("axios");

const getBattles = async (includeResults = false) => {
  const res = await axios.get("https://elmaonline.net/home/battles/0");
  const $ = cheerio.load(res.data);
  const rows = $("tbody > tr");
  const battles = [];

  rows.each((i, el) => {
    if (i !== rows.length - 1) {
      const url = $(el)
        .find("td")
        .eq(0)
        .find("a")
        .attr("href")
        .split("/");
      battles.push({
        id: url[url.length - 1],
        filename: $(el)
          .find("td")
          .eq(1)
          .text(),
        designer: $(el)
          .find("td")
          .eq(2)
          .text()
          .trim()
      });
    }
  });
  if (includeResults) {
    for (const b of battles) {
      const results = await getBattleResults(b.id);
      b.results = results;
    }
  }
  return battles;
};

const getBattleResults = async battleId => {
  const res = await axios.get(`https://elmaonline.net/battles/${battleId}`);
  const $ = cheerio.load(res.data);
  const rows = $("tbody > tr");
  const results = [];

  rows.each((i, el) => {
    results.push({
      position: i + 1,
      kuski: $(el)
        .find("td")
        .eq(1)
        .text()
        .trim(),
      time: $(el)
        .find("td")
        .eq(2)
        .text()
    });
  });
  const levelUrl = $("h1 a")
    .eq(0)
    .attr("href")
    .split("/");
  const ongoing =
    $("#left p")
      .eq(1)
      .text() === "Battle is on going";

  const startTime = ongoing
    ? $("#left p")
        .eq(0)
        .text()
    : $("#left p")
        .eq(1)
        .text();
  const designer = $("h1 a")
    .eq(2)
    .text();
  const filename = $("h1 a")
    .eq(0)
    .text();
  const queued =
    $("#left p")
      .eq(0)
      .text() === "Battle is in queue";
  return {
    filename,
    queued,
    ongoing,
    finished: !queued && !ongoing,
    startTime,
    designer,
    level: levelUrl[levelUrl.length - 1],
    results
  };
};

module.exports = {
  getBattleResults,
  getBattles
};
