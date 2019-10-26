import React from "react";
import styled from "styled-components";

const Container = styled.div`
  min-height: 100%;
  flex: 1;
  display: flex;

  @media (max-width: 799px) {
    flex-direction: column;
  }
`;

const Side = styled.div`
  flex: 0 1 350px;
  border-right: 1px solid #f7f7f7;

  @media (max-width: 799px) {
    flex: 0;
    border: 0;
  }
`;

const Content = styled.div`
  flex: 1;
`;

const SidebarLayout = ({ side, content }) => {
  return (
    <Container>
      <Side>{side}</Side>
      <Content>{content}</Content>
    </Container>
  );
};

export default SidebarLayout;
