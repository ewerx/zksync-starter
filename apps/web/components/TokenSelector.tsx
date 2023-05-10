import { useState } from "react";
import { L1Token } from "../lib/types";
import { ETH_L1_ADDRESS } from "../lib/constants";

type TokenSelectorProps = {
  supportedTokens: L1Token[];
  handleSelectionChange: (address: string) => void;
};

const TokenSelector = ({
  supportedTokens,
  handleSelectionChange,
}: TokenSelectorProps) => {
  const [selectedTokenAddress, setSelectedTokenAddress] =
    useState<string>(ETH_L1_ADDRESS);

  return (
    <div className="flex flex-col items-center justify-center">
      <div>
        Select token for fee:
        <select
          value={selectedTokenAddress}
          onChange={(e) => {
            setSelectedTokenAddress(e.target.value);
            handleSelectionChange(e.target.value);
          }}
          className="bg-white border border-gray-200 text-gray-700 py-3 px-4 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
        >
          <option value="" disabled>
            Select a token
          </option>
          {supportedTokens.map((token) => (
            <option key={token.address} value={token.address}>
              {token.symbol}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default TokenSelector;
