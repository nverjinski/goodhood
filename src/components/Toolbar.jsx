import React from "react";
import styled from "styled-components";
import { useTheme } from "@contexts/ThemeContext";

const StyledToolbar = styled.div`
  position: absolute;
  z-index: 1;
  top: 2rem;
  right: 2rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.5rem;
  border-radius: 9999px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);

  // Base colors for light theme
  background-color: rgba(255, 255, 255, 0.5);

  // Styling for dark theme using a class
  &.dark {
    //background-color: rgba(31, 41, 55, 0.5);
  }
`;

/**
 * A flexible toolbar component for housing various action buttons.
 *
 * @param {object} props - Component props.
 * @param {React.ReactNode} props.children - The child elements to be rendered inside the toolbar.
 */
const Toolbar = ({ children }) => {
  const { theme } = useTheme();
  return <StyledToolbar className={theme}>{children}</StyledToolbar>;
};

export default Toolbar;
