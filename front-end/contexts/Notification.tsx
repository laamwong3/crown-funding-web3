import { notification } from "antd";
import React, { createContext, useContext } from "react";
import {
  MessageTypes,
  NotificationContextProps,
  NotificationProps,
  NotificationType,
} from ".";

const NotificationContext = createContext({} as NotificationContextProps);

const Notification = ({ children }: NotificationProps) => {
  const [api, context] = notification.useNotification();

  const openNotification = ({ description, message, type }: MessageTypes) => {
    api[type]({
      message,
      description,
      placement: "top",
      duration: 4,
    });
  };
  return (
    <NotificationContext.Provider value={{ openNotification }}>
      {context}
      {children}
    </NotificationContext.Provider>
  );
};

export default Notification;

export const useNotification = () => useContext(NotificationContext);
