import React from "react";
import styled from "styled-components";

const StyledTextBox = styled.input`
  padding: 12px;
  font-family: inherit;
  border: 0;
  background: #f7f7f7;
  line-height: 1.5;
`;
const TextBox = ({ text }) => <StyledTextBox>{text}</StyledTextBox>;

export default TextBox;
