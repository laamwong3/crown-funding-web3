import { Button, Carousel, Input, Typography } from "antd";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { CampaignCardProps, CampaignInfo, CampaignTypes } from "..";
import useApiGet from "../../../hooks/useApiGet";
import useApiPost from "../../../hooks/useApiPost";
import s from "./CampaignCard.module.scss";
import noImage from "../../../assets/no_image.jpeg";
import { BigNumber, utils } from "ethers";
import { useContractWrite, usePrepareContractWrite } from "wagmi";
import { address, abi } from "../../../constants/contracts/crownFunding";
import useAuthenticate from "../../../hooks/useAuthenticate";

// interface ImgMeta {
//   width: number;
//   height: number;
// }

const CampaignCard = ({ details, index }: CampaignCardProps) => {
  const { user } = useAuthenticate();
  const [donateAmount, setDonateAmount] = useState("0");
  const [campaignInfo, setCampaignInfo] = useState<CampaignInfo>({
    description: "",
    images: [],
    title: "",
  });

  const { config, isFetched, data } = usePrepareContractWrite({
    address: address,
    abi: abi,
    chainId: user?.chainId,
    functionName: "donate",
    args: [BigNumber.from(index)],
    overrides: {
      value: donateAmount.length !== 0 ? utils.parseEther(donateAmount) : 0,
    },
    // onSuccess: (data) => console.log(data),
    // onError: (err) => console.log(err),
  });

  const { write } = useContractWrite(config);
  // console.log(write);
  // console.log(details.amountCollected)
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
    if (details.campignDetails) fetchDetails();
  }, []);
  // console.log(campaignInfo.images);
  return (
    <div className={s.card}>
      <div className={s.carousel}>
        <Carousel effect="fade">
          {campaignInfo.images.length !== 0 ? (
            campaignInfo.images.map((image, index) => {
              return (
                <Image
                  alt="image"
                  src={image}
                  key={index}
                  width={512}
                  height={256}
                />
              );
            })
          ) : (
            <Image src={noImage} alt={"no image"} width={512} height={256} />
          )}
        </Carousel>
      </div>
      <div className={s.content}>
        <Typography.Title level={4}>Title:</Typography.Title>
        <Typography.Text>{campaignInfo.title || "NO TITLE"}</Typography.Text>
      </div>
      <div className={s.content}>
        <Typography.Title level={4}>Description:</Typography.Title>
        <Typography.Text style={{ height: "100px", overflow: "hidden" }}>
          {campaignInfo.description || "NO DESCRIPTION"}
        </Typography.Text>
      </div>
      <div className={s.content}>
        <Typography.Title level={4}>Fund Raised:</Typography.Title>
        <Typography.Text>
          {utils.formatEther(details.amountCollected)} of{" "}
          {utils.formatEther(details.targetFund)} BNB
        </Typography.Text>
      </div>
      <div className={s.fund_button}>
        <Input
          type="number"
          min={0}
          step={0.01}
          placeholder="Enter a donation amount (BNB)"
          value={donateAmount}
          onChange={(e) => setDonateAmount(e.target.value)}
        />
        <Button
          type="primary"
          style={{ marginTop: "1rem" }}
          disabled={!write}
          onClick={() => write?.()}
        >
          FUND THIS PROJECT
        </Button>
      </div>
    </div>
  );
};

export default CampaignCard;
