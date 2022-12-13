import { Dispatch, ReactNode, SetStateAction } from "react";
import type { DerivativeFunc } from "@ant-design/cssinjs";
import type { SeedToken } from "antd/es/theme/internal";
import type { MapToken } from "antd/es/theme/interface";

export interface ColorModeProps {
  children: ReactNode;
}

export interface ColorModeContextProps {
  isDarkMode: boolean;
  setIsDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
}
