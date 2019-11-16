import {
  getBattle,
  getBattles,
  auth,
  getTimes,
  getLevels,
  getLevel,
  getLevelTimes,
  getKuski,
  getKuskis,
  getKuskiTimes
} from "./api";
const GET_BATTLE = "GET_BATTLE";
const GET_BATTLES = "GET_BATTLES";
const LOAD_REPLAY = "LOAD_REPLAY";
const LOAD_LEVEL = "LOAD_LEVEL";
const LOAD_LEV_REC = "LOAD_LEV_REC";
const SET_PLAYER_STATE = "SET_PLAYER_STATE";
const VIDEO_VIEW_LEFT = "VIDEO_VIEW_LEFT";
const AUTH = "AUTH";
const GET_TIMES = "GET_TIMES";
const GET_LEVEL_TIMES = "GET_LEVEL_TIMES";
const GET_LEVELS = "GET_LEVELS";
const GET_LEVEL = "GET_LEVEL";
const GET_KUSKI = "GET_KUSKI";
const GET_KUSKIS = "GET_KUSKIS";
const GET_KUSKI_TIMES = "GET_KUSKI_TIMES";

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

const actionGetTimes = data => ({
  type: GET_TIMES,
  data
});

const actionGetLevelTimes = data => ({
  type: GET_LEVEL_TIMES,
  data
});

const actionGetLevels = data => ({
  type: GET_LEVELS,
  data
});

const actionGetLevel = data => ({
  type: GET_LEVEL,
  data
});

const actionGetKuski = data => ({
  type: GET_KUSKI,
  data
});

const actionGetKuskis = data => ({
  type: GET_KUSKIS,
  data
});

const actionGetKuskiTimes = data => ({
  type: GET_KUSKI_TIMES,
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

const getTimesAsync = () => {
  return async dispatch => {
    const data = await getTimes();
    dispatch(actionGetTimes(data));
  };
};

const getLevelsAsync = page => {
  return async dispatch => {
    const data = await getLevels(page);
    dispatch(actionGetLevels(data));
  };
};

const getLevelAsync = id => {
  return async dispatch => {
    const data = await getLevel(id);
    dispatch(actionGetLevel(data));
  };
};

const getLevelTimesAsync = id => {
  return async dispatch => {
    const data = await getLevelTimes(id);
    dispatch(actionGetLevelTimes(data));
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

const getKuskiAsync = name => {
  return async dispatch => {
    const data = await getKuski(name);
    dispatch(actionGetKuski(data));
  };
};

const getKuskisAsync = () => {
  return async dispatch => {
    const data = await getKuskis();
    dispatch(actionGetKuskis(data));
  };
};

const getKuskiTimesAsync = id => {
  return async dispatch => {
    const data = await getKuskiTimes(id);
    dispatch(actionGetKuskiTimes({ id, data }));
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
  GET_TIMES,
  GET_LEVELS,
  GET_LEVEL,
  GET_LEVEL_TIMES,
  GET_KUSKI,
  GET_KUSKIS,
  GET_KUSKI_TIMES,
  getBattlesAsync,
  getBattleAsync,
  loadReplay,
  loadLevel,
  loadLevRec,
  setPlayerState,
  videoViewLeft,
  getUser,
  getTimesAsync,
  getLevelsAsync,
  getLevelAsync,
  getLevelTimesAsync,
  getKuskiAsync,
  getKuskisAsync,
  getKuskiTimesAsync
};
