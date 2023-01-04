export const address = "0xF4fE4132D564C9520Dbc4e9D043CA395a840bCC1" as const;
export const abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "campignId",
        type: "uint256",
      },
    ],
    name: "Claimed",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "campignId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "creator",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "targetAmount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "deadline",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "string",
        name: "campignDetails",
        type: "string",
      },
    ],
    name: "Created",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "campignId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "donator",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "Donated",
    type: "event",
  },
  {
    inputs: [],
    name: "campignId",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    name: "campigns",
    outputs: [
      { internalType: "string", name: "campignDetails", type: "string" },
      { internalType: "address", name: "creator", type: "address" },
      { internalType: "uint256", name: "targetFund", type: "uint256" },
      { internalType: "uint256", name: "amountCollected", type: "uint256" },
      { internalType: "uint256", name: "deadline", type: "uint256" },
      { internalType: "bool", name: "isFundClaimed", type: "bool" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "_targetFund", type: "uint256" },
      { internalType: "uint256", name: "_deadline", type: "uint256" },
      { internalType: "string", name: "_campignDetails", type: "string" },
    ],
    name: "createCampign",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "_campignId", type: "uint256" }],
    name: "donate",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "", type: "uint256" },
      { internalType: "address", name: "", type: "address" },
    ],
    name: "donatedAmount",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "_compaignId", type: "uint256" }],
    name: "getCompaigns",
    outputs: [
      {
        components: [
          { internalType: "string", name: "campignDetails", type: "string" },
          { internalType: "address", name: "creator", type: "address" },
          { internalType: "uint256", name: "targetFund", type: "uint256" },
          { internalType: "uint256", name: "amountCollected", type: "uint256" },
          { internalType: "uint256", name: "deadline", type: "uint256" },
          { internalType: "bool", name: "isFundClaimed", type: "bool" },
        ],
        internalType: "struct CrownFunding.Campign",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getCurrentBlockTime",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "_campignId", type: "uint256" },
      { internalType: "address", name: "_donator", type: "address" },
    ],
    name: "getDonatedAmount",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "_campignId", type: "uint256" }],
    name: "withdrawDonation",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;
