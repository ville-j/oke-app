import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { addMessage, setHistory } from "./actions";
import store from "./store";
import "normalize.css";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import socket from "./socket";
import { UpdateSW } from "./components";

socket.on("message", ({ data }) => {
  const json = JSON.parse(data);
  switch (json.type) {
    case "message":
      store.dispatch(addMessage(json.data));
      break;
    case "history":
      store.dispatch(setHistory(json.data));
      break;
    default:
  }
});

socket.on("open", () => {
  socket.auth(localStorage.getItem("token"));
});

ReactDOM.render(
  <Provider store={store}>
    <App />
    <UpdateSW />
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
