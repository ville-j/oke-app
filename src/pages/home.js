import React, { useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { formatDistance, parseISO } from "date-fns";
import { getTimesAsync } from "../actions";
import { Table, TableRow, TableCell, Time } from "../components";

const Pad = styled.div`
  padding: 0 12px;
`;

const Home = () => {
  const dispatch = useDispatch();
  const times = useSelector(state => state.times);

  useEffect(() => {
    dispatch(getTimesAsync());
  }, [dispatch]);
  return (
    <>
      <Pad>
        <h3>Recent times</h3>
      </Pad>
      <Table>
        <TableRow head>
          <TableCell style={{ width: 120 }}>Level</TableCell>
          <TableCell style={{ width: 140 }}>Kuski</TableCell>
          <TableCell style={{ width: 90 }}>Time</TableCell>
          <TableCell>Finished</TableCell>
        </TableRow>
        {times.map(t => {
          const d = parseISO(t.created);
          return (
            <TableRow key={t.id}>
              <TableCell>{t.lev_name}</TableCell>
              <TableCell>{t.kuski_name}</TableCell>
              <TableCell>
                <Time time={t.time} />
              </TableCell>
              <TableCell>{formatDistance(d, new Date())} ago</TableCell>
            </TableRow>
          );
        })}
      </Table>
    </>
  );
};

export default Home;
