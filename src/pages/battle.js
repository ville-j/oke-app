import React, { useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { getBattleAsync, loadLevRec, setPlayerState } from "../actions";
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
  useEffect(() => {
    dispatch(getBattleAsync(id));
  }, [id, dispatch]);

  const data = useSelector(state => state.battleData.find(b => b.id === id));
  data &&
    dispatch(
      loadLevRec({
        lev: `https://elma.online/dl/level/${data.level}`,
        rec: `https://elma.online/dl/battlereplay/${id}`
      })
    );
  useEffect(() => {
    dispatch(setPlayerState(1));
    return () => {
      dispatch(setPlayerState(2));
    };
  }, [dispatch]);

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
