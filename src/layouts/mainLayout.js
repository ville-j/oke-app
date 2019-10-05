import React, { useRef, useEffect, useState, useCallback } from "react";
import styled, { css } from "styled-components";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  withRouter
} from "react-router-dom";
import {
  Home,
  Kuski,
  Levels,
  NotFound,
  Battles,
  Battle,
  Login
} from "../pages";
import { Menu, Player, BattleSidebar } from "../components";
import { useSelector } from "react-redux";

const menuHeight = "50px";

const StyledLayout = styled.div`
  padding-top: ${menuHeight};
  height: 100%;
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
  }
`;

const Content = styled.div`
  flex: 1;
  overflow: hidden;
`;

const PlayerContainer = styled.div`
${props =>
  props.visible &&
  css`
    height: 350px;
  `}
  
  ${props =>
    props.docked &&
    css`
      position: fixed;
      bottom: 0;
      right: 0;
      height: 300px;
      width: 350px;
      z-index: 100;
    `}
  ${props =>
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

const PL = withRouter(({ width, height }) => {
  return <Player width={width} height={height} />;
});

const MainLayout = () => {
  const playerContainer = useRef(null);
  const [w, sw] = useState(0);
  const [h, sh] = useState(0);
  const playerState = useSelector(state => state.playerState);

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
    <StyledLayout>
      <Router basename="/okeol">
        <Menu />
        <SidebarLayout>
          <Route
            path="/battles/:id"
            exact
            render={props => (
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
              <Route path="/kuskis" component={Kuski} />
              <Route path="/levels" exact component={Levels} />
              <Route path="/battles" exact component={Battles} />
              <Route path="/battles/:id" exact component={Battle} />
              <Route path="/login" component={Login} />
              <Route component={NotFound} />
            </Switch>
          </Content>
        </SidebarLayout>
      </Router>
    </StyledLayout>
  );
};

export default MainLayout;
