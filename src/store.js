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
  PLAYER_VIEW_LEFT
} from "./actions";

const initialState = {
  battles: [],
  battleData: [],
  playerVisible: false,
  playerRecUrl: "https://elma.online/dl/battlereplay/145543",
  playerLevUrl: "https://elma.online/dl/level/438609",
  playerBoundingBox: {
    x: 0,
    y: 0,
    width: 0,
    height: 0
  },
  playerDocked: false
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
    case SET_PLAYER_BOUNDING_BOX: {
      return {
        ...state,
        playerDocked: false,
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
        playerBoundingBox: {
          x: 0,
          y: 0,
          width: 300,
          height: 200
        }
      };
    }
    default: {
      return state;
    }
  }
};

export default createStore(store, applyMiddleware(thunk));
