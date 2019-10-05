import React from "react";
import styled from "styled-components";

const StyledLabel = styled.span`
display: inline-block
  padding: 8px 0;
`;
const Label = ({ text }) => <StyledLabel>{text}</StyledLabel>;

export default Label;
