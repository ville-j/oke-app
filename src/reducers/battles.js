import { GET_BATTLES, GET_BATTLE } from "../actions";

export const battles = (state = { list: [], details: [] }, action) => {
  switch (action.type) {
    case GET_BATTLES:
      return {
        ...state,
        list: action.data
      };
    case GET_BATTLE:
      return {
        ...state,
        details: [
          ...state.details.filter(b => b.id !== action.data.id),
          action.data
        ]
      };
    default:
      return state;
  }
};
