import { AUTH } from "../actions";

export const user = (state = {}, action) => {
  switch (action.type) {
    case AUTH:
      return action.data;
    default:
      return state;
  }
};
