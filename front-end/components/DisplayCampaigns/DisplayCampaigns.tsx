import React, { useEffect, useState } from "react";
import s from "./DisplayCampaigns.module.scss";
import { abi, address } from "../../constants/contracts/crownFunding";
import { CampaignTypes } from ".";
import {
  paginatedIndexesConfig,
  useContractInfiniteReads,
  useContractRead,
} from "wagmi";
import { bsc, bscTestnet } from "wagmi/chains";
import { BigNumber } from "ethers";
import CampaignCard from "./CampaignCard/CampaignCard";

const crownFundingContract = {
  abi,
  address,
};

const DisplayCampaigns = () => {
  const [totalItems, setTotalItems] = useState(0);
  const [campaignDetails, setCampaignDetails] = useState<CampaignTypes[]>([]);

  useContractRead({
    ...crownFundingContract,
    functionName: "campignId",
    watch: true,
    chainId: bscTestnet.id,
    onSuccess: (id) => setTotalItems(id.toNumber()),
    onError: (err) => console.log(err.message),
  });

  const { refetch } = useContractInfiniteReads({
    cacheKey: "test",
    ...paginatedIndexesConfig(
      (index) => [
        {
          ...crownFundingContract,
          functionName: "getCompaigns",
          args: [BigNumber.from(index)] as const,
          chainId: bscTestnet.id,
        },
      ],
      {
        start: 0,
        perPage: totalItems,
        direction: "increment",
      }
    ),
    onSuccess: (data) => setCampaignDetails(data.pages[0] as CampaignTypes[]),
    onError: (err) => console.log(err.message),
  });

  useEffect(() => {
    if (totalItems !== 0) {
      refetch();
    }
  }, [totalItems]);

  return (
    <div className={s.wrapper}>
      <div className={s.cards}>
        {campaignDetails.map((details, index) => (
          <CampaignCard key={index} />
        ))}
      </div>
    </div>
  );
};

export default DisplayCampaigns;
