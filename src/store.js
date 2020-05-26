import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { kuskis } from "./reducers/kuskis";
import { times } from "./reducers/times";
import { battles } from "./reducers/battles";
import { user } from "./reducers/user";
import { levels } from "./reducers/levels";
import { player } from "./reducers/player";
import { chat } from "./reducers/chat";

export default createStore(
  combineReducers({ kuskis, times, battles, levels, user, player, chat }),
  applyMiddleware(thunk)
);
