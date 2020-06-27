import React from "react";
import styled from "styled-components";
import DefaultShirt from "../resources/images/shirt.png";

const Container = styled.div`
  overflow: hidden;
`;

const Wrap = styled.div`
  width: 100%;
  margin-left: 0%;
  padding-top: 50%;
  margin-bottom: -22%;
`;

const ShirtContainer = styled.div`
  transform: rotate(-1.766rad);
  object,
  img {
    width: 150%;
  }
`;

const Shirt = ({ kuski, crc }) => {
  return (
    <Container>
      <Wrap>
        <ShirtContainer>
          {kuski ? (
            <object
              data={`${process.env.REACT_APP_API_URL}/shirts/${kuski}.png?crc=${crc}`}
            >
              <img src={DefaultShirt} alt="shirt" />
            </object>
          ) : (
            <img src={DefaultShirt} alt="shirt" />
          )}
        </ShirtContainer>
      </Wrap>
    </Container>
  );
};

export default Shirt;
