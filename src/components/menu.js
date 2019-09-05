import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

const BottomBorder = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 3px;
  background: #66af30;
  display: none;
`;

const StyledMenu = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 50px;
  z-index: 50;
  background: #fff;

  h1 {
      margin 0 12px;
      line-height: 50px;
      font-size: 2em;
  }

  border-bottom: 1px solid #f7f7f7;
  display: flex;

  a {
      line-height: 50px;
      text-decoration: none;
      display: inline-block;
      padding 0 12px;
      position: relative;
      color: #8a8a8a;
      &.active {
          color: #66af30;
          div {
              display: block;
          }
      }
  }
`;

const Menu = () => (
  <StyledMenu>
    <div>
      <NavLink to="/levels">
        Levels
        <BottomBorder />
      </NavLink>
      <NavLink to="/replays">
        Replays
        <BottomBorder />
      </NavLink>
      <NavLink to="/battles">
        Battles
        <BottomBorder />
      </NavLink>
      <NavLink to="/kuskis">
        Kuskis
        <BottomBorder />
      </NavLink>
    </div>
  </StyledMenu>
);

export default Menu;
