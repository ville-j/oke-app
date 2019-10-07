import React, { useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { getLevelAsync, getLevelTimesAsync } from "../actions";

import { Table, TableRow, TableCell, Time, LevelImage } from "../components";

const Container = styled.div`
  min-height: 100%;
  flex: 1;
  display: flex;
`;

const Side = styled.div`
  flex: 0 1 350px;
  border-right: 1px solid #f7f7f7;
`;

const Content = styled.div`
  flex: 1;
`;

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
    state.levels.find(l => l.id === Number(id))
  );
  const levelTimes = useSelector(state =>
    state.levelTimes.filter(t => t.lev_id === Number(id))
  );
  return (
    <Container>
      <Side>
        <Title>{level && level.name}.lev</Title>
      </Side>
      <Content>
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
                  <TableCell>{t.kuski_name}</TableCell>
                  <TableCell>
                    <Time time={t.time} />
                  </TableCell>
                </TableRow>
              ))}
          </Table>
        </TableContainer>
      </Content>
    </Container>
  );
};

export default Level;
