export type FetcherArg = [
  input: RequestInfo | URL,
  init?: RequestInit | undefined
];

export interface User {
  id: string;
  domain: string;
  chainId: number;
  address: string;
  uri: string;
  version: string;
  nonce: string;
  profileId: string;
}
