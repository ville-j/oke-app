import React, { useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { getBattlesAsync } from "../actions";
import { BattleCard } from "../components";
import { poll } from "../utils";

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  grid-gap: 8px;
  margin: 8px;
`;

const Cell = styled.div``;

const Battles = () => {
  const dispatch = useDispatch();
  useEffect(
    poll(() => {
      dispatch(getBattlesAsync());
    }, 30000),
    []
  );

  const battles = useSelector(state => state.battles.list);
  return (
    <Grid>
      {battles.slice(0, 15).map(b => {
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
