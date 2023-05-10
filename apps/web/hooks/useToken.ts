import { useEffect, useState } from "react";
import { Provider } from "zksync-web3";
import { L1Token, Token } from "../lib/types";
import { ETH_L1_ADDRESS } from "../lib/constants";

// Fetch the L2 token info from the L1 token address
export function useToken(
  provider: Provider | undefined,
  address: string,
  supportedTokens: L1Token[]
): Token | undefined {
  const [selectedToken, setSelectedToken] = useState<Token | undefined>();

  useEffect(() => {
    if (!provider || !address) {
      return;
    }
    const l1Token =
      address === ETH_L1_ADDRESS
        ? supportedTokens[0]
        : supportedTokens.filter((t: any) => t.address === address)[0];

    const l2TokenAddress = async (address: string) => {
      return provider.l2TokenAddress(address);
    };

    l2TokenAddress(l1Token.address)
      .then((l2Address) => {
        setSelectedToken({
          l1Address: l1Token.address,
          l2Address: l2Address,
          decimals: l1Token.decimals,
          symbol: l1Token.symbol,
        }); // triggers updateFee and updateBalance
      })
      .catch((e) => console.log(e));
  }, [provider, address, supportedTokens]);

  return selectedToken;
}
