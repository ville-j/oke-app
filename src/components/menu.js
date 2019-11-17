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

const MenuItems = styled.div`
  a {
    line-height: 50px;
    display: inline-block;
    padding: 0 12px;
    position: relative;
    color: #8a8a8a;
    &.active {
      color: #66af30;
      div {
        display: block;
      }
    }
  }
  @media all and (max-width: 799px) {
    position: fixed;
    top: 50px;
    width: 300px;
    max-width: 85%;
    height: 100%;
    background: #66af30;
    transition: left 0.3s, visibility 1s;
    left: 0%;
    ${props =>
      !props.menuOpen &&
      css`
        left: -300px;
        visibility: hidden;
      `}

    a {
      display: block;
      color: #fff;

      &.active {
        color: #fff;
        text-decoration: underline;
      }
    }
  }
`;

const DropdownContainer = styled.div`
  flex: 1;
`;

const StyledMenu = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 50px;
  z-index: 50;
  background: #fff;

  > div:nth-child(4) {
    display: flex;
    justify-content: flex-end;

    @media all and (max-width: 799px) {
      display: none;
    }
  }

  h1 {
    margin: 0 12px;
    line-height: 50px;
    font-size: 2em;
  }

  border-bottom: 1px solid #f7f7f7;
  display: flex;
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

const Search = styled.div`
  display: flex;
  flex: 0 1 300px;

  @media all and (max-width: 799px) {
    flex: 1;
  }

  input {
    line-height: 50px;
    border: 0;
    padding: 0 12px;
    display: block;
    width: 100%;
    border: 0;

    ::placeholder {
      color: #8a8a8a;
      font-size: inherit;
      font-family: inherit;
    }
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
    <StyledMenu>
      <ToggleButton
        type="button"
        onClick={() => {
          setMenuOpen(!menuOpen);
        }}
      >
        ☰
      </ToggleButton>
      <MenuItems menuOpen={menuOpen}>
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
        <NavLink to="/kuskis" onClick={closeMenu}>
          Kuskis
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
      </MenuItems>

      <Search>
        <input
          type="text"
          placeholder="Search"
          onKeyDown={e => {
            e.keyCode === 13 &&
              e.target.value.length > 0 &&
              history.push(`/search?q=${e.target.value}`);
          }}
        />
      </Search>
      {user && (
        <DropdownContainer>
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
            style={{ width: 200, margin: 2 }}
          />
        </DropdownContainer>
      )}
    </StyledMenu>
  );
};

export default withRouter(Menu);
