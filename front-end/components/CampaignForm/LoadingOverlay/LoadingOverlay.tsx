import { Spin, Typography } from "antd";
import React from "react";
import s from "./LoadingOverlay.module.scss";

const LoadingOverlay = ({ title }: { title: string }) => {
  return (
    <div className={s.overlay}>
      <Typography.Title>{title}</Typography.Title>
      <Spin size="large" />
    </div>
  );
};

export default LoadingOverlay;
