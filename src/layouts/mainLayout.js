import React from "react";
import styled, { css } from "styled-components";
import RecPlayer from "recplayer-react";

import {
  Table,
  TableRow,
  TableCell,
  Accordion,
  AccordionSection,
  Button,
  LevelCard
} from "../components";

const menuHeight = "50px";
const bottomBarHeight = "200px";

const StyledLayout = styled.div`
  padding-top: ${menuHeight};
  height: 100%;
  box-sizing: border-box;
  ${props =>
    props.bottomBarVisible &&
    css`
      padding-bottom: ${bottomBarHeight};
    `}
`;

const Menu = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: ${menuHeight};
  background: #f7f7f7;
`;

const Content = styled.div`
  height: 100%;
  overflow: auto;
`;

const BottomBar = styled.div`
  height: ${bottomBarHeight};
  box-sizing: border-box;
  border-top: 1px solid #f7f7f7;
`;

const PlayerContainer = styled.div`
  height: 600px;
`;

const MainLayout = ({ bottomBarVisible }) => {
  return (
    <StyledLayout bottomBarVisible={bottomBarVisible}>
      <Menu />
      <Content>
        <PlayerContainer>
          <RecPlayer autoFill />
        </PlayerContainer>
        <Button text="Laheta" />
        <LevelCard />
        <Accordion>
          <AccordionSection title="33. Zig Zag" />
          <AccordionSection title="34. Sink" />
          <AccordionSection title="35. Labyrinth Pro" visible>
            <Table>
              <TableRow head>
                <TableCell style={{ width: 50 }}>#</TableCell>
                <TableCell>Kuski</TableCell>
                <TableCell>Time</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>1.</TableCell>
                <TableCell>awsj [NORWICH]</TableCell>
                <TableCell>15,78</TableCell>
              </TableRow>
              <TableRow href="home">
                <TableCell>2.</TableCell>
                <TableCell>blaztek [EE]</TableCell>
                <TableCell>15,63</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>3.</TableCell>
                <TableCell>blaztek [EE]</TableCell>
                <TableCell>15,63</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>4.</TableCell>
                <TableCell>blaztek [EE]</TableCell>
                <TableCell>15,63</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>5.</TableCell>
                <TableCell>blaztek [EE]</TableCell>
                <TableCell>15,63</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>6.</TableCell>
                <TableCell>blaztek [EE]</TableCell>
                <TableCell>15,63</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>7.</TableCell>
                <TableCell>blaztek [EE]</TableCell>
                <TableCell>15,63</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>8.</TableCell>
                <TableCell>blaztek [EE]</TableCell>
                <TableCell>15,63</TableCell>
              </TableRow>
            </Table>
          </AccordionSection>
          <AccordionSection title="36. Animal Fram" />
        </Accordion>
      </Content>
      {bottomBarVisible && <BottomBar />}
    </StyledLayout>
  );
};

export default MainLayout;
