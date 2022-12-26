import { Button, DatePicker, Input, InputNumber, Typography } from "antd";
import React, { useState } from "react";
import { useColorMode } from "../../contexts/ColorMode";
import s from "./CampaignForm.module.scss";
import UploadButton from "./UploadButton/UploadButton";

const CampaignForm = () => {
  const [images, setImages] = useState<string[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [targetAmount, setTargetAmount] = useState(0);
  const [endDate, setEndDate] = useState<Date>(new Date());

  const { isDarkMode } = useColorMode();

  // console.log(images);
  return (
    <div className={s.wrapper}>
      <div
        className={s.form}
        style={
          isDarkMode
            ? { boxShadow: "0 0 100px white" }
            : { boxShadow: "0 0 100px black" }
        }
      >
        <Typography.Title level={1} style={{ textAlign: "center" }}>
          Create Campign
        </Typography.Title>

        <div className={s.form_item}>
          <Typography.Title level={3}>
            Campaign Image (Max 5 Images)
          </Typography.Title>
          <UploadButton setImages={setImages} />
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
        <div className={s.form_item}>
          <Typography.Title level={3}>Target (BNB):</Typography.Title>
          <InputNumber min={0.01} step={0.01} style={{ width: "100%" }} />
        </div>
        <div className={s.form_item}>
          <Typography.Title level={3}>End Date and Time:</Typography.Title>
          <DatePicker
            style={{ width: "100%" }}
            showTime
            onChange={(value, date) => {
              console.log(new Date(date).getTime());
            }}
          />
        </div>
        <div className={s.form_button}>
          <Button size="large">Create Campaign</Button>
        </div>
      </div>
    </div>
  );
};

export default CampaignForm;
