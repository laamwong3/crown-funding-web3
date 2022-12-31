import { NextPage } from "next";
import Link from "next/link";
import React, { useEffect } from "react";
import { useAccount, useNetwork, useProvider, useSwitchNetwork } from "wagmi";

const Home: NextPage = () => {
  const { chain } = useNetwork();
  const provider = useProvider();
  const { connector } = useAccount();
  const { pendingChainId, chains, data, switchNetwork } = useSwitchNetwork();
  console.log(connector?.chains);

  // console.log(pendingChainId);
  // console.log(_network);
  // connector?.on("change", (data) => {
  //   if (data.chain) {
  //     switchNetwork?.(data.chain.id);
  //   }
  // });
  // useEffect(() => {
  //   connector?.on("change", (data) => {
  //     if (data.chain) {
  //       switchNetwork?.(data.chain.id);
  //     }
  //   });
  // }, [connector]);
  return (
    <div>
      <Link href={"/about"}>about</Link>
    </div>
  );
};

export default Home;
