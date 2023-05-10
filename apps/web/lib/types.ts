import { Contract, Provider, Signer } from "zksync-web3";

export enum TxStatus {
  None,
  Preparing,
  Pending,
  Committed,
  Error,
}

export type L1Token = {
  address: string;
  name: string;
  symbol: string;
  decimals: number;
};

export type Token = {
  l1Address: string;
  l2Address: string;
  decimals: number;
  symbol: string;
};
