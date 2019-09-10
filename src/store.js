import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import {
  GET_BATTLES,
  GET_BATTLE,
  LOAD_LEVEL,
  LOAD_REPLAY,
  SET_PLAYER_BOUNDING_BOX,
  SET_PLAYER_VISIBLE,
  DOCK_PLAYER,
  UNDOCK_PLAYER,
  PLAYER_VIEW_LEFT,
  LOAD_LEV_REC,
  FULLSCREEN_PLAYER
} from "./actions";

const initialState = {
  battles: [],
  battleData: [],
  playerVisible: false,
  playerRecUrl: "",
  playerLevUrl: "",
  playerBoundingBox: {
    x: 0,
    y: 0,
    width: 0,
    height: 0
  },
  playerDocked: false,
  prePlayerDocked: false,
  playerFullscreen: false
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
    case SET_PLAYER_BOUNDING_BOX: {
      return {
        ...state,
        playerBoundingBox: action.data
      };
    }
    case SET_PLAYER_VISIBLE: {
      return {
        ...state,
        playerVisible: action.visible
      };
    }
    case PLAYER_VIEW_LEFT: {
      return {
        ...state,
        playerVisible: state.playerDocked
      };
    }
    case DOCK_PLAYER: {
      return {
        ...state,
        playerDocked: true,
        playerFullscreen: false,
        playerBoundingBox: {
          x: 0,
          y: 0,
          width: 350,
          height: 200
        }
      };
    }
    case UNDOCK_PLAYER: {
      return {
        ...state,
        playerDocked: false
      };
    }
    case FULLSCREEN_PLAYER: {
      return {
        ...state,
        prePlayerDocked: state.playerDocked,
        playerDocked: action.data ? false : state.prePlayerDocked,
        playerFullscreen: action.data || false
      };
    }
    default: {
      return state;
    }
  }
};

export default createStore(store, applyMiddleware(thunk));
