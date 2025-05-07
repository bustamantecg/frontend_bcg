import { useState, useEffect } from "react";

const ThemeSwitcher = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <label className="flex cursor-pointer gap-2">
      <input
        type="checkbox"
        className="toggle theme-controller"
        onChange={toggleTheme}
        checked={theme === "dark"}
      />
      <span>{theme === "dark" ? "🌙" : "☀️"}</span>
    </label>
  );
};

export default ThemeSwitcher;