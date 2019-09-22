import React from "react";
import RecPlayer from "recplayer-react";
import { useSelector, useDispatch } from "react-redux";
import { setPlayerState } from "../actions";

const Player = ({ width, height }) => {
  const recUrl = useSelector(state => state.playerRecUrl);
  const levUrl = useSelector(state => state.playerLevUrl);
  const prePlayerState = useSelector(state => state.prePlayerState);
  const playerState = useSelector(state => state.playerState);
  const dispatch = useDispatch();
  if (!levUrl) return null;
  return (
    <RecPlayer
      recUrl={recUrl}
      levUrl={levUrl}
      height={height}
      width={width}
      autoPlay
      onFullscreenClick={() => {
        playerState !== 3
          ? dispatch(setPlayerState(3))
          : dispatch(setPlayerState(prePlayerState));
      }}
      onDockClick={() => {
        dispatch(setPlayerState(2));
      }}
    ></RecPlayer>
  );
};

export default Player;
