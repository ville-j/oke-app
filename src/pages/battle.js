import React, { useEffect } from "react";
import Recplayer from "recplayer-react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { getBattleAsync } from "../actions";
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
  useEffect(() => {
    dispatch(getBattleAsync(id));
  }, [dispatch, id]);
  const data = useSelector(state => state.battleData.find(b => b.id === id));

  if (!data) return null;

  return (
    <StyledBattle>
      <div>
        <TitleBar>
          <NavLink to={`/battles/${Number(id) + 1}`}>Newer</NavLink>
          <h2>{data.filename}.lev</h2>
          <NavLink to={`/battles/${id - 1}`}>Older</NavLink>
        </TitleBar>
        <hr />
        {data.startTime}
        <br />
        Started by {data.designer}
      </div>
      <div>
        <PlayerContainer>
          <Recplayer level={data.level} battle={id} autoFill autoPlay />
        </PlayerContainer>
        <TableContainer>
          <Table>
            <TableRow head>
              <TableCell style={{ width: 50 }}>#</TableCell>
              <TableCell>Kuski</TableCell>
              <TableCell>Time</TableCell>
            </TableRow>
            {data.results.map((t, i) => (
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
