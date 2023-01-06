import { BigNumber } from "ethers";
import { NextPage } from "next";
import React, { useEffect, useState } from "react";
import {
  useContractInfiniteReads,
  paginatedIndexesConfig,
  useContractReads,
} from "wagmi";
import { abi, address } from "../constants/contracts/crownFunding";

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
  const [campaigns, setCampaigns] = useState<CampaignTypes[] | undefined>([]);

  const { refetch, data } = useContractInfiniteReads({
    cacheKey: "funding",
    ...paginatedIndexesConfig(
      (index) => [
        {
          ...crownFundingContract,
          functionName: "getCompaigns",
          args: [BigNumber.from(index)] as const,
        },
      ],
      {
        start: 0,
        perPage: totalItems,
        direction: "increment",
      }
    ),
  });

  console.log(data?.pages);

  useEffect(() => {
    refetch();
  }, [totalItems]);

  // console.log(data?.pages[0]);
  // if (campaigns) console.log(campaigns[0].creator);
  // useEffect(() => {
  //   (async () => {
  //     const response = await refetch();
  //     // console.log(response.data?.pages[0][0] as CampaignTypes);

  //     setCampaigns(response.data?.pages[0] as CampaignTypes[]);
  //   })();
  // }, [totalItems]);

  return (
    <div>
      <button onClick={() => setTotalItems((prev) => prev + 1)}>
        fetch more
      </button>
      {/* {data?.pages.map((d, index) => (
        <p key={index}>{d[0].creator}</p>
      ))} */}
    </div>
  );
};

export default Home;
