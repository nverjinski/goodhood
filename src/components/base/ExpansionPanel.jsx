import { useState } from "react";
import styled from "styled-components";
import { ChevronUpIcon } from "@heroicons/react/24/solid";

const PanelWrapper = styled.div`
  width: 100%;
  border: 1px solid
    ${({ theme, $disabled }) =>
      $disabled ? theme.border.light : theme.border.medium};
  border-radius: 4px;
  &:hover {
    border-color: ${({ theme, $disabled }) => !$disabled && theme.border.heavy};
  }
`;

const PanelHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  text-align: left;
  border: none;
  cursor: ${({ $disabled }) => !$disabled && "pointer"};
`;

const PanelTitle = styled.span`
  color: ${({ theme, $disabled }) =>
    $disabled ? theme.text.disabled : theme.text.secondary};
`;

const AnimatedChevron = styled(ChevronUpIcon)`
  height: 20px;
  width: 20px;
  transform: ${({ $isOpen }) => ($isOpen ? "rotate(180deg)" : "rotate(0)")};
  transition: transform 0.2s ease-in-out;
  color: ${({ theme, $disabled }) =>
    $disabled ? theme.text.disabled : theme.text.secondary};

  &:hover {
    color: ${({ theme, $disabled }) => !$disabled && theme.text.secondary};
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
const ExpansionPanel = ({
  title,
  children,
  defaultOpen = true,
  disabled = false,
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const togglePanel = () => {
    if (disabled) return;
    setIsOpen(!isOpen);
  };

  return (
    <PanelWrapper $disabled={disabled}>
      <PanelHeader
        onClick={togglePanel}
        aria-expanded={isOpen}
        $disabled={disabled}
      >
        <PanelTitle $disabled={disabled}>{title}</PanelTitle>
        <AnimatedChevron $isOpen={isOpen} $disabled={disabled} />
      </PanelHeader>
      <ContentWrapper $isOpen={isOpen}>
        <Content>{children}</Content>
      </ContentWrapper>
    </PanelWrapper>
  );
};

export default ExpansionPanel;
