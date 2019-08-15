import React from "react";
import styled from "styled-components";
import { Table, TableRow, TableCell } from "./";

const StyledLevelCard = styled.div`
  background: #fff;
`;

const LevImage = styled.div`
  height: 200px;
  background: #424248;
`;

const ResultsLink = styled.a`
  display: inline-block;
  text-decoration: none;
  color: #ce1c7d;
  font-size: 1.1em;
  margin: 12px;
  margin-top: 0;
  padding: 8px;
`;

const Divider = styled.div`
  height: 1px;
  background: #f7f7f7;
  margin: 12px;
`;

const LevelCard = ({ children }) => (
  <StyledLevelCard>
    <LevImage />
    <Table>
      <TableRow head>
        <TableCell style={{ width: 50 }}>#</TableCell>
        <TableCell>Kuski</TableCell>
        <TableCell>Time</TableCell>
      </TableRow>
      <TableRow>
        <TableCell>1.</TableCell>
        <TableCell>awsj [NORWICH]</TableCell>
        <TableCell>15,78</TableCell>
      </TableRow>
      <TableRow href="home">
        <TableCell>2.</TableCell>
        <TableCell>blaztek [EE]</TableCell>
        <TableCell>15,63</TableCell>
      </TableRow>
      <TableRow>
        <TableCell>3.</TableCell>
        <TableCell>blaztek [EE]</TableCell>
        <TableCell>15,63</TableCell>
      </TableRow>
    </Table>
    <Divider />
    <ResultsLink href="asd">Full results</ResultsLink>
  </StyledLevelCard>
);

export default LevelCard;
