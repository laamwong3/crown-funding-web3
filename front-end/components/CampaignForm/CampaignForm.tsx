import { Button, DatePicker, Input, InputNumber, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { useColorMode } from "../../contexts/ColorMode";
import s from "./CampaignForm.module.scss";
import UploadButton from "./UploadButton/UploadButton";
import { useNotification } from "../../contexts/Notification";
import useAuthenticate from "../../hooks/useAuthenticate";
import { IpfsResponse } from ".";
import crownFunding from "../../constants/contracts/CrownFunding.json";
import {
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
} from "wagmi";
import { utils } from "ethers";

const CampaignForm = () => {
  const [images, setImages] = useState<string[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [targetAmount, setTargetAmount] = useState(0);
  const [endDate, setEndDate] = useState(new Date().getTime());
  const [campaignDetails, setCampaignDetails] = useState("");
  const [isUploadingToIpfs, setIsUploadingToIpfs] = useState(false);
  const [hasUploadedToIpfs, setHasUploadedToIpfs] = useState(false);
  const { user } = useAuthenticate();

  const {
    config,
    isFetched,
    isLoading: isPreparingContract,
    isSuccess,
  } = usePrepareContractWrite({
    address: crownFunding.address,
    abi: crownFunding.abi,
    functionName: "createCampign",
    chainId: user?.chainId,
    args: [utils.parseEther(targetAmount.toString()), endDate, campaignDetails],
  });
  console.log(isFetched);
  const {
    write,
    data,
    isLoading: isWritingToBlockchain,
  } = useContractWrite(config);
  const { isLoading: isWaitingForConfirmation, isFetched: isConfirmed } =
    useWaitForTransaction({
      hash: data?.hash,
      confirmations: 1,
    });

  const { isDarkMode } = useColorMode();
  const { openNotification } = useNotification();

  const toSolidityTime = (time: number) => Math.floor(time / 1000);

  const showErrorMessage = (description: string) => {
    openNotification({
      type: "error",
      message: "Input Error",
      description,
    });
  };

  const isValidInput = () => {
    if (images.length === 0) {
      showErrorMessage("No images is provided");
      return false;
    }
    if (title.length === 0) {
      showErrorMessage("No title");
      return false;
    }
    if (description.length === 0) {
      showErrorMessage("No description");
      return false;
    }
    if (targetAmount === 0 || isNaN(targetAmount)) {
      showErrorMessage("Target amount cannot be 0");
      return false;
    }
    if (endDate <= toSolidityTime(new Date().getTime())) {
      showErrorMessage("Invalid date, end date should be in the future");
      return false;
    }
    return true;
  };

  const uploadToIpfsAndBlockchain = async () => {
    if (!isValidInput()) return;

    try {
      setHasUploadedToIpfs(false);
      setIsUploadingToIpfs(true);
      // upload images
      let imagesAbi: { path: string; content: string }[] = [];
      await Promise.all(
        images.map((image, index) => {
          imagesAbi.push({
            path: `images/${index}.png`,
            content: image,
          });
        })
      );
      const imagesResponse = await fetch("/api/ipfs", {
        method: "POST",
        headers: {
          accept: "application/json",
          "content-type": "application/json",
        },
        body: JSON.stringify(imagesAbi),
      });
      const imagesIpfs = (await imagesResponse.json()) as IpfsResponse[];
      // console.log(imagesIpfs);
      //upload metadata
      let resolvedIpfsImages: string[] = [];
      await Promise.all(
        imagesIpfs.map((image) => {
          resolvedIpfsImages.push(image.path);
        })
      );
      let metadataContent = {
        title,
        description,
        images: resolvedIpfsImages,
      };

      let metadataAbi: { path: string; content: string }[] = [
        {
          path: "campaign.json",
          // @ts-ignore
          content: metadataContent,
        },
      ];
      // console.log(metadataAbi);
      const metadataResponse = await fetch("/api/ipfs", {
        method: "POST",
        headers: {
          accept: "application/json",
          "content-type": "application/json",
        },
        body: JSON.stringify(metadataAbi),
      });
      const metadataIpfs = (await metadataResponse.json()) as IpfsResponse[];
      setCampaignDetails(metadataIpfs[0].path);
      setHasUploadedToIpfs(true);

      console.log("ready");
    } catch (error) {
      console.log(error);
    } finally {
      setIsUploadingToIpfs(false);
    }
  };

  useEffect(() => {
    if (hasUploadedToIpfs && isFetched) {
      write?.();
    }
  }, [isFetched, hasUploadedToIpfs]);

  useEffect(() => {
    if (isConfirmed) {
      setHasUploadedToIpfs(false);
    }
  }, [isConfirmed]);

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
            // value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className={s.form_item}>
          <Typography.Title level={3}>Description:</Typography.Title>
          <Input.TextArea
            placeholder="Enter a description of the campaign"
            autoSize={{ maxRows: 10, minRows: 5 }}
            showCount
            maxLength={1000}
            // value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className={s.form_item}>
          <Typography.Title level={3}>Target (BNB):</Typography.Title>
          <InputNumber
            min={0.01}
            step={0.01}
            style={{ width: "100%" }}
            // value={targetAmount}
            onChange={(e) => {
              e && setTargetAmount(e);
            }}
          />
        </div>
        <div className={s.form_item}>
          <Typography.Title level={3}>End Date and Time:</Typography.Title>
          <DatePicker
            style={{ width: "100%" }}
            showTime
            onChange={(value, date) => {
              setEndDate(toSolidityTime(new Date(date).getTime()));
            }}
          />
        </div>
        <div className={s.form_button}>
          <Button size="large" onClick={uploadToIpfsAndBlockchain}>
            Create Campaign
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CampaignForm;
