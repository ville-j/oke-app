import styled from "styled-components";

const Divider = styled.div`
  height: 1px;
  margin: 24px 0;
  ${({ transparent, background }) =>
    !transparent &&
    `
    background: ${background ? background : `#e6e6e6`};
  `}
`;

export default Divider;
