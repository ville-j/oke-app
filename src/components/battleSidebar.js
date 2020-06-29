import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { ChevronLeft, ChevronRight } from "react-feather";
import { Line, Timestamp, Header, IconButton } from "./";
import { battleType } from "../utils";

const TitleBar = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 1px solid #f7f7f7;

  > * {
    display: flex;
    margin: 0;
    padding: 12px !important;

    :nth-child(2) {
      justify-content: center;
      flex: 1;
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
        <IconButton icon={<ChevronLeft />} url={`/battles/${Number(id) + 1}`} />
        <div>
          <Header>{(data && `${data.lev_name}.lev`) || <Line />}</Header>
        </div>
        <IconButton icon={<ChevronRight />} url={`/battles/${id - 1}`} />
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
