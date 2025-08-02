import styled from "styled-components";
import { SunIcon, MoonIcon } from "@heroicons/react/24/solid";
import { useTheme } from "@contexts/ThemeContext";

const StyledButton = styled.button`
  padding: 0.5rem;
  border-radius: 9999px; /* This is equivalent to 'rounded-full' in Tailwind */
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  transition: background-color 300ms, color 300ms;
  cursor: pointer;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;

  // The background and text colors are based on the theme.
  background-color: var(--button-bg-light);
  color: var(--button-text-light);

  &:hover {
    box-shadow: 0 0 0 2px var(--accent-color);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px var(--accent-color),
      0 0 0 4px var(--focus-ring-offset);
  }

  // The dark-mode class, which would be added to the body or a parent element,
  // will change the CSS variables.
  &.dark {
    background-color: var(--button-bg-dark);
    color: var(--button-text-dark);
  }
`;

const IconWrapper = styled.div`
  width: 1.5rem;
  height: 1.5rem;
`;

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <StyledButton
      onClick={toggleTheme}
      className={theme} // Apply the current theme as a class
      aria-label="Toggle theme"
    >
      <IconWrapper>{theme === "dark" ? <SunIcon /> : <MoonIcon />}</IconWrapper>
    </StyledButton>
  );
};

export default ThemeToggle;
