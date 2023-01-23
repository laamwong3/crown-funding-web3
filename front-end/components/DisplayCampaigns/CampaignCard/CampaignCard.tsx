import { Button, Carousel } from "antd";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { CampaignCardProps, CampaignTypes } from "..";
import useApiGet from "../../../hooks/useApiGet";
import useApiPost from "../../../hooks/useApiPost";
import s from "./CampaignCard.module.scss";

interface CampaignInfo {
  title: string;
  description: string;
  images: string[];
}

const CampaignCard = ({ details }: CampaignCardProps) => {
  const [campaignInfo, setCampaignInfo] = useState<CampaignInfo>({
    description: "",
    images: [],
    title: "",
  });

  console.log(campaignInfo.title);
  useEffect(() => {
    const fetchDetails = async () => {
      const response = await fetch(details.campignDetails);
      const data: CampaignInfo = await response.json();
      setCampaignInfo(data);
    };
    fetchDetails();
  }, []);

  return (
    <div className={s.card}>
      <div className={s.carousel}>
        <Carousel effect="fade" autoplay>
          {campaignInfo.images.map((image, index) => (
            <Image
              alt="image"
              src={image}
              key={index}
              width={128}
              height={128}
            />
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default CampaignCard;
