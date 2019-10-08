import React, { useState } from "react";
import { useSelector } from "react-redux";
import styled, { css } from "styled-components";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";
import { logout } from "../api";
import { getUser } from "../actions";
import { Dropdown } from "./";

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

    @media all and (max-width: 799px) {
      position: fixed;
      top: 50px;
      width: 100%;
      height: 100%;
      background: #fff;
      ${props =>
        !props.menuOpen &&
        css`
          display: none;
        `}

      > a {
        display: block;
      }
    }
  }

  > div:nth-child(3) {
    display: flex;
    justify-content: flex-end;

    @media all and (max-width: 799px) {
      display: none;
    }
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

const ToggleButton = styled.button`
  width: 50px;
  font-size: 20px;
  border: 0;
  background: transparent;
  color: #66af30;
  @media all and (min-width: 800px) {
    display: none;
  }
`;

const HideOnDesktop = styled.div`
  @media all and (min-width: 800px) {
    display: none;
  }
  > a {
    display: block;
  }
`;

const Menu = ({ history }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();
  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <StyledMenu menuOpen={menuOpen}>
      <ToggleButton
        type="button"
        onClick={() => {
          setMenuOpen(!menuOpen);
        }}
      >
        ☰
      </ToggleButton>
      <div>
        <NavLink to="/" exact onClick={closeMenu}>
          Home
          <BottomBorder />
        </NavLink>
        <NavLink to="/battles" onClick={closeMenu}>
          Battles
          <BottomBorder />
        </NavLink>
        <NavLink to="/levels" onClick={closeMenu}>
          Levels
          <BottomBorder />
        </NavLink>
        {user && (
          <HideOnDesktop>
            <NavLink to={`/kuskis/${user.name}`} onClick={closeMenu}>
              Profile
              <BottomBorder />
            </NavLink>
          </HideOnDesktop>
        )}
        {user && (
          <HideOnDesktop>
            <NavLink
              to="/logout"
              onClick={e => {
                e.preventDefault();
                logout();
                dispatch(getUser());
                closeMenu();
              }}
            >
              Log out
              <BottomBorder />
            </NavLink>
          </HideOnDesktop>
        )}
        {!user && (
          <NavLink to="/login" onClick={closeMenu}>
            Log in / register
            <BottomBorder />
          </NavLink>
        )}
      </div>
      {user && (
        <div>
          <Dropdown
            primary
            placeholder={user.name}
            options={[
              { value: 1, text: "Profile" },
              { value: 2, text: "Log out" }
            ]}
            onSelect={(e, i) => {
              switch (i) {
                case 1:
                  history.push(`/kuskis/${user.name}`);
                  return;
                case 2:
                  logout();
                  dispatch(getUser());
                  return;
                default:
                  return;
              }
            }}
            style={{ width: 200 }}
          />
        </div>
      )}
    </StyledMenu>
  );
};

export default withRouter(Menu);
