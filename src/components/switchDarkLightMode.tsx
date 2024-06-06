"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";

export default function SwitchDarkLightMode() {
  const { theme, setTheme } = useTheme();
  const [isDarkMode, setIsDarkMode] = useState(theme === "dark");

  useEffect(() => {
    setIsDarkMode(theme === "dark");
  }, [theme]);

  return (
    <div className="">
      <button
        onClick={() => {
          setTheme(isDarkMode ? "light" : "dark");
          setIsDarkMode(!isDarkMode);
        }}
        className="py-2 px-3 rounded-md bg-trasparent border-[1px] border-neutral-700 dark:border-neutral-400"
      >
        {isDarkMode ? <p>Dark</p> : <p>Light</p>}
      </button>
    </div>
  );
}
