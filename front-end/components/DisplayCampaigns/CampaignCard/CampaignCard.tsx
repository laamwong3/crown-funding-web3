import { Button, Carousel } from "antd";
import Image from "next/image";
import React from "react";
import { CampaignCardProps, CampaignTypes } from "..";
import useApiGet from "../../../hooks/useApiGet";
import useApiPost from "../../../hooks/useApiPost";
import s from "./CampaignCard.module.scss";

const CampaignCard = ({ details }: CampaignCardProps) => {
  const { trigger } = useApiPost("/api/getIpfsImage");

  return (
    <Button
      size="large"
      onClick={async () => {
        const result = await trigger([{ a: 10, b: 20 }]);
        console.log(result);
      }}
    >
      FETCH
    </Button>
    // <div className={s.card}>
    //   <div className={s.carousel}>
    //     <Carousel effect="fade">
    //       <div>HELLo</div>
    //       {/* <Image alt="image" src={} /> */}
    //     </Carousel>
    //   </div>
    // </div>
  );
};

export default CampaignCard;
