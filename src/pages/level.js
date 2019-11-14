import React, { useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { getLevelAsync, getLevelTimesAsync } from "../actions";
import SidebarLayout from "../layouts/sidebarLayout";

import {
  Table,
  TableRow,
  TableCell,
  Time,
  LevelImage,
  Line
} from "../components";

const TableContainer = styled.div`
  @media (min-width: 950px) {
    > div > div > div:nth-child(2) {
      width: 250px;
    }
  }
`;

const Title = styled.div`
  border-bottom: 1px solid #f7f7f7;
  padding: 12px;
  text-align: center;
`;

const Level = ({
  match: {
    params: { id }
  }
}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getLevelAsync(id));
    dispatch(getLevelTimesAsync(id));
  }, [dispatch, id]);

  const level = useSelector(state =>
    state.levelData.find(l => l.id === Number(id))
  );
  const levelTimes = useSelector(state =>
    state.levelTimes.filter(t => t.lev_id === Number(id))
  );
  const side = <Title>{(level && level.name) || <Line />}</Title>;
  const content = (
    <>
      <LevelImage level={id} height="350px" />
      <TableContainer>
        <Table>
          <TableRow head>
            <TableCell style={{ width: 50 }}>#</TableCell>
            <TableCell>Kuski</TableCell>
            <TableCell>Time</TableCell>
          </TableRow>
          {levelTimes &&
            levelTimes.map((t, i) => (
              <TableRow key={t.id}>
                <TableCell style={{ width: 50 }}>{i + 1}.</TableCell>
                <TableCell>{t.name}</TableCell>
                <TableCell>
                  <Time time={t.time} />
                </TableCell>
              </TableRow>
            ))}
        </Table>
      </TableContainer>
    </>
  );
  return <SidebarLayout side={side} content={content} />;
};

export default Level;
