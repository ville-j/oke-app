import React from "react";
import styled from "styled-components";

const StyledNotFound = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const NotFound = () => (
  <StyledNotFound>
    <h1>404 not found</h1>
  </StyledNotFound>
);

export default NotFound;
