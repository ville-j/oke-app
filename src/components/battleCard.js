import React, { useEffect, useState } from "react";
import { getResults } from "../api";

import LevelCard from "./levelCard";

const BattleCard = ({ id }) => {
  const [results, setResults] = useState({ results: [], level: null });
  useEffect(() => {
    async function loadResults() {
      const data = await getResults(id);
      setResults(data);
    }
    loadResults();
  }, [id]);
  return <LevelCard times={results.results} id={id} level={results.level} />;
};

export default BattleCard;
