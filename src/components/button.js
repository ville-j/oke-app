import React, { useState } from "react";
import styled, { css } from "styled-components";
import { Popup } from "./";

const StyledButton = styled.button`
  ${(props) =>
    props.width
      ? css`
          width: ${props.width};
        `
      : css`
          width: 150px;
        `}
  max-width: 100%;
  padding: 12px;
  background: ${(props) =>
    props.primary ? "#66af30" : props.light ? "transparent" : "#e4e4e4"};
  border: ${(props) => (props.light ? "1px  solid #f7f7f7" : 0)};
  font-weight: 500;
  display: inline-block;
  box-sizing: border-box;
  font-size: 1em;
  font-family: inherit;
  color: ${(props) => (props.primary ? "#fff" : "#333")};
  line-height: inherit;
`;

const ConfirmButtons = styled.div`
  display: flex;
  padding-top: 12px;
  > * {
    flex: 1;
  }
`;

const Button = ({
  text,
  width,
  style,
  primary,
  onClick,
  type = "button",
  confirm,
  light,
  confirmContent,
}) => {
  const [confirmText, setConfirmText] = useState("");
  return (
    <>
      <StyledButton
        width={width}
        style={{ ...style }}
        primary={primary}
        type={type}
        light={light}
        onClick={(e) => {
          if (confirm) {
            setConfirmText(confirm);
          } else {
            onClick && onClick(e);
          }
        }}
      >
        {text}
      </StyledButton>
      {confirmText && (
        <Popup
          title={confirmText}
          onClose={() => {
            setConfirmText("");
          }}
        >
          {confirmContent}
          <ConfirmButtons>
            <Button
              text="Continue"
              onClick={() => {
                onClick && onClick();
                setConfirmText("");
              }}
            />
            <Button
              text="Cancel"
              light
              onClick={() => {
                setConfirmText("");
              }}
            />
          </ConfirmButtons>
        </Popup>
      )}
    </>
  );
};

export default Button;
