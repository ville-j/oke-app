import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import axios from "axios";

const Image = styled.div`
  height: ${(props) => props.height};
  > div {
    ${(props) =>
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
  }

  svg .sky {
  }

  svg .APPLE {
  }

  svg .KILLER {
  }

  svg .FLOWER {
  }

  svg .START {
  }

  svg {
    overflow: hidden;
    object-fit: contain;
    width: 100%;
    height: 100%;
  }
`;

const LevelImage = ({ level, height }) => {
  const [fs, setFs] = useState(false);
  const [svg, setSvg] = useState(null);

  useEffect(() => {
    setSvg(null);
    const f = async () => {
      try {
        const { data } = await axios.get(
          `${process.env.REACT_APP_API_URL}/levels/${level}/map`
        );
        setSvg(data);
      } catch (e) {
        console.log("error loading svg", e);
      }
    };
    level && f();
  }, [level]);

  return (
    <Image
      level={level}
      fullscreen={fs}
      height={height}
      onClick={() => {
        setFs(!fs);
      }}
    >
      <div dangerouslySetInnerHTML={{ __html: svg }} />
    </Image>
  );
};

export default LevelImage;
