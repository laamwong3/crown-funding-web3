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

// interface ImgMeta {
//   width: number;
//   height: number;
// }

const CampaignCard = ({ details }: CampaignCardProps) => {
  const [campaignInfo, setCampaignInfo] = useState<CampaignInfo>({
    description: "",
    images: [],
    title: "",
  });
  // const [imgMeta, setImgMeta] = useState<ImgMeta[]>([]);

  // useEffect(() => {
  //   const getMeta = () => {
  //     let tempimgArr: ImgMeta[] = [];
  //     campaignInfo.images.map(async (image) => {
  //       const img = document.createElement("img");
  //       img.src = image;
  //       await img.decode();
  //       tempimgArr.push({ width: img.naturalWidth, height: img.naturalHeight });
  //     });
  //     setImgMeta(tempimgArr);
  //   };

  //   getMeta();
  // }, [campaignInfo]);

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
          {campaignInfo.images.map((image, index) => {
            return (
              <Image
                alt="image"
                src={image}
                key={index}
                width={512}
                // height={256}
              />
            );
          })}
        </Carousel>
      </div>
    </div>
  );
};

export default CampaignCard;
