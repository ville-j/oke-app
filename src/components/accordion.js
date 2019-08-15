import React, { useState } from "react";
import styled, { css } from "styled-components";

const StyledAccordion = styled.div`
  background: #fff;
`;

const StyledAccordionSection = styled.div``;
const StyledAccordionSectionTitle = styled.div`
  border-top: 1px solid #f7f7f7;
  padding: 12px 10px;
  font-weight: 600;
  cursor: default;
`;

const StyledAccordionSectionContent = styled.div`
  ${props =>
    !props.visible &&
    css`
      display: none;
    `}
`;

const Accordion = props => <StyledAccordion>{props.children}</StyledAccordion>;
const AccordionSection = props => {
  const [visible, setVisible] = useState(props.visible || false);
  return (
    <StyledAccordionSection>
      <StyledAccordionSectionTitle
        role="button"
        tabIndex="0"
        onClick={() => {
          setVisible(!visible);
        }}
        onKeyPress={e => e.charCode === 13 && setVisible(!visible)}
        visible={visible}
      >
        {props.title}
      </StyledAccordionSectionTitle>
      <StyledAccordionSectionContent visible={visible}>
        {props.children}
      </StyledAccordionSectionContent>
    </StyledAccordionSection>
  );
};

export { Accordion, AccordionSection };
