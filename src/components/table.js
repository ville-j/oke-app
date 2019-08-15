import React from "react";
import styled, { css } from "styled-components";

const StyledTable = styled.div`
  display: table;
  width: 100%;
  table-layout: fixed;
  box-sizing: border-box;
`;

const StyledTableRow = styled.div`
  display: table-row;
  box-sizing: border-box;

  ${props =>
    props.head &&
    css`
      font-weight: 600;
      div {
        padding-top: 12px;
        padding-bottom: 12px;
        background: #f7f7f7;
      }
    `}
`;

const StyledTableLinkRow = styled.a`
  display: table-row;
  box-sizing: border-box;
  text-decoration: none;
  color: inherit;
  :hover {
    background: #f7f7f7;
  }
`;

const StyledTableCell = styled.div`
  display: table-cell;
  padding: 8px;
  font-size: 1em;
  box-sizing: border-box;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  :first-child {
    padding-left: 12px;
  }

  :last-child {
    padding-right: 12px;
  }
`;

const Table = ({ children }) => <StyledTable>{children}</StyledTable>;
const TableRow = props =>
  props.href ? (
    <StyledTableLinkRow {...props}>{props.children}</StyledTableLinkRow>
  ) : (
    <StyledTableRow {...props}>{props.children}</StyledTableRow>
  );
const TableCell = props => (
  <StyledTableCell {...props}>{props.children}</StyledTableCell>
);

export { Table, TableRow, TableCell };
