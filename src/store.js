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
      const b = state.battleData.find(b => b.id === action.data.id);

      return {
        ...state,
        battleData: b
          ? [...state.battleData]
          : [...state.battleData, action.data]
      };
    }
    default: {
      return state;
    }
  }
};

export default createStore(store, applyMiddleware(thunk));
