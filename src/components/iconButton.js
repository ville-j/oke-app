import React from "react";
import styled, { css } from "styled-components";
import { Link } from "react-router-dom";

const style = css`
  display: inline-flex;
  padding: 10px !important;
  border-radius: 50%;
  cursor: default;

  &:hover {
    background: rgba(0, 0, 0, 0.1);
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
    <Container
      tabIndex="0"
      onKeyDown={(e) => {
        e.keyCode === 13 && onClick && onClick();
      }}
      role="button"
      onClick={onClick}
    >
      {icon}
    </Container>
  );
};

export default IconButton;
