import React from "react";
import styled from "styled-components";
import { X } from "react-feather";
import { IconButton } from "./";

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.5);
  z-index: 100;
  backdrop-filter: blur(8px);
  display: flex;
`;

const Content = styled.div`
  background: #fff;
  width: 400px;
  max-width: 100%;
  margin: auto;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  text-align: left;
`;

const Title = styled.div`
  background: #66af30;
  color: #fff;
  padding: 12px;
`;

const Padding = styled.div`
  padding: 12px;
  border: 2px solid #f7f7f7;
  border-top: 0;
  flex: 1;
`;

const Close = styled.div`
  color: #fff;
  position: absolute;
  top: 0;
  right: 0;
`;

const Popup = ({ title, children, onClose }) => {
  return (
    <Container>
      <Content>
        <Title>{title}</Title>
        <Close onClick={onClose}>
          <IconButton icon={<X />} />
        </Close>
        <Padding>{children}</Padding>
      </Content>
    </Container>
  );
};

export default Popup;
