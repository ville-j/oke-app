import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

const StyledTabs = styled.div`
  padding-bottom: 5px;
`;

const TabsContainer = styled.div`
  display: flex;
  border-bottom: 1px solid #f7f7f7;

  a {
    padding: 12px;
    position: relative;
    text-align: center;
    min-width: 100px;
    color: inherit;
    text-decoration: none;
    color: #8a8a8a;
    &.active {
      background: #505050;
      color: #f7f7f7;

      > div {
        display: block;
      }
    }
  }
`;

const Triangle = styled.div`
  width: 0;
  height: 0;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-top: 5px solid #505050;
  position: absolute;
  left: 50%;
  margin-left: -5px;
  bottom: -5px;
  display: none;
`;

const Tabs = ({ children }) => {
  return (
    <StyledTabs>
      <TabsContainer>{children}</TabsContainer>
    </StyledTabs>
  );
};

const Tab = ({ children, to }) => {
  return (
    <NavLink to={to}>
      {children}
      <Triangle />
    </NavLink>
  );
};

export { Tabs, Tab };
