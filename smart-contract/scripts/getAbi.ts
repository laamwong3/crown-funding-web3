import { ethers } from "hardhat";
import fs from "fs";
import { config } from "dotenv";
import fetch from "node-fetch";
config();

async function main() {
  const address = "0xF4fE4132D564C9520Dbc4e9D043CA395a840bCC1";
  const requestUrl = `https://api-testnet.bscscan.com/api?module=contract&action=getabi&address=${address}&apikey=${process.env.BSCSCAN_API_KEY}`;
  const response = await fetch(requestUrl);
  const data = await response.json();

  const addressData = `export const address = "${address}" as const`;
  const abiData = `\nexport const abi = ${data.result} as const`;

  fs.writeFileSync("./constants/crownFunding.ts", addressData);
  fs.writeFileSync("./constants/crownFunding.ts", abiData, { flag: "a" });
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
