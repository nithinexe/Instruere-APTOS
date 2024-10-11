// pages/index.tsx
"use client";
import { useState } from "react";
import { connectToPetra, disconnectFromPetra, getAccount } from "../utils/Wallet";
import { formatAddress } from "../utils/formatAddress";

const Home = () => {
  const [account, setAccount] = useState<string | null>(null);

  const handleConnect = async () => {
    try {
      await connectToPetra();
      const account = await getAccount();
      setAccount(account.address);
    } catch (error) {
      console.error("Error connecting to Petra wallet:", error);
    }
  };

  const handleDisconnect = async () => {
    await disconnectFromPetra();
    setAccount(null);
  };

  return (
    <div className="container">
      {account ? (
        <div>
          <p className="absolute right-10 top-4 bg-gradient-to-r from-blue-500 to-teal-400 p-2 border hover:from-blue-700 hover:to-teal-600 duration-500 rounded-md">
            {formatAddress(account)}
          </p>
        </div>
      ) : (
        <button
          onClick={handleConnect}
          className="absolute right-10 top-4 bg-gradient-to-r from-blue-500 to-teal-400 p-2 border hover:from-blue-700 hover:to-teal-600 duration-500 rounded-md"
        >
          Connect 
        </button>
      )}
    </div>
  );
};

export default Home;
