import { useState, useEffect } from "react";
import {
  ETH_L1_ADDRESS,
  greeterAbi,
  greeterContractAddress,
} from "../lib/constants";
import { Contract, Provider, Signer, utils } from "zksync-web3";
import { ethers } from "ethers";
import { Token, TxStatus } from "../lib/types";

export function useGreeter(
  provider: Provider | undefined,
  signer: Signer | undefined
) {
  const [contract, setContract] = useState<Contract | undefined>(undefined);
  const [greeting, setGreeting] = useState("");
  const [txStatus, setTxStatus] = useState<TxStatus>(TxStatus.None);

  const fetchGreeting = async () => {
    if (contract) {
      contract
        .greet()
        .then((greeting) => {
          setGreeting(greeting);
        })
        .catch((e) => {
          console.error("Error calling greet() on contract", e);
        });
    }
  };

  // Get the transaction paramters needed to pay fees via the selected token
  // This uses the testnet paymaster (https://era.zksync.io/docs/dev/developer-guides/aa.html#paymasters)
  const getOverrides = async (newGreeting: string, feeToken: Token) => {
    if (!provider || !contract) {
      return {};
    }
    if (feeToken && feeToken.l1Address !== ETH_L1_ADDRESS) {
      const testnetPaymaster = await provider.getTestnetPaymasterAddress();
      if (!testnetPaymaster) {
        return {};
      }

      const gasPrice = await provider.getGasPrice();

      // get params for gas estimation
      const paramsForFeeEstimation = utils.getPaymasterParams(
        testnetPaymaster,
        {
          type: "ApprovalBased",
          minimalAllowance: ethers.BigNumber.from("1"),
          token: feeToken.l2Address,
          innerInput: new Uint8Array(),
        }
      );

      const gasLimit = await contract.estimateGas.setGreeting(newGreeting, {
        customData: {
          gasPerPubdata: utils.DEFAULT_GAS_PER_PUBDATA_LIMIT,
          paymasterParams: paramsForFeeEstimation,
        },
      });

      const fee = gasPrice.mul(gasLimit.toString());

      // get params for submitting tx
      const paymasterParams = utils.getPaymasterParams(testnetPaymaster, {
        type: "ApprovalBased",
        token: feeToken.l2Address,
        minimalAllowance: fee,
        // empty bytes as testnet paymaster does not use innerInput
        innerInput: new Uint8Array(),
      });

      return {
        maxFeePerGas: gasPrice,
        maxPriorityFeePerGas: ethers.BigNumber.from(0),
        gasLimit,
        customData: {
          gasPerPubdata: utils.DEFAULT_GAS_PER_PUBDATA_LIMIT,
          paymasterParams,
        },
      };
    }

    return {};
  };

  const changeGreeting = async (newGreeting: string, feeToken: Token) => {
    if (contract) {
      setTxStatus(TxStatus.Preparing);

      try {
        const txHandle = await contract.setGreeting(
          newGreeting,
          await getOverrides(newGreeting, feeToken)
        );
        setTxStatus(TxStatus.Pending);

        await txHandle.wait();
        setTxStatus(TxStatus.Committed);

        setGreeting(await contract.greet());
      } catch (e) {
        setTxStatus(TxStatus.Error);
        console.log(e);
      } finally {
        setTxStatus(TxStatus.None);
      }
    }
  };

  useEffect(() => {
    if (signer) {
      setContract(new Contract(greeterContractAddress, greeterAbi, signer));
    }
  }, [signer, provider]);

  useEffect(() => {
    if (contract) {
      fetchGreeting();
    }
  }, [contract]);

  return { contract, greeting, changeGreeting, txStatus };
}
