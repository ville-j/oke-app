import React, { useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { getKuskiAsync, getKuskiTimesAsync } from "../actions";
import {
  Table,
  TableRow,
  TableCell,
  Tabs,
  Tab,
  Avatar,
  Line,
  Time,
  Timestamp
} from "../components";
import SidebarLayout from "../layouts/sidebarLayout";
import { parseTime, formatTime } from "../utils";

const StyledAvatar = styled(Avatar)`
  margin-right: 25px;
`;

const KuskiInfo = styled.div`
  padding: 12px;
  display: flex;
  align-items: center;
  h1 {
    font-size: 2.2em;
    line-height: 1em;
    word-break: break-all;
  }
  h1,
  h2 {
    margin: 0;
  }
`;

const Content = styled.div`
  h3 {
    margin: 12px;
  }
`;

const Stats = styled.div`
  @media all and (max-width: 799px) {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    margin-bottom: 12px;
  }
`;

const StatsContainer = styled.div`
  padding: 8px 12px;
  flex: 1 0 200px;
`;

const StatsValue = styled.div`
  color: #66af30;
  font-size: 1.8em;
  font-weight: 600;
`;

const StatsTitle = styled.div`
  color: #8a8a8a;
`;

const Kuski = ({
  match: {
    params: { name }
  }
}) => {
  const dispatch = useDispatch();
  const data = useSelector(state => state.kuskis.find(k => k.name === name));
  const { id } = data || { id: null };
  const times = useSelector(state => state.kuskiTimes.find(k => k.id === id));

  useEffect(() => {
    dispatch(getKuskiAsync(name));
  }, [name, dispatch]);

  useEffect(() => {
    if (id) {
      dispatch(getKuskiTimesAsync(id));
    }
  }, [dispatch, id]);

  const side = (
    <>
      <KuskiInfo>
        <div>
          <StyledAvatar />
        </div>
        <div style={{ flex: 1 }}>
          <h1>{data ? data.name : <Line />}</h1>
          <h2>
            {data ? data.team ? `[${data.team}]` : "—" : <Line width="100px" />}
          </h2>
        </div>
      </KuskiInfo>
      <Stats>
        <StatsContainer>
          <StatsValue>
            {data ? formatTime(parseTime(data.playtime)) : <Line />}
          </StatsValue>
          <StatsTitle>Play time</StatsTitle>
        </StatsContainer>
        <StatsContainer>
          <StatsValue>{data ? data.runcount : <Line />}</StatsValue>
          <StatsTitle>Run count</StatsTitle>
        </StatsContainer>
        <StatsContainer>
          <StatsValue>{data ? data.runfinish : <Line />}</StatsValue>
          <StatsTitle>Finished runs</StatsTitle>
        </StatsContainer>
      </Stats>
    </>
  );

  const content = (
    <Content>
      <Tabs>
        <Tab to={`/kuskis/${name}`}>Times</Tab>
      </Tabs>
      <h3>Recent times</h3>
      <Table>
        <TableRow head>
          <TableCell style={{ width: 120 }}>Level</TableCell>
          <TableCell style={{ width: 90 }} alignRight>
            Time
          </TableCell>
          <TableCell>Finished</TableCell>
        </TableRow>
        {times &&
          times.data.map(t => {
            return (
              <TableRow key={t.id}>
                <TableCell>{t.lev_name}</TableCell>
                <TableCell alignRight>
                  <Time time={t.time} />
                </TableCell>
                <TableCell>
                  <Timestamp time={t.created} />
                </TableCell>
              </TableRow>
            );
          })}
      </Table>
    </Content>
  );
  return <SidebarLayout side={side} content={content} />;
};

export default Kuski;
