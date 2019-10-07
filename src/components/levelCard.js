import React, { useState } from "react";
import styled, { css } from "styled-components";
import { NavLink } from "react-router-dom";

import { Table, TableRow, TableCell } from "./";

const StyledLevelCard = styled.div`
  background: #fff;
  height: 100%;
  position: relative;
  padding-bottom: 60px;
  box-shadow: 1px 1px 4px 0px #eaeaea;
`;

const Image = styled.div`
  height: 200px;
  > div {
    ${props =>
      props.fullscreen &&
      css`
        top: 0;
        left: 0;
        position: fixed;
        z-index: 99;
      `}
    width: 100%;
    height: 100%;
    background: #333;
    border: 10px solid #333;
    ${props =>
      props.level &&
      css`background-image: url("${
        process.env.REACT_APP_API_URL
      }/levelimage/${props => props.level}");`}
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
  }
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

const LevelImage = ({ level }) => {
  const [fs, setFs] = useState(false);
  return (
    <Image
      level={level}
      fullscreen={fs}
      onClick={() => {
        setFs(!fs);
      }}
    >
      <div></div>
    </Image>
  );
};

const LevelCard = ({ times, id, level }) => (
  <StyledLevelCard>
    <LevelImage level={level} />
    <Table>
      <TableRow head>
        <TableCell style={{ width: 50 }}>#</TableCell>
        <TableCell>Kuski</TableCell>
        <TableCell>Time</TableCell>
      </TableRow>
      {[...times].splice(0, 3).map((t, i) => (
        <TableRow key={i}>
          <TableCell>{t.position}.</TableCell>
          <TableCell>{t.kuski}</TableCell>
          <TableCell>{t.time}</TableCell>
        </TableRow>
      ))}
    </Table>
    <ResultsLink to={`/battles/${id}`}>Full info</ResultsLink>
  </StyledLevelCard>
);

export default LevelCard;
