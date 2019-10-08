import styled from "styled-components";

const Line = styled.span`
  display: inline-block;
  height: 1em;
  line-height: 1em;
  background: #f7f7f7;
  width: ${props => `${props.width}`};
  border-radius: 2px;
`;

export default Line;
