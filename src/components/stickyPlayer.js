import React from "react";
import styled from "styled-components";
import RecPlayer from "recplayer-react";
import { useSelector, useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";
import { dockPlayer } from "../actions";

const Container = styled.div.attrs(props => ({
  style: {
    left: !props.playerDocked ? props.x : "",
    top: !props.playerDocked ? props.y : "",
    width: props.width,
    height: props.height,
    right: props.playerDocked ? 0 : "",
    bottom: props.playerDocked ? 0 : ""
  }
}))`
  position: fixed;
  z-index: 20;
`;

const Dock = styled.div`
  background: red;
  width: 50px;
  height: 50px;
  position: absolute;
  right: 0;
  bottom: 0;
`;

const StickyPlayer = ({ history }) => {
  const dispatch = useDispatch();
  const visible = useSelector(state => state.playerVisible);
  const recUrl = useSelector(state => state.playerRecUrl);
  const levUrl = useSelector(state => state.playerLevUrl);
  const playerDocked = useSelector(state => state.playerDocked);
  const { x, y, width, height } = useSelector(state => state.playerBoundingBox);
  if (!visible) return null;
  return (
    <Container
      x={x}
      y={y}
      width={width}
      height={height}
      playerDocked={playerDocked}
    >
      <RecPlayer
        recUrl={recUrl}
        levUrl={levUrl}
        autoPlay
        width={width}
        height={height}
      />
      <Dock
        onClick={() => {
          dispatch(dockPlayer());
          history.push("/battles");
        }}
      />
    </Container>
  );
};

export default withRouter(StickyPlayer);
