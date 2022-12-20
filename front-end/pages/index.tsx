import { NextPage } from "next";
import Link from "next/link";
import React from "react";

const Home: NextPage = () => {
  return (
    <div>
      <Link href={"/about"}>about</Link>
    </div>
  );
};

export default Home;
