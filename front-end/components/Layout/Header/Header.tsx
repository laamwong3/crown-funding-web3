import { Button, Typography } from "antd";
import React, { useEffect } from "react";
import { useColorMode } from "../../../contexts/ColorMode";

const Header = () => {
  const { isDarkMode, setIsDarkMode } = useColorMode();

  useEffect(() => {
    if (isDarkMode) {
      document.body.style.background = "black";
    } else {
      document.body.style.background = "white";
    }
  }, [isDarkMode]);
  return (
    <>
      <button
        onClick={() => {
          setIsDarkMode(!isDarkMode);
        }}
      >
        toggle
      </button>
      <Button>switch</Button>
      <Button>switch</Button>
      <Typography.Title>Nice</Typography.Title>
    </>
  );
};

export default Header;
