import React, { useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { SideView, View } from "../layouts";
import {
  getBattleAsync,
  loadLevRec,
  setPlayerState,
  videoViewLeft,
} from "../actions";

import {
  Table,
  TableRow,
  TableCell,
  Time,
  Flag,
  LevelImage,
  BattleSidebar,
} from "../components";

const TableContainer = styled.div`
  @media (min-width: 950px) {
    > div > div > div:nth-child(2) {
      width: 250px;
    }
  }
`;

const Battle = ({
  match: {
    params: { id },
  },
}) => {
  const dispatch = useDispatch();
  const data = useSelector((state) =>
    state.battles.details.find((b) => b.id === id)
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
        rec: null,
      })
    );

  return (
    <SideView
      side={<BattleSidebar match={{ params: { id: id } }} />}
      main={
        <View>
          <LevelImage height="350px" level={data && data.lev_id} />
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
                      <Flag nationality={t.kuski_country} />{" "}
                      <NavLink to={`/kuskis/${t.kuski_name}`}>
                        {t.kuski_name}
                      </NavLink>
                    </TableCell>
                    <TableCell>
                      <Time time={t.time} />
                    </TableCell>
                  </TableRow>
                ))}
            </Table>
          </TableContainer>
        </View>
      }
    />
  );
};

export default Battle;
