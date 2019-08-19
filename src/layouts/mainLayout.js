import React from "react";
import styled, { css } from "styled-components";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Home, Kuski, Levels, NotFound } from "../pages";
import { Menu } from "../components";

const menuHeight = "50px";
const bottomBarHeight = "200px";

const StyledLayout = styled.div`
  padding-top: ${menuHeight};
  height: 100%;
  ${props =>
    props.bottomBarVisible &&
    css`
      padding-bottom: ${bottomBarHeight};
    `}
`;

const Content = styled.div`
  height: 100%;
  overflow: auto;
`;

const BottomBar = styled.div`
  height: ${bottomBarHeight};
  border-top: 1px solid #f7f7f7;
`;

const MainLayout = ({ bottomBarVisible }) => {
  return (
    <StyledLayout bottomBarVisible={bottomBarVisible}>
      <Router>
        <Menu />
        <Content>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/kuskis" component={Kuski} />
            <Route path="/levels" exact component={Levels} />
            <Route component={NotFound} />
          </Switch>
        </Content>
        {bottomBarVisible && <BottomBar />}
      </Router>
    </StyledLayout>
  );
};

export default MainLayout;
