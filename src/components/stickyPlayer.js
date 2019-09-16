import React from "react";
import styled from "styled-components";
import RecPlayer from "recplayer-react";
import { useSelector, useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";
import { dockPlayer, fullscreenPlayer } from "../actions";

const Container = styled.div.attrs(props => ({
  style: {
    left: !props.playerDocked ? (props.fullscreen ? 0 : props.x) : "",
    top: !props.playerDocked ? (props.fullscreen ? 0 : props.y) : "",
    width: props.width,
    height: props.height,
    right: props.playerDocked ? 0 : "",
    bottom: props.playerDocked ? 0 : "",
    zIndex: props.fullscreen ? 100 : 10,
    position: "fixed"
  }
}))``;

const Dock = styled.div`
  background: red;
  width: 50px;
  height: 50px;
  position: absolute;
  right: 0;
  top: 0;
`;

const StickyPlayer = ({ history }) => {
  const dispatch = useDispatch();
  const visible = useSelector(state => state.playerVisible);
  const recUrl = useSelector(state => state.playerRecUrl);
  const levUrl = useSelector(state => state.playerLevUrl);
  const playerDocked = useSelector(state => state.playerDocked);
  const { x, y, width, height } = useSelector(state => state.playerBoundingBox);
  const playerFullscreen = useSelector(state => state.playerFullscreen);

  if (!visible || !levUrl) return null;

  return (
    <Container
      x={x}
      y={y}
      width={playerFullscreen ? document.documentElement.clientWidth : width}
      height={playerFullscreen ? window.innerHeight : height}
      playerDocked={playerDocked}
      fullscreen={playerFullscreen}
    >
      <RecPlayer
        recUrl={recUrl}
        levUrl={levUrl}
        autoPlay
        width={playerFullscreen ? document.documentElement.clientWidth : width}
        height={playerFullscreen ? window.innerHeight : height}
        onFullscreenClick={() => {
          dispatch(fullscreenPlayer(!playerFullscreen));
        }}
        {...(playerDocked ? { zoom: 0.5 } : {})}
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
