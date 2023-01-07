import { BigNumber } from "ethers";
import { NextPage } from "next";
import React, { useEffect, useState } from "react";
import {
  useContractInfiniteReads,
  paginatedIndexesConfig,
  useContractReads,
  useContractRead,
  useContractEvent,
  useWatchPendingTransactions,
} from "wagmi";
import { abi, address } from "../constants/contracts/crownFunding";
import useAuthenticate from "../hooks/useAuthenticate";
import { bsc, bscTestnet } from "wagmi/chains";

interface CampaignTypes {
  campignDetails: string;
  creator: `0x${string}`;
  targetFund: BigNumber;
  amountCollected: BigNumber;
  deadline: BigNumber;
  isFundClaimed: boolean;
}

const crownFundingContract = {
  abi,
  address,
};

const Home: NextPage = () => {
  const [totalItems, setTotalItems] = useState(0);
  const [campaignDetails, setCampaignDetails] = useState<CampaignTypes[]>([]);

  const { isAuthenticated } = useAuthenticate();

  // useContractEvent({
  //   ...crownFundingContract,
  //   eventName: "Created",
  //   chainId: bscTestnet.id,
  //   listener: (a1, a2, a3, a4, a5) => {
  //     console.log(a1);
  //     console.log(a2);
  //     console.log(a3);
  //     console.log(a4);
  //     console.log(a5);
  //   },
  // });

  // useWatchPendingTransactions({
  //   chainId: bscTestnet.id,
  //   listener: (tx) => console.log(tx),
  // });

  useContractRead({
    ...crownFundingContract,
    functionName: "campignId",
    watch: true,
    chainId: bscTestnet.id,
    onSuccess: (id) => setTotalItems(id.toNumber()),
  });

  const { refetch, data } = useContractInfiniteReads({
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
  });
  // console.log(campaignId?.toNumber());
  // console.log(campaignDetails);
  // console.log(data?.pages);

  useEffect(() => {
    if (totalItems !== 0) {
      refetch();
    }
  }, [totalItems]);

  return (
    <div>
      {/* {data?.pages.map((d, index) => (
        <p key={index}>{d[0].creator}</p>
      ))} */}
    </div>
  );
};

export default Home;
