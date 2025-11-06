"use client";

import { useTheme } from "@/context/ThemeContext";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="theme-toggle"
      aria-label="Toggle theme"
      title={theme === "light" ? "Byt till mörkt läge" : "Byt till ljust läge"}
    >
      {theme === "light" ? "🌙" : "☀️"}
    </button>
  );
}
