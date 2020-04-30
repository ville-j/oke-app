import React, {
  useEffect,
  useRef,
  useCallback,
  useLayoutEffect,
  useState,
  useMemo,
} from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import format from "date-fns/format";

import { addMessage } from "../actions";
import { Button } from "./";

const Container = styled.div`
  position: fixed;
  height: 100%;
  right: 0;
  bottom: 0;
  width: 300px;
  background: #e6e6e6;
  border-left: 1px solid #e6e6e6;
  display: flex;
  justify-content: flex-end;
  flex-direction: column;
`;

const Line = styled.div`
  display: flex;
  margin: 12px 18px;
  background: #fff;
  padding: 8px 12px;
  border-radius: 18px;
`;

const Time = styled.div`
  font-size: 0.8em;
  padding-top: 4px;
  margin-right: 5px;
  color: #8a8a8a;
`;

const Name = styled.span`
  font-weight: 600;
  margin-right: 5px;
`;

const Message = styled.span`
  word-wrap: break-word;
`;

const MessagesWrap = styled.div`
  height: 100%;
  padding-top: 96px;
  box-sizing: border-box;
`;

const Messages = styled.div`
  height: 100%;
  max-height: 100%;
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

const Chat = () => {
  const dispatch = useDispatch();
  const messages = useSelector((state) => state.chat.messages);
  const user = useSelector((state) => state.user);
  const chatVisible = useSelector((state) => state.chat.visible);
  const [scroll, setScroll] = useState(false);
  const input = useRef(null);
  const container = useRef(null);
  const sc = useRef(null);

  const ws = useMemo(() => {
    const socket = new WebSocket(process.env.REACT_APP_CHAT_SERVER_URI);
    socket.addEventListener("open", () => {
      console.log("open");
    });
    return socket;
  }, []);

  useEffect(() => {
    return () => {
      console.log("close");
      ws.close();
    };
    /* eslint-disable-next-line*/
  }, []);

  useEffect(() => {
    if (user) {
      const f = () => {
        console.log("auth");
        ws.send(
          JSON.stringify({
            type: "auth",
            data: {
              token: localStorage.getItem("token"),
            },
          })
        );
      };
      if (ws.readyState === 1) {
        f();
      } else {
        ws.addEventListener("open", () => {
          f();
        });
      }
    }
    /* eslint-disable-next-line*/
  }, [user]);

  const f = useCallback(() => {
    if (chatVisible) {
      if (container.current.offsetHeight > sc.current.offsetHeight) {
        setScroll(true);
      }
      if (sc && container && container.current) {
        sc.current.scrollTop = container.current.offsetHeight;
      }
    }
  }, [chatVisible]);

  useLayoutEffect(() => {
    if (!scroll) {
      setTimeout(() => {
        f();
      }, 1);
    } else {
      f();
    }
    /* eslint-disable-next-line*/
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
    /* eslint-disable-next-line*/
  }, []);

  if (!chatVisible) return null;

  return (
    <Container>
      <MessagesWrap>
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
                <div>
                  <Name>{m.name}</Name>
                  <Message>{m.message}</Message>
                </div>
              </Line>
            ))}
          </div>
        </Messages>
      </MessagesWrap>
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
          <Button text="Send" width="auto" onClick={send} primary />
        </Input>
      )}
    </Container>
  );
};

export default Chat;
