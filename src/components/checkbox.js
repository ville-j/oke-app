import React from "react";
import styled, { css } from "styled-components";

const StyledCheckBox = styled.label`
  display: inline-flex;
  padding: 12px;
  align-items: center;
  input {
    display: none;
  }
`;

const Checked = styled.div`
  width: 0.8em;
  height: 0.8em;
  margin-right: 5px;
  border: 1px solid #505050;
  ${props =>
    props.checked &&
    css`
      background: #505050;
    `}
`;

const CheckBox = ({ text, checked = false, onChange }) => {
  return (
    <StyledCheckBox>
      <input
        checked={checked}
        type="checkbox"
        onChange={e => {
          onChange && onChange(e, !checked);
        }}
      />
      <Checked checked={checked} />
      <span>{text}</span>
    </StyledCheckBox>
  );
};

export default CheckBox;
