import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { GET_BATTLES, GET_BATTLE } from "./actions";

const initialState = {
  battles: [],
  battleData: []
};

const store = (state = initialState, action) => {
  switch (action.type) {
    case GET_BATTLES: {
      return { ...state, battles: action.data };
    }
    case GET_BATTLE: {
      return {
        ...state,
        battleData: [
          ...state.battleData.filter(b => b.id !== action.data.id),
          action.data
        ]
      };
    }
    default: {
      return state;
    }
  }
};

export default createStore(store, applyMiddleware(thunk));
