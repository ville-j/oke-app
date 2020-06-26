import {
  GET_LEVELS,
  GET_LEVEL,
  GET_LEVEL_TIMES,
  GET_LEVEL_PACKS,
  GET_LEVEL_PACK,
} from "../actions";

export const levels = (
  state = {
    list: {
      items: [],
      meta: {
        page: 1,
      },
    },
    details: [],
    times: [],
    packs: {
      items: [],
      meta: {
        page: 1,
      },
    },
    packDetails: {},
  },
  action
) => {
  switch (action.type) {
    case GET_LEVELS: {
      return {
        ...state,
        list: action.data,
      };
    }
    case GET_LEVEL: {
      return {
        ...state,
        details: [
          ...state.details.filter((l) => l.id !== action.data.id),
          action.data,
        ],
      };
    }
    case GET_LEVEL_TIMES: {
      return {
        ...state,
        times: { ...state.times, [action.id]: action.data },
      };
    }
    case GET_LEVEL_PACKS: {
      return {
        ...state,
        packs: action.data,
      };
    }
    case GET_LEVEL_PACK: {
      return {
        ...state,
        packDetails: {
          ...state.packDetails,
          [action.data.name_short.toLowerCase()]: action.data,
        },
      };
    }
    default:
      return state;
  }
};
