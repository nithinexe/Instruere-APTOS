import { InputTransactionData, useWallet } from '@aptos-labs/wallet-adapter-react';
import { Aptos, AptosConfig, Network } from '@aptos-labs/ts-sdk';

const aptosConfig = new AptosConfig({ network: Network.DEVNET });
const aptosClient = new Aptos(aptosConfig);

const CONTRACT_ADDRESS = "0xe340bbf6b70d2fd8acb4523c8ff4b5365c99827f5518388e72727a44180f6a46";

export interface EnhancedBlock {
  data: string;
  timestamp: number;
  miner: string;
}

export function useInstruereContract() {
  const { account, signAndSubmitTransaction } = useWallet();

  const addEnhancedBlock = async (minerAddress: string, timestamp: number) => {
    if (!account) throw new Error("Wallet not connected");

    const payload: InputTransactionData = {
      data: {
        function: `${CONTRACT_ADDRESS}::InstruereContract::add_enhanced_block`,
        typeArguments: [],
        functionArguments: [minerAddress, timestamp.toString()]
      }
    };

    try {
      const response = await signAndSubmitTransaction(payload);
      await aptosClient.waitForTransaction({ transactionHash: response.hash });
      return response.hash;
    } catch (error) {
      console.error("Error adding enhanced block:", error);
      throw error;
    }
  };

  const getEnhancedBlockDetails = async (address: string, index: number): Promise<EnhancedBlock | null> => {
    try {
      const result = await aptosClient.view({
        payload: {
          function: `${CONTRACT_ADDRESS}::InstruereContract::get_enhanced_block_details`,
          typeArguments: [],
          functionArguments: [address, index.toString()]
        }
      });

      if (Array.isArray(result) && result.length === 3) {
        return {
          data: result[0] as string,
          timestamp: Number(result[1]),
          miner: result[2] as string,
        };
      }
      console.error("Unexpected result format:", result);
      return null;
    } catch (error) {
      console.error("Error getting enhanced block details:", error);
      throw error;
    }
  };

  const getMinerTokenBalance = async (address: string): Promise<number> => {
    try {
      const result = await aptosClient.view({
        payload: {
          function: `${CONTRACT_ADDRESS}::InstruereContract::get_miner_token_balance_by_address`,
          typeArguments: [],
          functionArguments: [address]
        }
      });
      if (Array.isArray(result) && result.length > 0) {
        return Number(result[0]);
      }
      throw new Error("Unexpected result format");
    } catch (error) {
      console.error("Error getting miner token balance:", error);
      throw error;
    }
  };

  const getEnhancedBlockCount = async (address: string): Promise<number> => {
    try {
      const result = await aptosClient.view({
        payload: {
          function: `${CONTRACT_ADDRESS}::InstruereContract::get_enhanced_block_count`,
          typeArguments: [],
          functionArguments: [address]
        }
      });
      if (Array.isArray(result) && result.length > 0) {
        return Number(result[0]);
      }
      throw new Error("Unexpected result format");
    } catch (error) {
      console.error("Error getting enhanced block count:", error);
      throw error;
    }
  };

  return {
    addEnhancedBlock,
    getEnhancedBlockDetails,
    getMinerTokenBalance,
    getEnhancedBlockCount,
  };
}
