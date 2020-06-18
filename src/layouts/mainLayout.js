import React from "react";
import styled, { css } from "styled-components";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
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
import { useSelector } from "react-redux";

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

const MainLayout = () => {
  const chatVisible = useSelector((state) => state.chat.visible);

  return (
    <Scrollbars autoHide>
      <StyledLayout chatVisible={chatVisible}>
        <Router>
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
        <Chat />
      </StyledLayout>
    </Scrollbars>
  );
};

export default MainLayout;
