import React, { createContext, useContext, useState, useEffect } from "react";
import { ThemeProvider as StyledThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "@styles/theme";

const ThemeContext = createContext({
  theme: lightTheme,
  toggleTheme: () => {},
});

// Custom hook to consume the context and allow components to access the theme
export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    return savedTheme || (prefersDark ? "dark" : "light");
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }

    // Persist the theme choice in the browser's localStorage.
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  const currentThemeObject = theme === "light" ? lightTheme : darkTheme;
  const contextValue = { theme: currentThemeObject, toggleTheme };

  return (
    <ThemeContext.Provider value={contextValue}>
      <StyledThemeProvider theme={currentThemeObject}>
        {children}
      </StyledThemeProvider>
    </ThemeContext.Provider>
  );
};
