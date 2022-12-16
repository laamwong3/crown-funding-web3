import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";
import { CrownFunding, CrownFunding__factory } from "../typechain-types";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";

describe("Testing CrownFunding.sol", () => {
  let CrownFunding: CrownFunding__factory;
  let crownFunding: CrownFunding;
  let owner: SignerWithAddress;
  let donators: SignerWithAddress[];

  beforeEach(async () => {
    [owner, ...donators] = await ethers.getSigners();
    CrownFunding = await ethers.getContractFactory("CrownFunding");
    crownFunding = await CrownFunding.connect(owner).deploy();
    await crownFunding.deployed();
  });

  describe("Stage testing", () => {
    it("Should create campign", async () => {});
  });
});
