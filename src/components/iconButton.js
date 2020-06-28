import React from "react";
import styled, { css } from "styled-components";
import { Link } from "react-router-dom";

const style = css`
  display: inline-flex;
  padding: 12px;
  border-radius: 50%;
  color: #66af30;
  cursor: default;

  &:hover {
    background: #ebebeb;
  }
`;

const Container = styled.div`
  ${style}
`;

const LinkContainer = styled(Link)`
  ${style}
`;

const IconButton = ({ icon, onClick, url }) => {
  return url ? (
    <LinkContainer to={url}>{icon}</LinkContainer>
  ) : (
    <Container onClick={onClick}>{icon}</Container>
  );
};

export default IconButton;
