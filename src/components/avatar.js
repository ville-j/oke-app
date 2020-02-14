import React from "react";
import styled, { css } from "styled-components";

const StyledAvatar = styled.div`
  background: #f7f7f7;
  border-radius: 50%;
  width: 70px;
  height: 70px;
  ${props =>
    props.kuski &&
    css`
      background-image: url(${process.env.REACT_APP_API_URL}/shirts/${props =>
          props.kuski}.png?t=${props => props.t});
    `}
  background-position: -40px -20px;
`;

const Avatar = props => <StyledAvatar {...props} />;

export default Avatar;
