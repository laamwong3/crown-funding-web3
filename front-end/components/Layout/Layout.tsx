import { ConfigProvider, theme } from "antd";
import React, { useEffect } from "react";
import { LayoutProps } from ".";
import { useColorMode } from "../../contexts/ColorMode";
import Footer from "./Footer/Footer";
import Header from "./Header/Header";

const { darkAlgorithm, defaultAlgorithm } = theme;

const Layout = ({ children }: LayoutProps) => {
  const { isDarkMode } = useColorMode();

  return (
    <>
      <ConfigProvider
        theme={{ algorithm: isDarkMode ? darkAlgorithm : defaultAlgorithm }}
      >
        <Header />
        {children}
        <Footer />
      </ConfigProvider>
    </>
  );
};

export default Layout;
