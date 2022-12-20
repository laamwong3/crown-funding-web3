export interface ColorModeProps {
  children: React.ReactNode;
}

export interface ColorModeContextProps {
  isDarkMode: boolean;
  setIsDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface ContextManagerProps {
  children: React.ReactNode;
}

export type NotificationType = "success" | "info" | "warning" | "error";
export interface MessageTypes {
  type: NotificationType;
  message: string;
  description: string;
}

export interface NotificationProps {
  children: React.ReactNode;
}
export interface NotificationContextProps {
  openNotification: ({ description, message, type }: MessageTypes) => void;
}
