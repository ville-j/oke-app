import React from "react";
import styled, { css } from "styled-components";

const StyledCheckBox = styled.label`
  display: flex;
  padding: 12px;
  align-items: center;
  input {
    display: none;
  }
`;

const Checked = styled.div`
  width: 1em;
  height: 1em;
  margin-right: 8px;
  border: 1px solid #eaeaea;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f7f7f7;
  ${props =>
    props.checked &&
    css`
      div {
        display: block;
      }
    `}
`;

const CheckMark = styled.div`
  display: none;
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
      <Checked checked={checked}>
        <CheckMark>&#x2714;</CheckMark>
      </Checked>
      <span>{text}</span>
    </StyledCheckBox>
  );
};

export default CheckBox;
