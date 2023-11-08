"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";

const ToggleDarkMode = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const toggleDarkMode = () => {
    if (!isButtonDisabled) {
      setIsButtonDisabled(true);
      setIsDarkMode(!isDarkMode);

      setTimeout(() => {
        setIsButtonDisabled(false);
      }, 300);
    }
  };

  const setButtonVisibility = (darkMode: boolean) => {
    if (darkMode) {
      return "hidden";
    } else {
      return "";
    }
  };

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDarkMode);
  }, [isDarkMode]);

  return (
    <button onClick={toggleDarkMode}>
      <Image
        className={setButtonVisibility(!isDarkMode)}
        src="/icons/sun.png"
        alt="Disable dark mode"
        width={32}
        height={32}
      />
      <Image
        className={setButtonVisibility(isDarkMode)}
        src="/icons/moon.png"
        alt="Enable dark mode"
        width={32}
        height={32}
      />
    </button>
  );
};

export default ToggleDarkMode;
