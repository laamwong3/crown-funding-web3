import {
  AppstoreAddOutlined,
  LoginOutlined,
  LogoutOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  Button,
  Divider,
  Popover,
  Space,
  Switch,
  Tooltip,
  Typography,
} from "antd";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useColorMode } from "../../../contexts/ColorMode";
import { useNotification } from "../../../contexts/Notification";
import useAuthenticate from "../../../hooks/useAuthenticate";
import s from "./Header.module.scss";

const Header = () => {
  const [openAccountDetails, setOpenAccountDetails] = useState(false);

  const { isDarkMode, setIsDarkMode } = useColorMode();
  const {
    authenticate,
    isAuthenticated,
    logout,
    user,
    isAuthenticating,
    isLoggingOut,
  } = useAuthenticate();
  const { openNotification } = useNotification();
  const { push } = useRouter();

  const getNetworkName = (networkId: number | undefined) => {
    switch (networkId) {
      case 97:
        return "Binance Testnet";
      default:
        return null;
    }
  };

  const AccountContents = () => {
    return (
      <>
        <div className={s.account_content}>
          <Typography.Title level={3}>Wallet Address</Typography.Title>
          <Typography.Paragraph copyable style={{ color: "grey" }}>
            {user?.address}
          </Typography.Paragraph>
          <Divider />
          <Typography.Title level={3}>Connected Network</Typography.Title>
          <Typography.Paragraph style={{ color: "grey" }}>
            {getNetworkName(user?.chainId) ?? "unknown network"}
          </Typography.Paragraph>
          <Divider />
          <Typography.Title level={3}>Connected Domain</Typography.Title>
          <Typography.Paragraph style={{ color: "grey" }}>
            {user?.domain}
          </Typography.Paragraph>
          <Divider />
        </div>
      </>
    );
  };

  return (
    <>
      <div className={s.navbar}>
        <Space size={"large"}>
          {isAuthenticated && user ? (
            <>
              <Tooltip title="Create Campaign" placement="bottom">
                <Button
                  onClick={() => push("/createCampaign")}
                  type="ghost"
                  size="large"
                  shape="round"
                  className={s.button}
                  icon={<AppstoreAddOutlined className={s.icon} />}
                />
              </Tooltip>

              <Tooltip title="Account" placement="right">
                <Popover
                  content={<AccountContents />}
                  trigger={"click"}
                  open={openAccountDetails}
                  onOpenChange={(newChange) => {
                    // console.log(newChange);
                    setOpenAccountDetails(newChange);
                  }}
                >
                  <Button
                    type="ghost"
                    size="large"
                    shape="round"
                    className={s.button}
                    icon={<UserOutlined className={s.icon} />}
                  />
                </Popover>
              </Tooltip>
              <Tooltip title="Logout" placement="bottom">
                <Button
                  type="ghost"
                  size="large"
                  shape="round"
                  className={s.button}
                  onClick={logout}
                  disabled={isLoggingOut}
                  icon={<LogoutOutlined className={s.icon} />}
                />
              </Tooltip>
            </>
          ) : (
            <Tooltip title="Wallet Login" placement="bottom">
              <Button
                type="ghost"
                size="large"
                shape="round"
                className={s.button}
                disabled={isAuthenticating}
                onClick={authenticate}
                icon={<LoginOutlined className={s.icon} />}
              />
            </Tooltip>
          )}
          <Tooltip title="Change Theme" placement="bottom">
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
