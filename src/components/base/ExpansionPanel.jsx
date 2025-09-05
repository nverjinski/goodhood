import { useState } from "react";
import styled from "styled-components";
import { ChevronUpIcon } from "@heroicons/react/24/solid";

const PanelWrapper = styled.div`
  width: 100%;
  border: 1px solid ${({ theme }) => theme.light_line_divider};
  border-radius: 4px;
  &:hover {
    border-color: ${({ theme }) => theme.primary_text};
  }
`;

const PanelHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  text-align: left;
  border: none;
  cursor: pointer;
`;

const PanelTitle = styled.span`
  color: ${({ theme }) => theme.secondary_text};
`;

const AnimatedChevron = styled(ChevronUpIcon)`
  height: 20px;
  width: 20px;
  transform: ${({ $isOpen }) => ($isOpen ? "rotate(180deg)" : "rotate(0)")};
  transition: transform 0.2s ease-in-out;
  color: ${({ theme }) => theme.secondary_text};

  &:hover {
    color: ${({ theme }) => theme.primary_text};
  }
`;

const ContentWrapper = styled.div`
  display: grid;
  grid-template-rows: ${({ $isOpen }) => ($isOpen ? "1fr" : "0fr")};
  transition: grid-template-rows 0.2s ease-in-out;
`;

const Content = styled.div`
  overflow: hidden;
`;
const ExpansionPanel = ({ title, children, defaultOpen = true }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const togglePanel = () => {
    setIsOpen(!isOpen);
  };

  return (
    <PanelWrapper>
      <PanelHeader onClick={togglePanel} aria-expanded={isOpen}>
        <PanelTitle>{title}</PanelTitle>
        <AnimatedChevron $isOpen={isOpen} />
      </PanelHeader>
      <ContentWrapper $isOpen={isOpen}>
        <Content>{children}</Content>
      </ContentWrapper>
    </PanelWrapper>
  );
};

export default ExpansionPanel;
