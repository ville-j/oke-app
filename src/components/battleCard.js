import React, { useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { battleType } from "../utils";
import { getBattleAsync } from "../actions";
import LevelCard from "./levelCard";
import Timestamp from "./timestamp";

const Head = styled.div`
  padding: 12px;
  display: flex;
  background: #333;
  color: #d8d8d8;
  border-bottom: 1px solid #484848;

  > * {
    flex: 1;
  }
`;

const BattleCard = ({ id, date, duration, type }) => {
  const dispatch = useDispatch();
  const data = useSelector((state) =>
    state.battles.details.find((b) => b.id === id)
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
      head={
        <Head>
          <div>
            {duration}m {battleType(type)} battle
          </div>
          <Timestamp time={date} />
        </Head>
      }
    />
  );
};

export default BattleCard;
