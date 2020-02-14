import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { Line, Timestamp } from "./";
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

const DataLine = styled.div`
  margin: 12px;
`;

const BattleSidebar = ({
  match: {
    params: { id }
  }
}) => {
  const data = useSelector(state =>
    state.battles.details.find(b => b.id === id)
  );
  return (
    <>
      <TitleBar>
        <NavLink to={`/battles/${Number(id) + 1}`}>Next</NavLink>
        <div>{(data && data.lev_name) || <Line />}</div>
        <NavLink to={`/battles/${id - 1}`}>Previous</NavLink>
      </TitleBar>
      <DataLine>
        {(data && <Timestamp time={data.created} />) || <Line />}
      </DataLine>
      <DataLine>
        {(data && `Started by ${data.starter_name}`) || <Line />}
      </DataLine>
    </>
  );
};

export default BattleSidebar;
