import React, { useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { getTimesAsync } from "../actions";
import {
  Table,
  TableRow,
  TableCell,
  Time,
  Timestamp,
  Flag,
} from "../components";

import { View } from "../layouts";

const Pad = styled.div`
  padding: 0 12px;
`;

const Home = () => {
  const dispatch = useDispatch();
  const times = useSelector((state) => state.times.recentTimes).sort((a, b) => {
    return b.created - a.created;
  });

  useEffect(() => {
    dispatch(getTimesAsync());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <View>
      <Pad>
        <h3>Recent times</h3>
      </Pad>
      <Table>
        <TableRow head>
          <TableCell style={{ width: 120 }}>Level</TableCell>
          <TableCell style={{ width: 140 }}>Kuski</TableCell>
          <TableCell style={{ width: 90 }} alignRight>
            Time
          </TableCell>
          <TableCell>Finished</TableCell>
        </TableRow>
        {times.map((t) => {
          return (
            <TableRow key={t.id}>
              <TableCell>
                <NavLink to={`/levels/${t.lev_id}`}>{t.lev_name}</NavLink>
              </TableCell>
              <TableCell>
                <NavLink to={`/kuskis/${t.kuski_name}`}>
                  <Flag nationality={t.kuski_country} /> {t.kuski_name}
                </NavLink>
              </TableCell>
              <TableCell alignRight>
                <Time time={t.time} />
              </TableCell>
              <TableCell>
                <Timestamp time={t.created} relative />
              </TableCell>
            </TableRow>
          );
        })}
      </Table>
    </View>
  );
};

export default Home;
