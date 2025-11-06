"use client";

import { createContext, useState, useEffect, useContext } from "react";

type Theme = "light" | "dark";

// definierar att theme bara kan vara light eller dark
//toggle theme är en funktion som byter mellan light och dark
//theme är det nuvarande. 
interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  //håller koll på om det är light eller dark mode  
  const [theme, setTheme] = useState<Theme>("light");
  //håller koll på om en komponent är mounted eller inte.
  const [mounted, setMounted] = useState(false);

  // Läs från localStorage när komponenten mountas
  useEffect(() => {
    // kollar om det finns ett tema som är sparat i localstorage
    const savedTheme = localStorage.getItem("theme") as Theme | null;
    //kollar om användaren föredrar dark mode eller light mode beroende på systeminställningar
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    setTheme(savedTheme || (prefersDark ? "dark" : "light"));
    setMounted(true);
  }, []);

  // Uppdatera DOM och localStorage när temat ändras
  useEffect(() => {
    if (mounted) {
      document.documentElement.classList.remove("light", "dark");
      document.documentElement.classList.add(theme);
      localStorage.setItem("theme", theme);
    }
  }, [theme, mounted]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  // Förhindra flash of unstyled content
  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
