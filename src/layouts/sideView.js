import React from "react";
import styled from "styled-components";

const Container = styled.div`
  height: 100%;
  display: flex;

  @media (max-width: 799px) {
    flex-direction: column;

    ${(props) => !props.stickySide && `overflow: auto;`}
  }
`;

const Main = styled.div`
  flex: 1;
  ${(props) => props.stickySide && `overflow: hidden;`}

  @media (max-width: 799px) {
    ${(props) =>
      props.stack &&
      `position: absolute; overflow: auto; width: 100%; bottom: 0; top: 50px; background: #fff`}
  }
`;

const Side = styled.div`
  flex: 0 1 350px;
  border-right: 1px solid #f7f7f7;

  @media (max-width: 799px) {
    flex: 0;
    ${(props) => props.stack && `flex: 1; overflow: hidden`}
  }
`;

const SideView = ({ side, main, stickySide, stack }) => {
  return (
    <Container stickySide={stickySide}>
      {side && <Side stack={stack}>{side}</Side>}
      {main && (
        <Main stickySide={stickySide} stack={stack}>
          {main}
        </Main>
      )}
    </Container>
  );
};

export default SideView;
