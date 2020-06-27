import React from "react";
import styled from "styled-components";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
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
} from "../pages";

const Container = styled.div`
  height: 100%;
  padding-top: 50px;
`;

const MainView = styled.div`
  height: 100%;
  overflow: hidden;
`;

const Layout = () => {
  return (
    <Router>
      <Menu />
      <Container>
        <MainView>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/kuskis/:name" component={Kuski} />
            <Route path="/settings" component={Settings} />
            <Route path="/levelpacks" exact component={LevelPacks} />
            <Route path="/levelpacks/:name" component={LevelPacks} />
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