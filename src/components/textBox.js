import React, { useRef, useEffect, useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  position: relative;
`;

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

const Suggestions = styled.div`
  position: absolute;
  border-bottom: 1px solid #f7f7f7;
  background: #f7f7f7;
  width: 100%;
  z-index: 1;
  border-top: 1px solid #eaeaea;
  max-height: 350px;
  overflow: auto;
`;

const Suggestion = styled.div`
  padding: 12px;
  cursor: default;
  &:hover {
    background: rgba(0, 0, 0, 0.05);
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
      placeholder,
      hideValidation,
      suggestions,
      suggestionRenderer,
      onSuggestionClick,
    },
    ref
  ) => {
    const [showSuggestions, setShowSuggestions] = useState(true);
    const container = useRef(null);
    const clickHandler = (e) => {
      !container.current.contains(e.target) && setShowSuggestions(false);
    };
    useEffect(() => {
      window.addEventListener("click", clickHandler);
      return () => {
        window.removeEventListener("click", clickHandler);
      };
    });
    return (
      <Container ref={container}>
        <StyledTextBox
          type={password ? "password" : "text"}
          fullSize={fullSize}
          onChange={(e) => {
            setShowSuggestions(true);
            onChange && onChange(e);
          }}
          onFocus={() => {
            setShowSuggestions(true);
          }}
          value={value}
          defaultValue={defaultValue}
          ref={ref}
          placeholder={placeholder}
        >
          {text}
        </StyledTextBox>
        {!hideValidation && (
          <Validation>
            <span>{validationMessage}</span>
          </Validation>
        )}
        {showSuggestions && suggestions && (
          <Suggestions>
            {suggestions.map((s, i) => (
              <Suggestion
                key={i}
                onClick={(e) => {
                  onSuggestionClick(e, s);
                }}
              >
                {suggestionRenderer ? suggestionRenderer(s) : s.text}
              </Suggestion>
            ))}
          </Suggestions>
        )}
      </Container>
    );
  }
);

export default TextBox;
