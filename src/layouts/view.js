import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Scrollbars } from "react-custom-scrollbars";

const Container = styled.div`
  overflow: auto;
  height: 100%;
`;

const View = ({ children }) => {
  const f = () => window.innerWidth > 799;
  const [customScroll, setCustomScroll] = useState(f());

  useEffect(() => {
    const g = () => {
      setCustomScroll(f());
    };
    window.addEventListener("resize", g);
    return () => {
      window.removeEventListener("resize", g);
    };
  }, []);
  return (
    <Container>
      {customScroll ? <Scrollbars>{children}</Scrollbars> : children}
    </Container>
  );
};

const MultiView = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const ScrollViewContainer = styled.div`
  overflow: auto;
  flex: 1;
`;

const ScrollView = ({ children }) => (
  <ScrollViewContainer>
    <View>{children}</View>
  </ScrollViewContainer>
);

export { View, MultiView, ScrollView };
