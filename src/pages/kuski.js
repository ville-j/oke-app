import React, { useState } from "react";
import styled from "styled-components";
import {
  Table,
  TableRow,
  TableCell,
  Tabs,
  Tab,
  Avatar,
  Dropdown,
  CheckBox
} from "../components";

const StyledKuski = styled.div`
  display: flex;
  height: 100%;

  > div {
    flex: 1;
    :first-child {
      flex: 0 0 350px;
      border-right: 1px solid #f7f7f7;
      padding: 12px;
    }
    h1,
    h2 {
      margin: 0;
    }
    h3 {
      margin: 12px;
    }
  }
  @media (max-width: 650px) {
    flex-direction: column;
    > div:first-child {
      flex: 0;
      border-right: 0;
    }
  }
`;

const StyledAvatar = styled(Avatar)`
  margin-right: 25px;
`;

const Kuski = ({ location }) => {
  const [dd, setDd] = useState();
  const [checked, setChecked] = useState();
  return (
    <StyledKuski>
      <div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <div>
            <StyledAvatar />
          </div>
          <div>
            <h1>awsj</h1>
            <h2>[NORWICH]</h2>
          </div>
        </div>
      </div>
      <div>
        <Tabs>
          <Tab to="/">Times</Tab>
          <Tab to="/battles">Battles</Tab>
          <Tab to="/settings">Settings</Tab>
        </Tabs>
        <h3>Recent times</h3>
        <Table>
          <TableRow head>
            <TableCell style={{ width: 200 }}>Level</TableCell>
            <TableCell>Time</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>kahvia31</TableCell>
            <TableCell>15,78</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>qwquu033</TableCell>
            <TableCell>48,02</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>blaztek [EE]</TableCell>
            <TableCell>15,63</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>blaztek [EE]</TableCell>
            <TableCell>15,63</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>blaztek [EE]</TableCell>
            <TableCell>15,63</TableCell>
          </TableRow>
        </Table>
        <Dropdown
          value={dd}
          options={[{ value: 20, text: "moi" }, { value: 21, text: "auts" }]}
          onSelect={(e, value) => {
            setDd(value);
          }}
          placeholder="Select a player"
        />
        <Dropdown
          value={dd}
          options={[{ value: 20, text: "moi" }, { value: 21, text: "auts" }]}
          onSelect={(e, value) => {
            setDd(value);
          }}
          placeholder="Select a player"
        />
        <CheckBox
          text="boxi"
          checked={checked}
          onChange={(e, value) => {
            setChecked(value);
          }}
        />
      </div>
    </StyledKuski>
  );
};

export default Kuski;
