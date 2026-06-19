"use client";

import * as React from "react";

interface ThemeProviderProps {
  children: React.ReactNode;
}

const ThemeContext = React.createContext<{
  theme: "light" | "dark";
  setTheme: (theme: "light" | "dark") => void;
}>({ theme: "dark", setTheme: () => {} });

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setThemeState] = React.useState<"light" | "dark">(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("theme");
      if (stored === "dark" || stored === "light") return stored;
    }
    return "dark";
  });

  const setTheme = React.useCallback((newTheme: "light" | "dark") => {
    setThemeState(newTheme);
    localStorage.setItem("theme", newTheme);
  }, []);

  React.useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return React.useContext(ThemeContext);
}
