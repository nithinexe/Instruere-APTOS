// wallet.ts
import { AptosClient } from "aptos";

export const connectToPetra = async () => {
  try {
    if ("aptos" in window) {
      const wallet = (window as any).aptos;
      const response = await wallet.connect();
      console.log("Connected to Petra: ", response);
      return response;
    } else {
      throw new Error("Petra wallet not found. Please install it.");
    }
  } catch (error) {
    console.error("Failed to connect to Petra wallet: ", error);
    throw error;
  }
};

export const disconnectFromPetra = async () => {
  try {
    if ("aptos" in window) {
      const wallet = (window as any).aptos;
      const response = await wallet.disconnect();
      console.log("Disconnected from Petra: ", response);
    }
  } catch (error) {
    console.error("Failed to disconnect from Petra wallet: ", error);
  }
};

export const getAccount = async () => {
  try {
    if ("aptos" in window) {
      const wallet = (window as any).aptos;
      const account = await wallet.account();
      return account;
    }
  } catch (error) {
    console.error("Failed to fetch Petra wallet account: ", error);
    throw error;
  }
};

// Optional: Initialize AptosClient to interact with the blockchain
export const client = new AptosClient("https://fullnode.devnet.aptoslabs.com");
