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

const getLevelImage = async id => {
  const image = await axios
    .get(`https://elma.online/dl/level/${id}`, { responseType: "arraybuffer" })
    .then(async res => {
      const Level = require("node-elma").Level;
      return Level.loadFromBuffer(Buffer.from(res.data)).then(level => {
        let minx;
        let maxx;
        let miny;
        let maxy;
        const svgData = level.polygons
          .filter(p => !p.grass)
          .map(p => {
            return p.vertices
              .map(v => {
                if (!minx || v.x < minx) minx = v.x;
                if (!miny || v.y < miny) miny = v.y;
                if (!maxx || v.x > maxx) maxx = v.x;
                if (!maxy || v.y > maxy) maxy = v.y;
                return [v.x, v.y].join(",");
              })
              .join(" ");
          });
        const paths = svgData.map(s => {
          return "M " + s + " z";
        });

        const svg = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:svg="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="${minx} ${miny} ${maxx -
          minx} ${maxy - miny}">
        <g><path d="${paths.join(
          " "
        )}" style="fill: #f1f1f1; fill-rule: evenodd"/></g></svg>`;

        return svg;
      });
    });
  return image;
};

module.exports = {
  getBattleResults,
  getBattles,
  getLevelImage
};
