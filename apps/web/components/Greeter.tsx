import { useAccount } from "wagmi";
import { use, useEffect, useState } from "react";
import { useGreeter } from "../hooks/useGreeter";
import { useWeb3 } from "../hooks/useWeb3";
import { TxStatus } from "../lib/types";
import { supportedTokens } from "../lib/constants";
import { useFee } from "../hooks/useFee";
import { useToken } from "../hooks/useToken";
import TokenSelector from "./TokenSelector";
import { useBalance } from "../hooks/useBalance";

const Greeter = () => {
  const [newGreeting, setNewGreeting] = useState<string>("");
  const [selectedTokenAddress, setSelectedTokenAddress] = useState<string>(supportedTokens[0].address);
  const { isConnected } = useAccount();
  const { provider, signer, error: connectionError } = useWeb3();
  const { contract, greeting, changeGreeting, txStatus } = useGreeter(provider, signer);
  const selectedToken = useToken(provider, selectedTokenAddress, supportedTokens);
  const balance = useBalance(signer, selectedToken);
  const fee = useFee(provider, contract, selectedToken, newGreeting);

  const handleGreetingChange = async () => {
    if (!selectedToken) {
      return;
    }
    changeGreeting(newGreeting, selectedToken);
  };

  const submitDisabled = !selectedToken || !newGreeting || txStatus !== TxStatus.None;

  const buttonText = () => {
    switch (txStatus) {
      case TxStatus.Preparing:
      case TxStatus.Pending:
        return "Sending...";
      case TxStatus.Committed:
        return "Committed";
      case TxStatus.Error:
        return "Error";
      default:
        return "Send";
    }
  };

  useEffect(() => {
    if (txStatus === TxStatus.Committed) {
      setNewGreeting("");
    }
  }, [txStatus]);

  return (
    <div className="flex flex-col items-center justify-center">
      {connectionError && <h1 className="text-2xl font-bold">{connectionError.message}</h1>}
      {!isConnected && <h1 className="text-2xl font-bold">Connect to continue</h1>}
      {isConnected && (
        <>
          <h1 className="text-2xl font-bold">{greeting}</h1>
          <div className="w-full max-w-xs p-8 space-y-6">
            <input
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="new-greeting"
              type="text"
              placeholder="Enter new greeting"
              onChange={(e) => setNewGreeting(e.target.value)}
            />
            <TokenSelector
              supportedTokens={supportedTokens}
              handleSelectionChange={setSelectedTokenAddress}
            />
            <p>
              Balance: {balance.isLoading ? "⏳" : balance.error ? balance.error?.message : balance.balance}
            </p>
            <p>
              Fee: {fee.isLoading && newGreeting.length > 0 ? "⏳" : fee.error ? fee.error.message : fee.fee}
            </p>
          </div>

          <div className="flex items-center justify-between">
            <button
              className={`px-4 py-2 bg-gray-900 text-white rounded focus:outline-none focus:shadow-outline ${
                submitDisabled ? "opacity-50 cursor-default" : "hover:bg-gray-700"
              }`}
              disabled={submitDisabled}
              onClick={handleGreetingChange}
            >
              {buttonText()}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Greeter;
