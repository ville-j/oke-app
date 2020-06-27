import React from "react";
import styled from "styled-components";

const Container = styled.div`
  overflow: auto;
  height: 100%;
`;

const View = ({ children }) => {
  return <Container>{children}</Container>;
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
