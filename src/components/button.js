import React from "react";
import styled, { css } from "styled-components";

const StyledButton = styled.button`
  ${props =>
    props.width
      ? css`
          width: ${props.width};
        `
      : css`
          width: 150px;
        `}
  max-width: 100%;
  padding: 12px;
  background: ${props => (props.primary ? "#66af30" : "#e4e4e4")};
  border: 0;
  font-weight: 500;
  display: inline-block;
  box-sizing: border-box;
  font-size: 1em;
  font-family: inherit;
  color: ${props => (props.primary ? "#fff" : "#333")};
  line-height: inherit;
`;

const Button = ({ text, width, style, primary, onClick }) => (
  <StyledButton
    width={width}
    style={{ ...style }}
    primary={primary}
    type="button"
    onClick={onClick}
  >
    {text}
  </StyledButton>
);

export default Button;
