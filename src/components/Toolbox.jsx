import React, { useCallback } from "react";
import styled, { css } from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { toggleToolboxExpanded } from "@store/appSlice";
import { Logo } from "@components";

const StyledToolbox = styled.div`
  position: absolute;
  width: 400px;
  max-height: 100%;
  z-index: 1;
  top: 2rem;
  left: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 0.5rem;
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.heavy_line_outline};
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  overflow: hidden;
  transition: max-height 0.3s ease-in-out, background-color 0.3s ease-in-out;

  background-color: ${({ theme }) => `${theme.primary_base}C0`};

  &:hover {
    background-color: ${({ theme }) => theme.primary_base};
  }

  ${({ $isExpanded }) =>
    !$isExpanded &&
    css`
      max-height: 55px;
    `}
`;

/**
 * A flexible toolbar component for housing various action buttons.
 *
 * @param {object} props - Component props.
 * @param {React.ReactNode} props.children - The child elements.
 */
const Toolbox = ({ children }) => {
  const dispatch = useDispatch();
  const isExpanded = useSelector((state) => state.app.toolbox.expanded);
  const handleClick = useCallback(
    () => dispatch(toggleToolboxExpanded()),
    [dispatch]
  );
  return (
    <StyledToolbox $isExpanded={isExpanded}>
      <Logo onClick={handleClick} />
      {children}
    </StyledToolbox>
  );
};

export default Toolbox;
