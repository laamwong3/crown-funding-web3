import {
  AppstoreAddOutlined,
  LoginOutlined,
  LogoutOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Space, Switch, Tooltip, Typography } from "antd";
import React, { useEffect } from "react";
import { useColorMode } from "../../../contexts/ColorMode";
import { useNotification } from "../../../contexts/Notification";
import useAuthenticate from "../../../hooks/useAuthenticate";
import s from "./Header.module.scss";

const Header = () => {
  const { isDarkMode, setIsDarkMode } = useColorMode();
  const { authenticate, isAuthenticated, logout, user } = useAuthenticate();
  const { openNotification } = useNotification();
  // console.log(isAuthenticated);
  // console.log(user?.uri);
  return (
    <>
      <div className={s.navbar}>
        <Space size={"large"}>
          {isAuthenticated && user ? (
            <>
              <Tooltip title="Logout">
                <LogoutOutlined className={s.icon} onClick={logout} />
              </Tooltip>
              <Tooltip title="Account">
                <UserOutlined className={s.icon} />
              </Tooltip>
              <Tooltip title="Create Campaign">
                <AppstoreAddOutlined className={s.icon} />
              </Tooltip>
            </>
          ) : (
            <Tooltip title="Wallet Login">
              <LoginOutlined className={s.icon} onClick={authenticate} />
            </Tooltip>
          )}
          <Tooltip title="Change Theme">
            <Switch
              checkedChildren="Dark"
              unCheckedChildren="Light"
              checked={isDarkMode}
              onClick={() => setIsDarkMode(!isDarkMode)}
            />
          </Tooltip>
        </Space>
      </div>
    </>
  );
};

export default Header;
