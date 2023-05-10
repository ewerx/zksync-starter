import abi from "./greeter.json";
import supportedTokens from "./tokens.json";

export type NetworkInfo = {
  chainId: number;
  rpcUrl: string;
};

export const zkSyncTestnet: NetworkInfo = {
  chainId: 280,
  rpcUrl: "https://testnet.era.zksync.dev",
};

export const zkSyncMainnet: NetworkInfo = {
  chainId: 324,
  rpcUrl: "https://mainnet.era.zksync.io",
};

// replace this with your deployment address
export const greeterContractAddress = "0xcA265A121192796216BcC6A991BccF523c72b55e"; // testnet

export const ETH_L1_ADDRESS = "0x0000000000000000000000000000000000000000";

export { abi as greeterAbi, supportedTokens };
