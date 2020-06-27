import React, { useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import format from "date-fns/format";
import set from "date-fns/set";
import isToday from "date-fns/isToday";
import qs from "query-string";
import { ChevronLeft, ChevronRight } from "react-feather";
import { getBattlesAsync } from "../actions";
import { BattleCard } from "../components";
import { poll } from "../utils";
import { SideView, View } from "../layouts";

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
  grid-gap: 8px;
  margin: 8px;
`;

const Cell = styled.div``;

const DateBar = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 1px solid #f7f7f7;

  > * {
    display: flex;
    flex: 1;
    margin: 0;
    padding: 12px;
    box-sizing: border-box;

    :nth-child(1) {
      flex: 0 0 50px;
    }

    :nth-child(2) {
      justify-content: center;
    }
    :nth-child(3) {
      justify-content: flex-end;
      flex: 0 0 50px;
    }
  }
`;

const SideContent = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const Battles = ({ location }) => {
  const dispatch = useDispatch();

  const { t } = qs.parse(location.search);
  const now = new Date();
  const today =
    Number(
      format(
        set(now, {
          hours: 0,
          minutes: 0,
          seconds: 0,
          milliseconds: 0,
        }),
        "T"
      )
    ) / 1000;

  const date = Number(t) || today;

  useEffect(
    date + 86400 > now / 1000
      ? poll(() => {
          dispatch(getBattlesAsync(date));
        }, 30000)
      : () => {
          dispatch(getBattlesAsync(date));
        },
    [date]
  );

  const battles = useSelector((state) => state.battles.list);
  const side = (
    <SideContent>
      <DateBar>
        <NavLink to={`/battles?t=${date + 86400}`}>
          <ChevronLeft /> newer
        </NavLink>

        <div>
          {isToday(date * 1000)
            ? "Today"
            : format(date * 1000, "EEE dd.MM.yyyy")}
        </div>
        <NavLink to={`/battles?t=${date - 86400}`}>
          older <ChevronRight />
        </NavLink>
      </DateBar>
    </SideContent>
  );
  const content = (
    <Grid>
      {battles.map((b) => {
        return (
          <Cell key={b.id}>
            <BattleCard
              id={b.id}
              date={b.created}
              duration={b.duration}
              type={b.type}
            />
          </Cell>
        );
      })}
    </Grid>
  );
  return <SideView side={side} main={<View>{content}</View>} stickySide />;
};

export default Battles;
