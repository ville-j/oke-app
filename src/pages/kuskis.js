import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getKuskisAsync } from "../actions";
import { Table, TableRow, TableCell } from "../components";
import { parseTime, formatTime } from "../utils";

const Kuskis = () => {
  const dispatch = useDispatch();
  const kuskis = useSelector(state => state.kuskis);

  useEffect(() => {
    dispatch(getKuskisAsync());
  }, [dispatch]);

  return (
    <Table>
      <TableRow head>
        <TableCell style={{ width: 200 }}>Kuski</TableCell>
        <TableCell style={{ width: 100 }}>Team</TableCell>
        <TableCell>Play time</TableCell>
      </TableRow>
      {kuskis.map(k => {
        return (
          <TableRow href={`/kuskis/${k.name}`} key={k.id}>
            <TableCell>{k.name}</TableCell>
            <TableCell>{k.team}</TableCell>
            <TableCell>{formatTime(parseTime(k.playtime))}</TableCell>
          </TableRow>
        );
      })}
    </Table>
  );
};

export default Kuskis;