import { GET_TIMES, GET_KUSKI_TIMES } from "../actions";

export const times = (state = [], action) => {
  switch (action.type) {
    case GET_TIMES:
    case GET_KUSKI_TIMES:
      const newIds = new Set(action.data.map(t => t.id));
      return [...state.filter(t => !newIds.has(t.id)), ...action.data];

    default:
      return state;
  }
};
