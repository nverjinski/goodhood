import styled from "styled-components";
import { SunIcon, MoonIcon } from "@heroicons/react/24/solid";
import { useTheme } from "@contexts/ThemeContext";

const StyledButton = styled.button`
  padding: 0.5rem;
  border-radius: 9999px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  transition: background-color 300ms, color 300ms;
  cursor: pointer;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;

  background-color: ${({ theme }) => theme.secondary_base};
  color: ${({ theme }) => theme.secondary_text};

  &:hover {
    background-color: ${({ theme }) => theme.secondary_text};
    color: ${({ theme }) => theme.secondary_base};
  }

  &:focus {
    outline: none;
  }
`;

const IconWrapper = styled.div`
  width: 1.5rem;
  height: 1.5rem;
`;

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <StyledButton onClick={toggleTheme} aria-label="Toggle theme">
      <IconWrapper>{theme === "dark" ? <SunIcon /> : <MoonIcon />}</IconWrapper>
    </StyledButton>
  );
};

export default ThemeToggle;
