import React, { useEffect } from "react";
import Recplayer from "recplayer-react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { getBattleAsync } from "../actions";
import { Table, TableRow, TableCell } from "../components";

const StyledBattle = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100%;

  @media (min-width: 950px) {
    flex-direction: row;

    > div {
      flex: 1;
      :first-child {
        border-right: 1px solid #f7f7f7;
        padding: 12px;
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
      <div>{data.filename}.lev</div>
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
