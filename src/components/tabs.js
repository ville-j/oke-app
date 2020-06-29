import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

const StyledTabs = styled.div``;

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
      background: #66af30;
      color: #fff;
      > div {
        display: block;
      }
    }
  }
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
    <NavLink exact to={to}>
      {children}
    </NavLink>
  );
};

export { Tabs, Tab };
