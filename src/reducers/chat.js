import { ADD_MESSAGE, TOGGLE_CHAT, SET_HISTORY } from "../actions";

const parseMessage = (data) => ({
  ...(data.name === "@"
    ? {
        name: data.message.split(":")[0],
        message: data.message.split(": ").slice(1).join(": "),
      }
    : data),
  date: data.date ? new Date(data.date) : new Date(),
});

export const chat = (state = { messages: [], visible: true }, action) => {
  switch (action.type) {
    case TOGGLE_CHAT:
      return {
        ...state,
        visible: !state.visible,
      };
    case ADD_MESSAGE:
      return {
        ...state,
        messages: [...state.messages, parseMessage(action.data)],
      };
    case SET_HISTORY:
      return {
        ...state,
        messages: [...action.data.map((m) => parseMessage(m))],
      };
    default:
      return state;
  }
};
