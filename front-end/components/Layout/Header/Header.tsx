import { Button, Typography } from "antd";
import React, { useEffect } from "react";
import { useColorMode } from "../../../contexts/ColorMode";
import { useNotification } from "../../../contexts/Notification";
import useAuthenticate from "../../../hooks/useAuthenticate";

const Header = () => {
  const { isDarkMode, setIsDarkMode } = useColorMode();
  const { authenticate, isAuthenticated, logout, user } = useAuthenticate();
  const { openNotification } = useNotification();
  // console.log(isAuthenticated);
  // console.log(user?.uri);
  return (
    <>
      {/* <ConnectButton /> */}
      <Button onClick={() => setIsDarkMode(!isDarkMode)}>toggle</Button>
      {isAuthenticated && user ? (
        <Button onClick={logout}>logout</Button>
      ) : (
        <Button onClick={authenticate}>connect</Button>
      )}
      <Button
        onClick={() =>
          openNotification({
            description: "hello",
            message: "yes",
            type: "success",
          })
        }
      >
        open notification
      </Button>
    </>
  );
};

export default Header;
