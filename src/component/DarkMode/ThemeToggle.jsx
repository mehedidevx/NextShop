"use client"

import { Moon, Sun } from "lucide-react";
import { useState, useEffect } from "react";

const ThemeToggle = () => {
  const [theme, setTheme] = useState("light"); // initial value safe


  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2 cursor-pointer rounded-full transition-colors duration-300 
                  bg-base-content/10 "
      title={theme === "light" ? "Switch to Dark Mode" : "Switch to Light Mode"}
    >
      <span className="text-lg">
        {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
      </span>
    </button>
  );
};

export default ThemeToggle;
