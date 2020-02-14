import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getBattleAsync } from "../actions";
import LevelCard from "./levelCard";

const BattleCard = ({ id }) => {
  const dispatch = useDispatch();
  const data = useSelector(state =>
    state.battles.details.find(b => b.id === id)
  );
  useEffect(() => {
    if (!data || data.status < 2) {
      dispatch(getBattleAsync(id));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);
  return (
    <LevelCard
      times={data ? data.results : []}
      id={id}
      level={data ? data.lev_id : ""}
    />
  );
};

export default BattleCard;
