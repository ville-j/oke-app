import React, { useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";

import {
  getBattleAsync,
  loadLevRec,
  setPlayerState,
  videoViewLeft
} from "../actions";
import { Table, TableRow, TableCell, Time } from "../components";

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
  const data = useSelector(state =>
    state.battles.details.find(b => b.id === id)
  );

  useEffect(() => {
    dispatch(getBattleAsync(id));
    dispatch(setPlayerState(1));

    return () => {
      dispatch(videoViewLeft());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  data &&
    dispatch(
      loadLevRec({
        lev: `${process.env.REACT_APP_API_URL}/levels/${data.lev_id}/data`,
        rec: null
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
                <TableCell>{i + 1}.</TableCell>
                <TableCell>
                  <NavLink to={`/kuskis/${t.kuski}`}>{t.kuski}</NavLink>
                </TableCell>
                <TableCell>
                  <Time time={t.time} />
                </TableCell>
              </TableRow>
            ))}
        </Table>
      </TableContainer>
    </StyledBattle>
  );
};

export default Battle;
