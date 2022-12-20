import { ethers } from "hardhat";
import fs from "fs";

async function main() {
  const CrownFunding = await ethers.getContractFactory("CrownFunding");
  const crownFunding = await CrownFunding.deploy();

  const data = {
    address: crownFunding.address,
    abi: JSON.parse(crownFunding.interface.format("json").toString()),
  };

  fs.writeFileSync(
    "../front-end/constants/contracts/CrownFunding.json",
    JSON.stringify(data, null, 2)
  );

  console.log(`address is ${crownFunding.address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
