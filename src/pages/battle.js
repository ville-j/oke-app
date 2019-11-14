import React, { useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import {
  getBattleAsync,
  loadLevRec,
  setPlayerState,
  videoViewLeft
} from "../actions";
import { Table, TableRow, TableCell } from "../components";

const StyledBattle = styled.div``;
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
  const data = useSelector(state => state.battleData.find(b => b.id === id));

  useEffect(() => {
    dispatch(getBattleAsync(id));
    dispatch(setPlayerState(1));

    return () => {
      dispatch(videoViewLeft());
    };
  }, [id, dispatch]);

  data &&
    dispatch(
      loadLevRec({
        lev: `https://elma.online/dl/level/${data.level}`,
        rec: `https://elma.online/dl/battlereplay/${id}`
      })
    );

  return (
    <StyledBattle>
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
    </StyledBattle>
  );
};

export default Battle;
