import { ConfigProvider, theme } from "antd";
import React, { useEffect } from "react";
import { LayoutProps } from ".";
import { useColorMode } from "../../contexts/ColorMode";
import Footer from "./Footer/Footer";
import Header from "./Header/Header";
import s from "./Layout.module.scss";

const { darkAlgorithm, defaultAlgorithm } = theme;

const Layout = ({ children }: LayoutProps) => {
  const { isDarkMode } = useColorMode();

  return (
    <>
      <ConfigProvider
        theme={{ algorithm: isDarkMode ? darkAlgorithm : defaultAlgorithm }}
      >
        <Header />
        <div className={s.center_page}>
          {children}
          <Footer />
        </div>
      </ConfigProvider>
    </>
  );
};

export default Layout;
