import { useState, useEffect } from "react";
import { Provider, Signer, Web3Provider } from "zksync-web3";
import { useProvider, useSigner } from "wagmi";
import { zkSyncMainnet, zkSyncTestnet } from "../lib/constants";

type Web3State = {
  isLoading: boolean;
  error?: Error;
  signer?: Signer;
  provider?: Provider;
};

const zkSyncRpc = (chainId: number) => {
  if (chainId === zkSyncTestnet.chainId) {
    return zkSyncTestnet.rpcUrl;
  } else if (chainId === zkSyncMainnet.chainId) {
    return zkSyncMainnet.rpcUrl;
  } else {
    return undefined;
  }
};

export function useWeb3(): Web3State {
  const { isLoading, data: signer, error: signerError } = useSigner<Signer>();
  const wagmiProvider = useProvider();
  const [web3State, setWeb3State] = useState<Web3State>({
    isLoading: true,
  });

  useEffect(() => {
    if (wagmiProvider) {
      const rpcUrl = zkSyncRpc(wagmiProvider.network.chainId);
      if (rpcUrl) {
        const provider = new Provider(rpcUrl);
        if (!isLoading && signer && provider) {
          setWeb3State({
            isLoading: false,
            signer,
            provider,
          });
        } else if (!isLoading && signerError) {
          setWeb3State({
            isLoading: false,
            error: signerError,
          });
        }
      } else {
        setWeb3State({
          isLoading: false,
          error: new Error("Unsupported network"),
        });
      }
    }
  }, [isLoading, signer, wagmiProvider, signerError]);

  return web3State;
}
