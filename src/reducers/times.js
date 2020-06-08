import { GET_TIMES, GET_KUSKI_TIMES } from "../actions";

export const times = (
  state = {
    recentTimes: [],
    kuskiTimes: [],
  },
  action
) => {
  switch (action.type) {
    case GET_KUSKI_TIMES:
      return { ...state, kuskiTimes: action.data };
    case GET_TIMES:
      return { ...state, recentTimes: action.data };
    default:
      return state;
  }
};
