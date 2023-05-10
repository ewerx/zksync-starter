import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { Signer } from "zksync-web3";
import { Token } from "../lib/types";
import { ETH_L1_ADDRESS } from "../lib/constants";

type BalanceResult = {
  isLoading: boolean;
  error?: Error;
  balance?: string;
};

export function useBalance(signer: Signer | undefined, token: Token | undefined): BalanceResult {
  const [balanceResult, setBalanceResult] = useState<BalanceResult>({
    isLoading: true,
  });

  useEffect(() => {
    if (!signer || !token) {
      return;
    }
    (async () => {
      try {
        const balanceInUnits =
          token.l1Address === ETH_L1_ADDRESS
            ? await signer.getBalance()
            : await signer.getBalance(token.l2Address);
        const balance = ethers.utils.formatUnits(balanceInUnits, token.decimals);
        setBalanceResult({ isLoading: false, balance });
      } catch (e) {
        console.log(e);
        setBalanceResult({ isLoading: false, error: e });
      }
    })();
  }, [signer, token]);

  return balanceResult;
}
