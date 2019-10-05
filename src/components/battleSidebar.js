import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";

import { NavLink } from "react-router-dom";

const TitleBar = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 1px solid #f7f7f7;

  > * {
    display: flex;
    flex: 1;
    margin: 0;
    padding: 12px;

    :nth-child(2) {
      justify-content: center;
    }
    :nth-child(3) {
      justify-content: flex-end;
    }
  }
`;

const Line = styled.div`
  margin: 12px;
`;

const BattleSidebar = ({
  match: {
    params: { id }
  }
}) => {
  const data = useSelector(state => state.battleData.find(b => b.id === id));
  return (
    <>
      <TitleBar>
        <NavLink to={`/battles/${Number(id) + 1}`}>Next</NavLink>
        <div>{data && data.filename}.lev</div>
        <NavLink to={`/battles/${id - 1}`}>Previous</NavLink>
      </TitleBar>
      <Line>{data && data.startTime}</Line>
      <Line>Started by {data && data.designer}</Line>
    </>
  );
};

export default BattleSidebar;
