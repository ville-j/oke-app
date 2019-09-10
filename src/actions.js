import { getBattle, getBattles } from "./api";
const GET_BATTLE = "GET_BATTLE";
const GET_BATTLES = "GET_BATTLES";
const LOAD_REPLAY = "LOAD_REPLAY";
const LOAD_LEVEL = "LOAD_LEVEL";
const LOAD_LEV_REC = "LOAD_LEV_REC";
const SET_PLAYER_BOUNDING_BOX = "SET_PLAYER_BOUNDING_BOX";
const SET_PLAYER_VISIBLE = "SET_PLAYER_VISIBLE";
const DOCK_PLAYER = "DOCK_PLAYER";
const UNDOCK_PLAYER = "UNDOCK_PLAYER";
const PLAYER_VIEW_LEFT = "PLAYER_VIEW_LEFT";
const FULLSCREEN_PLAYER = "FULLSCREEN_PLAYER";

const actionGetBattles = data => ({
  type: GET_BATTLES,
  data
});

const actionGetBattle = data => ({
  type: GET_BATTLE,
  data
});

const loadReplay = url => ({
  type: LOAD_REPLAY,
  url
});

const loadLevel = url => ({
  type: LOAD_LEVEL,
  url
});

const setPlayerBoundingBox = data => ({
  type: SET_PLAYER_BOUNDING_BOX,
  data
});

const setPlayerVisible = visible => ({
  type: SET_PLAYER_VISIBLE,
  visible
});

const dockPlayer = () => ({
  type: DOCK_PLAYER
});

const undockPlayer = () => ({
  type: UNDOCK_PLAYER
});

const playerViewLeft = () => ({
  type: PLAYER_VIEW_LEFT
});

const loadLevRec = data => ({
  type: LOAD_LEV_REC,
  data
});

const fullscreenPlayer = data => ({
  type: FULLSCREEN_PLAYER,
  data
});

const getBattlesAsync = () => {
  return async dispatch => {
    const data = await getBattles();
    dispatch(actionGetBattles(data));
  };
};

const getBattleAsync = id => {
  return async dispatch => {
    const data = await getBattle(id);
    dispatch(actionGetBattle({ ...data, id }));
  };
};

export {
  GET_BATTLE,
  GET_BATTLES,
  LOAD_REPLAY,
  LOAD_LEVEL,
  SET_PLAYER_BOUNDING_BOX,
  SET_PLAYER_VISIBLE,
  DOCK_PLAYER,
  PLAYER_VIEW_LEFT,
  LOAD_LEV_REC,
  FULLSCREEN_PLAYER,
  UNDOCK_PLAYER,
  getBattlesAsync,
  getBattleAsync,
  loadReplay,
  loadLevel,
  setPlayerBoundingBox,
  setPlayerVisible,
  dockPlayer,
  playerViewLeft,
  loadLevRec,
  fullscreenPlayer,
  undockPlayer
};
