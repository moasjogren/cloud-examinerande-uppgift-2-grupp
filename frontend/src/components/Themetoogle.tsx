"use client"

import { useTheme } from "@/context/ThemeContext"

export function ThemeToggle() {
    const {theme, toggleTheme} = useTheme();

     return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg border border-[rgb(var(--border))] 
                 hover:bg-[rgb(var(--card))] transition-colors"
      aria-label="Toggle theme"
    >
      {theme === "light" ? "🌙" : "☀️"}
    </button>
  );
}