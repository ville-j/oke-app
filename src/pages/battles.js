import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { getBattles } from "../api";
import { BattleCard } from "../components";

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  grid-gap: 8px;
  margin: 8px;
`;

const Cell = styled.div``;

const Battles = () => {
  const [battles, setBattles] = useState([]);
  useEffect(() => {
    async function loadBattles() {
      const data = await getBattles();
      setBattles(data);
    }
    loadBattles();
  }, []);
  return (
    <Grid>
      {[...battles].splice(0, 15).map(b => {
        return (
          <Cell key={b.id}>
            <BattleCard id={b.id} />
          </Cell>
        );
      })}
    </Grid>
  );
};

export default Battles;
