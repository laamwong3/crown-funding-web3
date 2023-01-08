export interface CampaignTypes {
  campignDetails: string;
  creator: `0x${string}`;
  targetFund: BigNumber;
  amountCollected: BigNumber;
  deadline: BigNumber;
  isFundClaimed: boolean;
}

export interface CampaignCardProps {
  details: CampaignTypes;
}
