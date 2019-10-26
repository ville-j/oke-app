import React from "react";
import styled from "styled-components";

const StyledAvatar = styled.div`
  background: #f7f7f7;
  border-radius: 50%;
  width: 70px;
  height: 70px;
`;

const Avatar = props => <StyledAvatar {...props} />;

export default Avatar;
