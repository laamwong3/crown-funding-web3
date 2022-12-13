import React, { createContext, useContext, useState } from "react";
import { theme } from "antd";
import { ColorModeContextProps, ColorModeProps } from ".";

const ColorModeContext = createContext({} as ColorModeContextProps);

const ColorMode = ({ children }: ColorModeProps) => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  return (
    <ColorModeContext.Provider value={{ isDarkMode, setIsDarkMode }}>
      {children}
    </ColorModeContext.Provider>
  );
};

export default ColorMode;

export const useColorMode = () => useContext(ColorModeContext);
