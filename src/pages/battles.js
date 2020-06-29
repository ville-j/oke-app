import React, { useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import format from "date-fns/format";
import set from "date-fns/set";
import isToday from "date-fns/isToday";
import qs from "query-string";
import { ChevronLeft, ChevronRight } from "react-feather";
import { getBattlesAsync } from "../actions";
import { BattleCard, IconButton, Header } from "../components";
import { poll, okeTimeToNorm } from "../utils";
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
    margin: 0;
    padding: 12px;

    :nth-child(2) {
      justify-content: center;
      flex: 1;
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

  const battles = useSelector((state) =>
    state.battles.list.filter((b) => {
      return (
        okeTimeToNorm(b.created) >= date &&
        okeTimeToNorm(b.created) < date + 86400
      );
    })
  );

  const side = (
    <SideContent>
      <DateBar>
        <IconButton icon={<ChevronLeft />} url={`/battles?t=${date + 86400}`} />

        <div>
          <Header>
            {isToday(date * 1000)
              ? "Today"
              : format(date * 1000, "EEE dd.MM.yyyy")}
          </Header>
        </div>
        <IconButton
          icon={<ChevronRight />}
          url={`/battles?t=${date - 86400}`}
        />
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
