import React from "react";
import styled from "styled-components";

const StyledTextBox = styled.input`
  padding: 12px;
  font-family: inherit;
  border: 0;
  background: #f7f7f7;
  line-height: 1.5;
  width: ${(props) => (props.fullSize ? "100%" : "300px")};
  box-sizing: border-box;
`;

const Validation = styled.div`
  font-size: 0.8em;
  height: 2em;
  line-height: 2em;

  > span {
    background: #333;
    display: inline-block;
    padding: 0 5px;
    color: #f7f7f7;
  }
`;
const TextBox = React.forwardRef(
  (
    {
      text,
      password,
      fullSize,
      validationMessage,
      onChange,
      value,
      defaultValue,
    },
    ref
  ) => (
    <>
      <StyledTextBox
        type={password ? "password" : "text"}
        fullSize={fullSize}
        onChange={onChange}
        value={value}
        defaultValue={defaultValue}
        ref={ref}
      >
        {text}
      </StyledTextBox>
      <Validation>
        <span>{validationMessage}</span>
      </Validation>
    </>
  )
);

export default TextBox;
