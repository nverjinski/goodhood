import React from "react";
import styled from "styled-components";
import { SunIcon, MoonIcon } from "@heroicons/react/24/solid";
import { useTheme } from "../contexts/ThemeContext"; // Import the custom hook from the context file

// Define a styled button component with a focus on accessibility and theming
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

// A wrapper for the icons to ensure consistent sizing and appearance
const IconWrapper = styled.div`
  width: 1.5rem;
  height: 1.5rem;
`;

/**
 * A reusable button component to toggle the application's theme.
 * It uses the `useTheme` custom hook to access the theme state and the toggle function.
 */
const ThemeToggle = () => {
  // Use the custom hook to get the current theme and the function to toggle it.
  const { theme, toggleTheme } = useTheme();

  return (
    <StyledButton
      onClick={toggleTheme}
      className={theme} // Apply the current theme as a class
      aria-label="Toggle theme"
    >
      {/* Conditionally render the appropriate icon based on the current theme */}
      <IconWrapper>{theme === "dark" ? <SunIcon /> : <MoonIcon />}</IconWrapper>
    </StyledButton>
  );
};

export default ThemeToggle;
