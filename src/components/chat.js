import React, {
  useEffect,
  useRef,
  useCallback,
  useLayoutEffect,
  useState,
} from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import format from "date-fns/format";

import { addMessage } from "../actions";
import { Button } from "./";

const Container = styled.div`
  position: fixed;
  right: 0;
  bottom: 0;
  width: 300px;
  background: #fff;
  border-left: 1px solid #d2d2d2;
  border-top: 1px solid #d2d2d2;
  display: flex;
  justify-content: flex-end;
  flex-direction: column;
`;

const Line = styled.div`
  display: flex;
  margin: 2px 18px;
`;

const Time = styled.div`
  font-size: 0.9em;
  padding-top: 2px;
  margin-right: 5px;
`;

const Name = styled.div`
  margin-right: 5px;
  font-weight: 600;
`;

const Message = styled.div``;

const Messages = styled.div`
  height: 300px;
  max-height: 300px;
  overflow: auto;
  box-sizing: border-box;
`;

const Input = styled.div`
  border-top: 1px solid #d2d2d2;
  display: flex;
  > input {
    border: 0;
    padding: 12px;
    font-family: inherit;
    color: inherit;
    box-sizing: border-box;
    flex: 1;
  }
`;

const ws = new WebSocket(process.env.REACT_APP_CHAT_SERVER_URI);

ws.addEventListener("open", () => {
  console.log("connected");
});

const Chat = () => {
  const dispatch = useDispatch();
  const messages = useSelector((state) => state.chat.messages);
  const user = useSelector((state) => state.user);
  const [scroll, setScroll] = useState(false);
  const input = useRef(null);
  const container = useRef(null);
  const sc = useRef(null);

  useEffect(() => {
    if (user) {
      ws.send(
        JSON.stringify({
          type: "auth",
          data: {
            token: localStorage.getItem("token"),
          },
        })
      );
    }
  }, [user]);

  useLayoutEffect(() => {
    if (container.current) {
      if (container.current.offsetHeight > 300) {
        setScroll(true);
      }
      if (sc.current) sc.current.scrollTop = container.current.offsetHeight;
    }
  }, [messages]);

  useEffect(() => {
    ws.addEventListener("message", (data) => {
      try {
        const m = JSON.parse(data.data);

        if (m.type === "message") {
          dispatch(addMessage(m.data));
        }
      } catch (e) {
        console.log(e);
      }
    });
    /* eslint-disable-next-line*/
  }, []);

  const send = useCallback(() => {
    const val = input.current.value;
    input.current.value = "";
    if (val) {
      ws.send(
        JSON.stringify({
          type: "message",
          data: {
            channel: "#main",
            message: val,
          },
        })
      );
    }
  }, []);

  return (
    <Container>
      <Messages
        ref={sc}
        style={
          scroll
            ? {}
            : {
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
              }
        }
      >
        <div ref={container}>
          {messages.map((m, i) => (
            <Line key={i}>
              <Time>{format(m.date, "HH:mm")}</Time>
              <Name>{m.name}</Name>
              <Message>{m.message}</Message>
            </Line>
          ))}
        </div>
      </Messages>
      {user && (
        <Input>
          <input
            placeholder="Type here"
            type="text"
            ref={input}
            onKeyDown={(e) => {
              e.which === 13 && send();
            }}
          />
          <Button text="Send" width="auto" onClick={send} />
        </Input>
      )}
    </Container>
  );
};

export default Chat;
