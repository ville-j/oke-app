import { AUTH } from "../actions";

export const user = (state = null, action) => {
  switch (action.type) {
    case AUTH:
      return action.data;
    default:
      return state;
  }
};
