import React from "react";
import { useSelector } from "react-redux";

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

  > div {
    flex: 1;
  }

  > div:nth-child(2) {
    display: flex;
    justify-content: flex-end;
  }

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

const Menu = () => {
  const user = useSelector(state => state.user);
  return (
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
        {!user && (
          <NavLink to="/login">
            Log in / register
            <BottomBorder />
          </NavLink>
        )}
      </div>
      <div>
        {user && (
          <NavLink to={`kuskis/${user.name}`}>
            {user.name}
            <BottomBorder />
          </NavLink>
        )}
      </div>
    </StyledMenu>
  );
};

export default Menu;
