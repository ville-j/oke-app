import { GET_KUSKI, GET_KUSKIS } from "../actions";

export const kuskis = (state = [], action) => {
  switch (action.type) {
    case GET_KUSKI:
      return state.find(k => k.id === action.data.id)
        ? state.map(k => (k.id === action.data.id ? action.data : k))
        : [...state, action.data];
    case GET_KUSKIS:
      return action.data;
    default:
      return state;
  }
};
