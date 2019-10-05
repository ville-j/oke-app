import { getBattle, getBattles, auth } from "./api";
const GET_BATTLE = "GET_BATTLE";
const GET_BATTLES = "GET_BATTLES";
const LOAD_REPLAY = "LOAD_REPLAY";
const LOAD_LEVEL = "LOAD_LEVEL";
const LOAD_LEV_REC = "LOAD_LEV_REC";
const SET_PLAYER_STATE = "SET_PLAYER_STATE";
const VIDEO_VIEW_LEFT = "VIDEO_VIEW_LEFT";
const AUTH = "AUTH";

const actionGetBattles = data => ({
  type: GET_BATTLES,
  data
});

const actionGetBattle = data => ({
  type: GET_BATTLE,
  data
});

const actionAuth = data => ({
  type: AUTH,
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

const loadLevRec = data => ({
  type: LOAD_LEV_REC,
  data
});

const setPlayerState = state => ({
  type: SET_PLAYER_STATE,
  state
});

const videoViewLeft = () => ({
  type: VIDEO_VIEW_LEFT
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

const getUser = () => {
  return async dispatch => {
    try {
      const data = await auth();
      dispatch(actionAuth({ ...data }));
    } catch (e) {
      dispatch(actionAuth(null));
    }
  };
};

export {
  GET_BATTLE,
  GET_BATTLES,
  LOAD_REPLAY,
  LOAD_LEVEL,
  LOAD_LEV_REC,
  SET_PLAYER_STATE,
  VIDEO_VIEW_LEFT,
  AUTH,
  getBattlesAsync,
  getBattleAsync,
  loadReplay,
  loadLevel,
  loadLevRec,
  setPlayerState,
  videoViewLeft,
  getUser
};
