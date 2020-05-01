import React, { useRef, useCallback, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import format from "date-fns/format";

import socket from "../socket";
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
  word-break: break-word;
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

let autoScroll = true;

const Chat = () => {
  const messages = useSelector((state) => state.chat.messages);
  const user = useSelector((state) => state.user);
  const chatVisible = useSelector((state) => state.chat.visible);
  const [scroll, setScroll] = useState(0);
  const input = useRef(null);
  const container = useRef(null);
  const sc = useRef(null);

  useEffect(() => {
    if (sc.current && container.current) {
      sc.current.scrollTop = autoScroll
        ? container.current.offsetHeight
        : scroll;
    }
    /* eslint-disable-next-line*/
  }, [chatVisible, messages]);

  const send = useCallback(() => {
    const val = input.current.value;
    input.current.value = "";
    if (val) {
      socket.send(
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
          onScrollCapture={() => {
            if (
              sc.current.scrollTop + sc.current.offsetHeight - 24 ===
              container.current.offsetHeight
            ) {
              autoScroll = true;
            } else {
              autoScroll = false;
              setScroll(sc.current.scrollTop);
            }
          }}
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
