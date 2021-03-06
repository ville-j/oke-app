import React, { useEffect } from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getLevelAsync, getLevelTimesAsync } from "../actions";
import SidebarLayout from "../layouts/sidebarLayout";

import {
  Table,
  TableRow,
  TableCell,
  Time,
  LevelImage,
  Line,
  Flag,
  Header,
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

const SideContent = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const Level = ({
  match: {
    params: { id },
  },
}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getLevelAsync(id));
    dispatch(getLevelTimesAsync(id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const level = useSelector((state) =>
    state.levels.details.find((l) => l.id === Number(id))
  );
  const levelTimes = useSelector((state) => state.levels.times[id]);
  const side = (
    <SideContent>
      <Title>
        <Header>{(level && `${level.name}.lev`) || <Line />}</Header>
      </Title>
    </SideContent>
  );
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
    </>
  );
  return <SidebarLayout side={side} content={content} />;
};

export default Level;
