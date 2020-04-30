import { ADD_MESSAGE, TOGGLE_CHAT } from "../actions";

export const chat = (state = { messages: [], visible: true }, action) => {
  switch (action.type) {
    case TOGGLE_CHAT:
      return {
        ...state,
        visible: !state.visible,
      };
    case ADD_MESSAGE:
      const obj =
        action.data.name === "@"
          ? {
              name: action.data.message.split(":")[0],
              message: action.data.message.split(": ").slice(1).join(": "),
            }
          : action.data;
      return {
        ...state,
        messages: [...state.messages, { ...obj, date: new Date() }],
      };
    default:
      return state;
  }
};
