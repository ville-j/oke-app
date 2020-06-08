import React, { useState, useRef, useEffect } from "react";
import styled, { css } from "styled-components";

const StyledDropdown = styled.div`
  position: relative;
`;

const Selection = styled.div`
  padding: 12px;
  cursor: default;
  padding-right: 36px;
  background: #f7f7f7;

  border-bottom: 1px solid #f7f7f7;
  ${(props) =>
    props.primary &&
    css`
      background: #66af30;
      border-bottom: 1px solid #66af30;
      color: #fff;
    `}
`;

const Options = styled.div`
  position: absolute;
  width: 100%;
  background: inherit;
  border-top: 1px solid #eaeaea;
  z-index: 10;
  background: #f7f7f7;
  max-height: 250px;
  overflow: auto;
  ${(props) =>
    props.primary &&
    css`
      background: #66af30;
      color: #fff;
      border-top: 1px solid #86ce51;
    `}
  > div {
    padding: 8px 12px;
    cursor: default;

    :hover {
      background: rgba(0, 0, 0, 0.05);
    }
  }
`;

const Chevron = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  padding: 12px;
`;

const Dropdown = ({
  options,
  onSelect,
  value,
  placeholder = "Select",
  primary,
  style,
}) => {
  const [open, setOpen] = useState(false);
  const handleClick = () => {
    setOpen(!open);
  };
  const handleKeyDown = (e) => {
    e.keyCode === 13 && setOpen(!open);
  };
  const handleSelect = (e, value) => {
    onSelect && onSelect(e, value);
    setOpen(false);
  };
  const selectedItem = options.find((o) => o.value === value);
  const container = useRef(null);
  const clickHandler = (e) => {
    !container.current.contains(e.target) && setOpen(false);
  };
  useEffect(() => {
    window.addEventListener("click", clickHandler);
    return () => {
      window.removeEventListener("click", clickHandler);
    };
  });
  return (
    <StyledDropdown ref={container} style={{ ...style }}>
      <Selection
        role="button"
        tabIndex="0"
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        primary={primary}
      >
        {selectedItem ? selectedItem.text : placeholder}
        <Chevron>▾</Chevron>
      </Selection>
      {open && (
        <Options primary={primary}>
          {options.map((o) => (
            <div
              key={o.value}
              tabIndex="0"
              onClick={(e) => {
                handleSelect(e, o.value);
              }}
              onKeyDown={(e) => {
                e.keyCode === 13 && handleSelect(e, o.value);
              }}
              role="button"
            >
              {o.text}
            </div>
          ))}
        </Options>
      )}
    </StyledDropdown>
  );
};

export default Dropdown;
