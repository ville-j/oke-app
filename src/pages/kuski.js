import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { getKuskiAsync, getKuskiTimesAsync } from "../actions";
import {
  Table,
  TableRow,
  TableCell,
  Tabs,
  Tab,
  Line,
  Time,
  Timestamp,
  Flag,
  Shirt,
} from "../components";
import SidebarLayout from "../layouts/sidebarLayout";
import { parseTime, formatTime } from "../utils";
import { uploadShirt } from "../api";

const KuskiInfo = styled.div`
  padding: 12px;
  display: flex;
  align-items: center;
  h1 {
    font-size: 1.8em;
    line-height: 1em;
    word-break: break-all;
    text-transform: lowercase;
  }
  h1,
  h2 {
    margin: 0;
  }

  h2 {
    margin: 5px 0;
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
  font-size: 1.5em;
  font-weight: 600;
`;

const StatsTitle = styled.div`
  color: #8a8a8a;
`;

const ShirtForm = styled.form`
  display: none;
`;

const ChangeAvatar = styled.div`
  padding: 8px 12px;
  padding-top: 0;
  label {
    cursor: pointer;
  }
`;

const ShirtContainer = styled.div`
  width: 80px;
  margin-right: 12px;
  height: 108.73px;
`;

const Kuski = ({
  match: {
    params: { name },
  },
}) => {
  const dispatch = useDispatch();
  const data = useSelector((state) =>
    state.kuskis.find((k) => k.name === name)
  );
  const user = useSelector((state) => state.user);
  const { id } = data || { id: null };
  const times = useSelector((state) =>
    state.times.kuskiTimes.filter((k) => k.kuski_id === id)
  );
  const [t, setT] = useState(0);

  useEffect(() => {
    dispatch(getKuskiAsync(name));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name]);

  useEffect(() => {
    if (id) {
      dispatch(getKuskiTimesAsync(id));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const side = (
    <>
      <ShirtForm>
        <input
          type="file"
          name="shirt"
          id="shirt"
          onChange={async (e) => {
            if (e.target.files.length > 0) {
              const formData = new FormData();
              formData.append("shirt", e.target.files[0]);
              try {
                const res = await uploadShirt(data.name, formData);
                setT(res.shirt_crc);
              } catch (e) {
                console.log(e);
              }
            }
          }}
        />
      </ShirtForm>
      <KuskiInfo>
        <ShirtContainer>
          {data && <Shirt kuski={data.name} crc={t} />}
        </ShirtContainer>
        <div style={{ flex: 1 }}>
          <h1>{data ? data.name : <Line />}</h1>
          {data && (
            <h2>
              <Flag nationality={data.country} />{" "}
              {data.team && `[${data.team}]`}
            </h2>
          )}
        </div>
      </KuskiInfo>
      {user && data && user.id === data.id && (
        <ChangeAvatar>
          <label tabIndex="0" htmlFor="shirt">
            Change shirt
          </label>
        </ChangeAvatar>
      )}
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
          times.map((t) => {
            return (
              <TableRow key={t.id}>
                <TableCell>
                  <NavLink to={`/levels/${t.lev_id}`}>{t.lev_name}</NavLink>
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
    </Content>
  );
  return <SidebarLayout side={side} content={content} />;
};

export default Kuski;
