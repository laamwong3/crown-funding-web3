import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";
import { CrownFunding, CrownFunding__factory } from "../typechain-types";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";

// const toSolidityTime = (date: Date) => Math.round(date.getTime() / 1000);
// const combineDeadline = (deadlineInSeconds: number) =>
//   toSolidityTime(new Date()) + deadlineInSeconds;

describe("Testing CrownFunding.sol", () => {
  let CrownFunding: CrownFunding__factory;
  let crownFunding: CrownFunding;
  let owner: SignerWithAddress;
  let donators: SignerWithAddress[];

  before(async () => {
    [owner, ...donators] = await ethers.getSigners();
    CrownFunding = await ethers.getContractFactory("CrownFunding");
    crownFunding = await CrownFunding.connect(owner).deploy();
    await crownFunding.deployed();
  });

  describe("Stage testing", () => {
    it("Should create a campign", async () => {
      const campignDetails = "testCompign";
      const targetFundInEther = "10";
      // will expire after 15 mins
      const deadlineInSeconds = 900;
      const deadline = Number(await crownFunding.getCurrentBlockTime());

      // console.log(deadline);
      // console.log(Number(deadline) + deadlineInSeconds);

      const tx = await crownFunding
        .connect(owner)
        .createCampign(
          ethers.utils.parseEther(targetFundInEther),
          deadline + deadlineInSeconds,
          campignDetails
        );
      await tx.wait(1);

      const campigns = await crownFunding.connect(owner).getCompaigns(0);
      expect(campigns.creator).equal(owner.address);
      expect(campigns.campignDetails).equal(campignDetails);
      expect(campigns.deadline).equal(deadline + deadlineInSeconds);
      expect(campigns.targetFund).equal(
        ethers.utils.parseEther(targetFundInEther)
      );
    });
    it("Should be able to donate to a campign while it's still going", async () => {
      const donateAmountInEther = "5";
      const campignId = 0;

      await expect(() =>
        crownFunding.connect(donators[0]).donate(campignId, {
          value: ethers.utils.parseEther(donateAmountInEther),
        })
      ).changeEtherBalance(
        crownFunding.address,
        ethers.utils.parseEther(donateAmountInEther)
      );
    });
    it("Should revert if invalid campign id is used", async () => {
      const donateAmountInEther = "5";
      const campignId = 3;

      const tx = crownFunding.connect(donators[0]).donate(campignId, {
        value: ethers.utils.parseEther(donateAmountInEther),
      });

      await expect(tx).reverted;
    });
    it("Should be able to let the creator withdraw the collected fund", async () => {
      const campignId = 0;
      const campigns = await crownFunding.getCompaigns(campignId);

      time.increase(3600);
      await expect(() =>
        crownFunding.connect(owner).withdrawDonation(campignId)
      ).changeEtherBalance(owner, ethers.utils.parseEther("2"));
    });
    // it("Should", async () => {});
  });
});
