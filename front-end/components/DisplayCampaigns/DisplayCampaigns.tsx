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
import { Col, Row } from "antd";

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
      <Row gutter={[16, 16]}>
        {campaignDetails.map((details, index) => (
          <Col key={index} xs={24} sm={12} md={8} lg={8} xl={6} xxl={6}>
            <CampaignCard details={details} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default DisplayCampaigns;
