import { BigNumber } from "ethers";
import { NextPage } from "next";
import React, { useEffect, useState } from "react";
import {
  useContractInfiniteReads,
  paginatedIndexesConfig,
  useContractReads,
} from "wagmi";
import { abi, address } from "../constants/contracts/crownFunding";

const crownFundingContract = {
  abi,
  address,
};

const Home: NextPage = () => {
  const [items, setItems] = useState(0);

  const { data: contractinfo, refetch } = useContractReads({
    contracts: [
      {
        ...crownFundingContract,
        functionName: "campignId",
      },
    ],
  });

  // console.log(contractinfo?.[0].toNumber());

  const { data, hasNextPage, fetchNextPage } = useContractInfiniteReads({
    cacheKey: "a",
    contracts: (param = 0) => [
      {
        ...crownFundingContract,
        functionName: "getCompaigns",
        args: [BigNumber.from(param)] as const,
      },
    ],
    getNextPageParam: (lastPage, allPages) => {
      // console.log(allPages.length);
      return allPages.length + 1;
    },
  });

  console.log(data);
  // const reload = async () => {
  //   const result = await refetch();
  //   // console.log(result.data?.[0].toNumber());
  // };
  // const { data, fetchNextPage } = useContractInfiniteReads({
  //   cacheKey: "funding",
  //   ...paginatedIndexesConfig(
  //     (index) => [
  //       {
  //         ...crownFundingContract,
  //         functionName: "getCompaigns",
  //         args: [BigNumber.from(index)] as const,
  //       },
  //     ],
  //     {
  //       start: 0,
  //       perPage: contractinfo?.[0].toNumber() ?? 0,
  //       direction: "increment",
  //     }
  //   ),
  // });
  // console.log(contractinfo?.[0].toNumber());
  // console.log(data?.pages[0][0]);
  return (
    <div>
      <button
        onClick={async () => {
          console.log(hasNextPage);
          if (hasNextPage) {
            await fetchNextPage();
          }
        }}
      >
        fetch more
      </button>
      {/* {data?.pages.map((d, index) => (
        <p key={index}>{d[0].creator}</p>
      ))} */}
    </div>
  );
};

export default Home;
