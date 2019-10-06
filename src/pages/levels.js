import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getLevelsAsync } from "../actions";
import { Table, TableRow, TableCell } from "../components";

const Levels = () => {
  const dispatch = useDispatch();
  const levels = useSelector(state => state.levels).sort((a, b) => {
    return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
  });

  useEffect(() => {
    dispatch(getLevelsAsync());
  }, [dispatch]);
  return (
    <Table>
      {levels.map(l => {
        return (
          <TableRow href={`/levels/${l.id}`} key={l.id}>
            <TableCell>{l.name}</TableCell>
          </TableRow>
        );
      })}
    </Table>
  );
};

export default Levels;
