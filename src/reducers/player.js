import {
  LOAD_LEVEL,
  LOAD_REPLAY,
  LOAD_LEV_REC,
  SET_PLAYER_STATE,
  VIDEO_VIEW_LEFT
} from "../actions";

export const player = (
  state = {
    playerRecUrl: "",
    playerLevUrl: "",
    playerState: 0,
    prePlayerState: 0
  },
  action
) => {
  switch (action.type) {
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
    default: {
      return state;
    }
  }
};
