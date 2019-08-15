import React from "react";
import styled, { css } from "styled-components";

const StyledButton = styled.button`
  ${props =>
    props.width
      ? css`
          width: ${props.width};
        `
      : css`
          width: 200px;
        `}
  max-width: 100%;
  padding: 12px;
  background: #e4e4e4;
  border: 0;
  font-weight: 500;
  display: inline-block;
  box-sizing: border-box;
  font-size: 1em;
  font-family: inherit;
  color: inherit;
  line-height: inherit;
`;

const Button = ({ text, width }) => (
  <StyledButton width={width}>{text}</StyledButton>
);

export default Button;
