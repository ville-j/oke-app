import React, { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.5);
  z-index: 100;
  backdrop-filter: blur(3px);
  display: flex;
`;

const Content = styled.div`
  background: #fff;
  width: 800px;
  max-width: 100;
  margin: auto;
  height: 500px;
  position: relative;
  display: flex;
  flex-direction: column;
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
  padding: 12px 18px;
  color: #fff;
  position: absolute;
  top: 0;
  right: 0;
  cursor: pointer;
`;

const Popup = ({ title, children }) => {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;
  return (
    <Container>
      <Content>
        <Title>{title}</Title>
        <Close
          onClick={() => {
            setVisible(false);
          }}
        >
          &times;
        </Close>
        <Padding>{children}</Padding>
      </Content>
    </Container>
  );
};

export default Popup;
