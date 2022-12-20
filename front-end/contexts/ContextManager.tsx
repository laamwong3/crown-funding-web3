import React from "react";
import { ContextManagerProps } from ".";
import ColorMode from "./ColorMode";
import Notification from "./Notification";

const ContextManager = ({ children }: ContextManagerProps) => {
  return (
    <Notification>
      <ColorMode>{children}</ColorMode>
    </Notification>
  );
};

export default ContextManager;
