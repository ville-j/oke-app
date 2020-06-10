import { AUTH, SET_COUNTRY, SET_TEAM } from "../actions";

export const user = (state = null, action) => {
  switch (action.type) {
    case AUTH:
      return action.data;
    case SET_COUNTRY:
      return {
        ...state,
        country: action.data,
      };
    case SET_TEAM:
      return {
        ...state,
        team: action.data,
      };
    default:
      return state;
  }
};
