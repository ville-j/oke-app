import React from "react";
import styled from "styled-components";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useSelector } from "react-redux";

import { Menu, Chat } from "../components";
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
  LevelPacks,
  EditLevelPack,
} from "../pages";

const Container = styled.div`
  height: 100%;
  padding-top: 50px;
  ${(props) =>
    props.chatVisible &&
    `
      @media all and (min-width: 1200px) {
        padding-right: 300px;
      }
    `}
`;

const MainView = styled.div`
  height: 100%;
  overflow: hidden;
`;

const Layout = () => {
  const chatVisible = useSelector((state) => state.chat.visible);
  return (
    <Router>
      <Menu />
      <Container chatVisible={chatVisible}>
        <MainView>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/kuskis/:name" component={Kuski} />
            <Route path="/settings" component={Settings} />
            <Route path="/levels/packs" exact component={LevelPacks} />
            <Route path="/levels/packs/:name" exact component={LevelPacks} />
            <Route
              path="/levels/packs/:name/stats"
              exact
              component={LevelPacks}
            />
            <Route path="/editlevelpack" exact component={EditLevelPack} />
            <Route path="/editlevelpack/:id" exact component={EditLevelPack} />
            <Route path="/levels" exact component={Levels} />
            <Route path="/levels/:id" exact component={Level} />
            <Route path="/battles" exact component={Battles} />
            <Route path="/battles/:id" exact component={Battle} />
            <Route path="/login" component={Login} />
            <Route path="/search" component={Search} />
            <Route path="/kuskis" component={Kuskis} />
            <Route component={NotFound} />
          </Switch>
        </MainView>
      </Container>
      <Chat />
    </Router>
  );
};

export default Layout;
