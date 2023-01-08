import { Carousel } from "antd";
import Image from "next/image";
import React from "react";
import { CampaignCardProps, CampaignTypes } from "..";
import useApiGet from "../../../hooks/useApiGet";
import s from "./CampaignCard.module.scss";

const CampaignCard = ({ details }: CampaignCardProps) => {
  return (
    <div className={s.card}>
      <div className={s.carousel}>
        <Carousel effect="fade">
          <div>HELLo</div>
          {/* <Image alt="image" src={} /> */}
        </Carousel>
      </div>
    </div>
  );
};

export default CampaignCard;
