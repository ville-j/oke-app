import React, { useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { getBattlesAsync } from "../actions";
import { BattleCard } from "../components";

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  grid-gap: 8px;
  margin: 8px;
`;

const Cell = styled.div``;

const Battles = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBattlesAsync());
  }, [dispatch]);

  const battles = useSelector(state => state.battles);
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
