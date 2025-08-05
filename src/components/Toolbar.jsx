import React from "react";
import styled from "styled-components";

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
  border: 1px solid ${({ theme }) => theme.heavy_line_outline};
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  transition: background-color 0.3s ease-in-out;

  background-color: ${({ theme }) => `${theme.primary_base}C0`};

  &:hover {
    background-color: ${({ theme }) => theme.primary_base};
  }
`;

/**
 * A flexible toolbar component for housing various action buttons.
 *
 * @param {object} props - Component props.
 * @param {React.ReactNode} props.children - The child elements.
 */
const Toolbar = ({ children }) => {
  return <StyledToolbar>{children}</StyledToolbar>;
};

export default Toolbar;
