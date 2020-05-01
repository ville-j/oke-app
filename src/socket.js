const socket = () => {
  let ws;
  const callbacks = {
    message: [],
    open: [],
  };

  const connect = () => {
    ws = new WebSocket(process.env.REACT_APP_CHAT_SERVER_URI);

    ws.addEventListener("close", () => {
      setTimeout(() => {
        connect();
      }, 1000);
    });

    ws.addEventListener("open", () => {
      callbacks["open"].forEach((f) => f());
    });

    ws.addEventListener("message", (data) => {
      callbacks["message"].forEach((f) => f(data));
    });
  };

  connect();

  return {
    on: (ev, f) => {
      callbacks[ev].push(f);
    },
    send: (data) => {
      ws.send(data);
    },
    auth: (token) => {
      ws.send(
        JSON.stringify({
          type: "auth",
          data: {
            token,
          },
        })
      );
    },
  };
};

export default socket();
