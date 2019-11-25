import { GET_LEVELS, GET_LEVEL, GET_LEVEL_TIMES } from "../actions";

export const levels = (
  state = {
    list: {
      items: [],
      meta: {
        page: 1
      }
    },
    details: [],
    times: []
  },
  action
) => {
  switch (action.type) {
    case GET_LEVELS: {
      return {
        ...state,
        list: action.data
      };
    }
    case GET_LEVEL: {
      return {
        ...state,
        details: [
          ...state.details.filter(l => l.id !== action.data.id),
          action.data
        ]
      };
    }
    case GET_LEVEL_TIMES: {
      return {
        ...state,
        times: action.data
      };
    }
    default:
      return state;
  }
};
