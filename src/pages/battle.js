import React, { useEffect, useRef, useCallback } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import {
  getBattleAsync,
  loadLevel,
  loadReplay,
  setPlayerBoundingBox,
  setPlayerVisible,
  playerViewLeft
} from "../actions";
import { Table, TableRow, TableCell } from "../components";

const StyledBattle = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100%;
  overflow: hidden;

  > div:first-child {
    padding: 12px;
  }

  @media (min-width: 950px) {
    flex-direction: row;

    > div {
      flex: 1;
      :first-child {
        border-right: 1px solid #f7f7f7;
        flex: 0 0 350px;
      }
      :last-child {
        overflow: hidden;
      }
    }
  }
`;

const PlayerContainer = styled.div`
  height: 400px;
`;

const TableContainer = styled.div`
  @media (min-width: 950px) {
    > div > div > div:nth-child(2) {
      width: 250px;
    }
  }
`;

const TitleBar = styled.div`
  display: flex;
  align-items: center;

  > * {
    display: flex;
    flex: 1;
    margin: 0;

    :nth-child(2) {
      justify-content: center;
    }
    :nth-child(3) {
      justify-content: flex-end;
    }
  }
`;

const Battle = ({
  match: {
    params: { id }
  }
}) => {
  const dispatch = useDispatch();
  const playerContainer = useRef(null);
  const playerDocked = useSelector(state => state.playerDocked);

  const updatePlayerBoundingBox = useCallback(() => {
    if (playerContainer.current) {
      const {
        x,
        y,
        width,
        height
      } = playerContainer.current.getBoundingClientRect();
      dispatch(setPlayerBoundingBox({ x, y, width, height }));
    }
  }, [dispatch]);

  useEffect(() => {
    updatePlayerBoundingBox();
    dispatch(getBattleAsync(id));
    return () => {
      dispatch(playerViewLeft());
    };
  }, [dispatch, id, updatePlayerBoundingBox]);

  useEffect(() => {
    window.addEventListener("scroll", tryUpdate);
    window.addEventListener("resize", tryUpdate);
    function tryUpdate() {
      !playerDocked && updatePlayerBoundingBox();
    }
    return () => {
      window.removeEventListener("scroll", tryUpdate);
      window.removeEventListener("resize", tryUpdate);
    };
  }, [dispatch, playerDocked, updatePlayerBoundingBox]);

  const data = useSelector(state => state.battleData.find(b => b.id === id));

  data && dispatch(loadLevel(`https://elma.online/dl/level/${data.level}`));
  data && dispatch(loadReplay(`https://elma.online/dl/battlereplay/${id}`));
  data && dispatch(setPlayerVisible(true));
  return (
    <StyledBattle>
      <div>
        <TitleBar>
          <NavLink to={`/battles/${Number(id) + 1}`}>Newer</NavLink>
          <h2>{data && data.filename}.lev</h2>
          <NavLink to={`/battles/${id - 1}`}>Older</NavLink>
        </TitleBar>
        <hr />
        {data && data.startTime}
        <br />
        Started by {data && data.designer}
      </div>
      <div>
        <PlayerContainer ref={playerContainer}></PlayerContainer>
        <TableContainer>
          <Table>
            <TableRow head>
              <TableCell style={{ width: 50 }}>#</TableCell>
              <TableCell>Kuski</TableCell>
              <TableCell>Time</TableCell>
            </TableRow>
            {data &&
              data.results.map((t, i) => (
                <TableRow key={i}>
                  <TableCell>{t.position}.</TableCell>
                  <TableCell>{t.kuski}</TableCell>
                  <TableCell>{t.time}</TableCell>
                </TableRow>
              ))}
          </Table>
        </TableContainer>
      </div>
    </StyledBattle>
  );
};

export default Battle;
