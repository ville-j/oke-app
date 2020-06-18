import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

import { Table, TableRow, TableCell, LevelImage, Time, Flag } from "./";

const StyledLevelCard = styled.div`
  background: #fff;
  height: 100%;
  position: relative;
  padding-bottom: 60px;
  box-shadow: 1px 1px 4px 0px #eaeaea;
`;

const ResultsLink = styled(NavLink)`
  display: inline-block;
  text-decoration: none;
  color: #66af30;
  font-size: 1.1em;
  margin: 12px;
  margin-top: 0;
  padding: 8px;
  position: absolute;
  bottom: 0;

  :hover {
    text-decoration: underline;
  }
`;

const LevelCard = ({ times, id, level, head }) => (
  <StyledLevelCard>
    {head && head}
    <LevelImage level={level} height="200px" />
    <Table>
      <TableRow head>
        <TableCell style={{ width: 50 }}>#</TableCell>
        <TableCell>Kuski</TableCell>
        <TableCell>Time</TableCell>
      </TableRow>
      {[...times].splice(0, 3).map((t, i) => (
        <TableRow key={i}>
          <TableCell>{i + 1}.</TableCell>
          <TableCell>
            <Flag nationality={t.kuski_country} />{" "}
            <NavLink to={`/kuskis/${t.kuski}`}>{t.kuski}</NavLink>
            {t.team && ` [${t.team}]`}
          </TableCell>
          <TableCell>
            <Time time={t.time} />
          </TableCell>
        </TableRow>
      ))}
    </Table>
    <ResultsLink to={`/battles/${id}`}>Full info</ResultsLink>
  </StyledLevelCard>
);

export default LevelCard;
