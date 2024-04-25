"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { SunIcon, MoonIcon } from "@heroicons/react/24/solid";

export default function SwitchDarkLightMode() {
  const { theme, setTheme } = useTheme();
  const [isDarkMode, setIsDarkMode] = useState(theme === "dark");

  useEffect(() => {
    setIsDarkMode(theme === "dark");
  }, [theme]);

  return (
    <div className=" fixed bottom-5 right-5 md:bottom-10 md:right-10 z-50">
      <button
        onClick={() => {
          setTheme(isDarkMode ? "light" : "dark");
          setIsDarkMode(!isDarkMode);
        }}
        className="p-2 rounded-full bg-gray-200 dark:bg-gray-800"
      >
        {isDarkMode ? (
          <SunIcon className="h-6 w-6 text-yellow-500" />
        ) : (
          <MoonIcon className="h-6 w-6 text-gray-800 dark:text-gray-200" />
        )}
      </button>
    </div>
  );
}
