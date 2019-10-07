import React, { useState } from "react";
import styled, { css } from "styled-components";

const Image = styled.div`
  height: ${props => props.height};
  > div {
    ${props =>
      props.fullscreen &&
      css`
        top: 0;
        left: 0;
        position: fixed;
        z-index: 99;
      `}
    width: 100%;
    height: 100%;
    background: #333;
    border: 10px solid #333;
    ${props =>
      props.level &&
      css`background-image: url("${
        process.env.REACT_APP_API_URL
      }/levels/${props => props.level}/map");`}

    ${props =>
      props.level &&
      props.battle &&
      css`background-image: url("${
        process.env.REACT_APP_API_URL
      }/levelimage/${props => props.level}");`}
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
  }
`;

const LevelImage = ({ level, height, battle }) => {
  const [fs, setFs] = useState(false);
  return (
    <Image
      level={level}
      fullscreen={fs}
      height={height}
      onClick={() => {
        setFs(!fs);
      }}
      battle={battle}
    >
      <div></div>
    </Image>
  );
};

export default LevelImage;
