import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "react-feather";
import { Line, Timestamp } from "./";
import { battleType } from "../utils";

const TitleBar = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 1px solid #f7f7f7;

  > * {
    display: flex;
    flex: 1;
    margin: 0;
    padding: 12px;
    box-sizing: border-box;

    :nth-child(1) {
      flex: 0 0 50px;
    }
    :nth-child(2) {
      justify-content: center;
    }
    :nth-child(3) {
      justify-content: flex-end;
      flex: 0 0 50px;
    }
  }
`;

const DataLine = styled.div`
  margin: 12px;
`;

const BattleSidebar = ({
  match: {
    params: { id },
  },
}) => {
  const data = useSelector((state) =>
    state.battles.details.find((b) => b.id === id)
  );
  return (
    <>
      <TitleBar>
        <NavLink to={`/battles/${Number(id) + 1}`}>
          <ChevronLeft /> newer
        </NavLink>
        <div>{(data && `${data.lev_name}.lev`) || <Line />}</div>
        <NavLink to={`/battles/${id - 1}`}>
          older <ChevronRight />
        </NavLink>
      </TitleBar>
      <DataLine>
        {(data && <Timestamp time={data.created} />) || <Line />}
      </DataLine>
      <DataLine>
        {(data && `Started by ${data.starter_name}`) || <Line />}
      </DataLine>
      <DataLine>
        {(data && `${data.duration}m ${battleType(data.type)} battle`) || (
          <Line />
        )}
      </DataLine>
    </>
  );
};

export default BattleSidebar;
