import React, { useRef, useCallback, useEffect, useLayoutEffect } from "react";
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
  padding-top: 50px;
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

const Messages = styled.div`
  height: 100%;
  max-height: 100%;
  overflow: auto;
`;

const Input = styled.div`
  border-top: 1px solid #d2d2d2;
  display: flex;
  height: 50px;
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
let scroll = 0;
let h = 0;

const Chat = () => {
  const messages = useSelector((state) => state.chat.messages);
  const user = useSelector((state) => state.user);
  const chatVisible = useSelector((state) => state.chat.visible);
  const input = useRef(null);
  const container = useRef(null);
  const sc = useRef(null);

  useLayoutEffect(() => {
    if (chatVisible) h = sc.current.offsetHeight;
  }, [chatVisible]);

  useEffect(() => {
    setTimeout(() => {
      if (sc.current && container.current) {
        sc.current.scrollTop = autoScroll
          ? container.current.offsetHeight - h + 24
          : scroll;
      }
    }, 10);

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
      <Messages
        ref={sc}
        onScroll={() => {
          if (sc.current.scrollTop + h + 100 > container.current.offsetHeight) {
            autoScroll = true;
          } else {
            autoScroll = false;
            scroll = sc.current.scrollTop;
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
      <Input>
        <input
          disabled={!user}
          placeholder={user ? "Type here" : "Log in to chat"}
          type="text"
          ref={input}
          onKeyDown={(e) => {
            e.which === 13 && send();
          }}
        />
        {user && <Button text="Send" width="auto" onClick={send} primary />}
      </Input>
    </Container>
  );
};

export default Chat;
