import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import {
  GET_BATTLES,
  GET_BATTLE,
  LOAD_LEVEL,
  LOAD_REPLAY,
  LOAD_LEV_REC,
  SET_PLAYER_STATE,
  VIDEO_VIEW_LEFT,
  AUTH,
  GET_TIMES,
  GET_LEVELS,
  GET_LEVEL,
  GET_LEVEL_TIMES,
  GET_KUSKI,
  GET_KUSKI_TIMES
} from "./actions";

const initialState = {
  battles: [],
  battleData: [],
  playerRecUrl: "",
  playerLevUrl: "",
  playerState: 0,
  prePlayerState: 0,
  user: null,
  times: [],
  levels: {
    items: [],
    meta: {
      page: 1
    }
  },
  levelData: [],
  levelTimes: [],
  kuskis: [],
  kuskiTimes: []
};

const store = (state = initialState, action) => {
  switch (action.type) {
    case GET_BATTLES: {
      return { ...state, battles: action.data };
    }
    case GET_BATTLE: {
      return {
        ...state,
        battleData: [
          ...state.battleData.filter(b => b.id !== action.data.id),
          action.data
        ]
      };
    }
    case GET_KUSKI: {
      return {
        ...state,
        kuskis: [
          ...state.kuskis.filter(k => k.id !== action.data.id),
          action.data
        ]
      };
    }
    case GET_KUSKI_TIMES: {
      return {
        ...state,
        kuskiTimes: [
          ...state.kuskiTimes.filter(k => k.id !== action.data.id),
          action.data
        ]
      };
    }
    case LOAD_REPLAY: {
      return {
        ...state,
        playerRecUrl: action.url
      };
    }
    case LOAD_LEVEL: {
      return {
        ...state,
        playerLevUrl: action.url
      };
    }
    case LOAD_LEV_REC: {
      return {
        ...state,
        playerLevUrl: action.data.lev,
        playerRecUrl: action.data.rec
      };
    }
    case SET_PLAYER_STATE: {
      return {
        ...state,
        prePlayerState: state.playerState,
        playerState: action.state
      };
    }
    case VIDEO_VIEW_LEFT: {
      return {
        ...state,
        playerState: state.playerState !== 2 ? 0 : 2
      };
    }
    case AUTH: {
      return {
        ...state,
        user: action.data
      };
    }
    case GET_TIMES: {
      return {
        ...state,
        times: action.data
      };
    }
    case GET_LEVELS: {
      return {
        ...state,
        levels: action.data
      };
    }
    case GET_LEVEL: {
      return {
        ...state,
        levelData: [
          ...state.levelData.filter(l => l.id !== action.data.id),
          action.data
        ]
      };
    }
    case GET_LEVEL_TIMES: {
      return {
        ...state,
        levelTimes: action.data
      };
    }
    default: {
      return state;
    }
  }
};

export default createStore(store, applyMiddleware(thunk));
