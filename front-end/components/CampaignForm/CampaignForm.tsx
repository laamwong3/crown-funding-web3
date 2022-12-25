import { Input, Typography } from "antd";
import React from "react";
import s from "./CampaignForm.module.scss";
import UploadButton from "./UploadButton/UploadButton";

const CampaignForm = () => {
  return (
    <div className={s.wrapper}>
      <div className={s.form}>
        <div className={s.form_item}>
          <Typography.Title level={3}>Campaign Image</Typography.Title>
          <UploadButton />
        </div>
        <div className={s.form_item}>
          <Typography.Title level={3}>Title:</Typography.Title>
          <Input.TextArea
            placeholder="Enter a title of the campaign"
            autoSize
          />
        </div>
        <div className={s.form_item}>
          <Typography.Title level={3}>Description:</Typography.Title>
          <Input.TextArea
            placeholder="Enter a description of the campaign"
            autoSize={{ maxRows: 10, minRows: 5 }}
            showCount
            maxLength={1000}
          />
        </div>
      </div>
    </div>
  );
};

export default CampaignForm;
