import { AUTH, SET_COUNTRY } from "../actions";

export const user = (state = null, action) => {
  switch (action.type) {
    case AUTH:
      return action.data;
    case SET_COUNTRY:
      return {
        ...state,
        country: action.data,
      };
    default:
      return state;
  }
};
