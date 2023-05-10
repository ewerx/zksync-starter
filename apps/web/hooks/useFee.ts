import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { Contract, Provider } from "zksync-web3";
import { Token } from "../lib/types";

type FeeResult = {
  isLoading: boolean;
  error?: Error;
  fee?: string;
};

export function useFee(
  provider: Provider | undefined,
  contract: Contract | undefined,
  feeToken: Token | undefined,
  newGreeting: string
): FeeResult {
  const [feeResult, setFeeResult] = useState<FeeResult>({
    isLoading: true,
  });

  useEffect(() => {
    if (!contract || !provider || !newGreeting || !feeToken) {
      return;
    }
    // Fetch fee estimate for interacting with the contract
    (async () => {
      try {
        const feeInGas = await contract.estimateGas.setGreeting(newGreeting);
        const gasPriceInUnits = await provider.getGasPrice();
        const fee = ethers.utils.formatUnits(feeInGas.mul(gasPriceInUnits), feeToken.decimals);
        setFeeResult({ isLoading: false, fee });
      } catch (e) {
        console.log(e);
        setFeeResult({ isLoading: false, error: e });
      }
    })();
  }, [contract, provider, newGreeting, feeToken]);

  return feeResult;
}
