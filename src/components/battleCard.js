import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getBattleAsync } from "../actions";
import LevelCard from "./levelCard";

const BattleCard = ({ id }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBattleAsync(id));
  }, [dispatch, id]);
  const data = useSelector(state => state.battleData.find(b => b.id === id));
  if (!data) return null;
  return <LevelCard times={data.results} id={id} level={data.level} />;
};

export default BattleCard;
