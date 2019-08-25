import React from "react";
import styled from "styled-components";

const StyledLabel = styled.span`
  padding: 8px 12px;
`;
const Label = ({ text }) => <StyledLabel>{text}</StyledLabel>;

export default Label;
