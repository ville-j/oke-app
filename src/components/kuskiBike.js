import React from "react";
import styled from "styled-components";
import kuskiBike from "../resources/images/kuskiBike.png";
import arm from "../resources/images/arm.png";

const Container = styled.div`
  position: relative;
`;

const KbImg = styled.img`
  width: 100%;
`;

const SImg = styled.img`
  transform: rotate(-2.4712rad);
  position: absolute;
  left: 46%;
  width: 23%;
  top: 25%;
  z-index: 1;
`;

const SData = styled.object(SImg);

const KArm = styled.img`
  width: 100%;
  position: absolute;
  left: 0%;
  top: 0%;
  z-index: 2;
`;

const KuskiBike = ({ kuski }) => {
  return (
    <Container>
      <KbImg src={kuskiBike} alt="kuski bike" />
      <SData data={`${process.env.REACT_APP_API_URL}/shirts/${kuski}.png`}>
        <SImg src={`${process.env.REACT_APP_API_URL}/shirts/_default.png`} />
      </SData>
      <KArm src={arm} alt="kuski arm" />
    </Container>
  );
};

export default KuskiBike;
