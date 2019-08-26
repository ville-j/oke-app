import React, { useEffect, useState } from "react";
import { getResults } from "../api";

import LevelCard from "./levelCard";

const BattleCard = ({ id }) => {
  const [data, setData] = useState(null);
  useEffect(() => {
    async function loadResults() {
      const data = await getResults(id);
      setData(data);
    }
    loadResults();
  }, [id]);
  if (!data) return null;
  return <LevelCard times={data.results} id={id} level={data.level} />;
};

export default BattleCard;
