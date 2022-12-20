import React, { createContext, useContext, useEffect, useState } from "react";
import { theme } from "antd";
import { ColorModeContextProps, ColorModeProps } from ".";

const ColorModeContext = createContext({} as ColorModeContextProps);

const ColorMode = ({ children }: ColorModeProps) => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    if (isDarkMode) {
      document.body.style.background = "black";
    } else {
      document.body.style.background = "white";
    }
  }, [isDarkMode]);

  return (
    <ColorModeContext.Provider value={{ isDarkMode, setIsDarkMode }}>
      {children}
    </ColorModeContext.Provider>
  );
};

export default ColorMode;

export const useColorMode = () => useContext(ColorModeContext);
