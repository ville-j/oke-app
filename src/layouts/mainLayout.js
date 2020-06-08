import React, { useRef, useEffect, useState, useCallback } from "react";
import styled, { css } from "styled-components";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  withRouter,
} from "react-router-dom";
import { Scrollbars } from "react-custom-scrollbars";
import {
  Home,
  Kuski,
  Levels,
  Level,
  NotFound,
  Battles,
  Battle,
  Login,
  Search,
  Kuskis,
  Settings,
} from "../pages";
import { Menu, BattleSidebar, Chat } from "../components";
import { useSelector, useDispatch } from "react-redux";
import { toggleChat } from "../actions";

const menuHeight = "50px";

const StyledLayout = styled.div`
  padding-top: ${menuHeight};
  height: 100%;
  ${(props) =>
    props.chatVisible &&
    css`
      @media all and (min-width: 1200px) {
        padding-right: 300px;
      }
    `}
`;

const SidebarLayout = styled.div`
  display: flex;
  min-height: 100%;

  @media (max-width: 799px) {
    flex-direction: column;
  }
`;

const Sidebar = styled.div`
  flex: 0 0 350px;
  border-right: 1px solid #f7f7f7;

  @media (max-width: 799px) {
    border-right: 0;
    flex: 0;
  }
`;

const Content = styled.div`
  flex: 1;
  overflow: hidden;
  @media (max-width: 799px) {
    flex: 1;
    flex-direction: column;
  }
`;

const PlayerContainer = styled.div`
${(props) =>
  props.visible &&
  css`
    height: 350px;
  `}
  
  ${(props) =>
    props.docked &&
    css`
      position: fixed;
      bottom: 0;
      right: 0;
      height: 300px;
      width: 350px;
      z-index: 100;
    `}
  ${(props) =>
    props.fullscreen &&
    css`
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 100;
    `}
`;

const ToggleChat = styled.div`
  position: fixed;
  top: 55px;
  right: 20px;
  padding: 5px 10px;
  z-index: 10;
  font-size: 0.8em;
  background: rgba(247, 247, 247, 0.6);
  border-radius: 10px;
  cursor: pointer;
  @media all and (max-width: 799px) {
    top: 10px;
    z-index: 100;
  }
`;

const PL = withRouter(({ width, height }) => {
  return null; //<Player width={width} height={height} />;
});

const MainLayout = () => {
  const playerContainer = useRef(null);
  const [w, sw] = useState(0);
  const [h, sh] = useState(0);
  const playerState = useSelector((state) => state.player.playerState);
  const chatVisible = useSelector((state) => state.chat.visible);
  const dispatch = useDispatch();

  const setWidth = useCallback(() => {
    sw(playerContainer.current.offsetWidth);
  }, [sw]);

  useEffect(() => {
    sh(playerContainer.current.offsetHeight);
  }, [playerState]);

  useEffect(() => {
    sw(playerContainer.current.offsetWidth);
    window.addEventListener("resize", setWidth);
    return () => {
      window.removeEventListener("resize", setWidth);
    };
  }, [sw, setWidth, playerState]);
  return (
    <Scrollbars autoHide>
      <StyledLayout chatVisible={chatVisible}>
        <Router basename="/okeapp">
          <Menu />
          <SidebarLayout>
            <Route
              path="/battles/:id"
              exact
              render={(props) => (
                <Sidebar>
                  <BattleSidebar {...props} />
                </Sidebar>
              )}
            />
            <Content>
              <PlayerContainer
                visible={playerState > 0}
                ref={playerContainer}
                docked={playerState === 2}
                fullscreen={playerState === 3}
              >
                {playerState > 0 && <PL width={w} height={h} />}
              </PlayerContainer>
              <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/kuskis/:name" component={Kuski} />
                <Route path="/settings" component={Settings} />
                <Route path="/levels" exact component={Levels} />
                <Route path="/levels/:id" exact component={Level} />
                <Route path="/battles" exact component={Battles} />
                <Route path="/battles/:id" exact component={Battle} />
                <Route path="/login" component={Login} />
                <Route path="/search" component={Search} />
                <Route path="/kuskis" component={Kuskis} />
                <Route component={NotFound} />
              </Switch>
            </Content>
          </SidebarLayout>
        </Router>
        <ToggleChat
          onClick={() => {
            dispatch(toggleChat());
          }}
        >
          {chatVisible ? "Hide chat" : "Show chat"}
        </ToggleChat>
        <Chat />
      </StyledLayout>
    </Scrollbars>
  );
};

export default MainLayout;
