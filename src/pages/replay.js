import React from "react";
import styled from "styled-components";
import RecPlayer from "recplayer-react";

const PlayerContainer = styled.div`
  height: 600px;
`;

const Replay = () => (
  <PlayerContainer>
    <RecPlayer autoFill />
  </PlayerContainer>
);

export default Replay;
