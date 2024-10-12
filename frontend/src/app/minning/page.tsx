'use client';
import React, { useState, useEffect } from 'react';
import { useWallet } from '@aptos-labs/wallet-adapter-react';
import { useInstruereContract } from '../utils/UseInstruereContract';

interface Block {
  data: string;
  timestamp: number;
  miner: string;
}

export default function TokenInteractionWithVideo() {
  const { account } = useWallet();
  const { addEnhancedBlock, getEnhancedBlockDetails, getMinerTokenBalance, getEnhancedBlockCount } = useInstruereContract();
  
  const [showVideo, setShowVideo] = useState(true);
  const [loadingImage, setLoadingImage] = useState(false); // Loading state for image transition
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [balance, setBalance] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [visibleBlocksCount, setVisibleBlocksCount] = useState(0);
  const [miningStatus, setMiningStatus] = useState<string | null>(null); // Mining state
  const [ipfsHash, setIpfsHash] = useState<string | null>(null); // IPFS hash

  useEffect(() => {
    if (account) {
      fetchData();
    }
  }, [account]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (visibleBlocksCount < blocks.length) {
      interval = setTimeout(() => {
        setVisibleBlocksCount((prev) => prev + 1);
      }, 3000);
    }
    return () => clearTimeout(interval);
  }, [visibleBlocksCount, blocks.length]);

  const fetchData = async () => {
    if (account) {
      setLoading(true);
      setError(null);
      try {
        const count = await getEnhancedBlockCount(account.address);
        if (typeof count !== 'number') {
          throw new Error('Invalid block count');
        }
        const newBlocks: Block[] = [];
        for (let i = 0; i < count; i++) {
          const block = await getEnhancedBlockDetails(account.address, i);
          if (block) newBlocks.push(block);
        }
        setBlocks(newBlocks);

        const bal = await getMinerTokenBalance(account.address);
        if (bal !== undefined) setBalance(bal);
        setVisibleBlocksCount(1);
      } catch (err) {
        setError("Failed to fetch data. Please try again.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleAddBlock = async () => {
    if (account) {
      setLoading(true);
      setError(null);
      try {
        // Call the API/mine endpoint
        const response = await fetch('/api/mine');
        const result = await response.json();

        if (response.ok && result.ipfsHash) {
          setMiningStatus('Mining completed successfully!');
          setIpfsHash(result.ipfsHash); // Store the IPFS hash
          await addEnhancedBlock(account.address, Date.now());
          await fetchData(); // Fetch the new data
        } else {
          setError(result.error || 'Failed to mine. Please try again.');
          setMiningStatus(null);
        }
      } catch (err) {
        setError('Failed to mine. Please try again.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleToggleVideoImage = () => {
    setLoadingImage(true); 
    setTimeout(() => {
      setShowVideo(false); 
      setLoadingImage(false); 
    }, 2000);
  };

  if (!account) return <div>Please connect your wallet</div>;

  return (
    <div className="relative h-screen w-screen">
      {showVideo ? (
        <div className="absolute inset-0">
          <video className="h-full w-full object-cover" autoPlay loop muted playsInline>
            <source src="/mining.mp4" type="video/mp4" />
          </video>
        </div>
      ) : (
        <div className="absolute inset-0">
          {loadingImage ? (
            <div className="h-full w-full flex items-center justify-center bg-black text-white">
              <p>Loading image...</p>
            </div>
          ) : (
            <img src="/txnpage2.png" alt="Mining Image" className="h-full w-full object-cover" />
          )}

          {!loadingImage && (
            <div className="p-4 bg-black bg-opacity-70 text-white absolute inset-0 flex flex-col items-center justify-center">
              <h1>Instruere Network</h1>
              {error && <p style={{ color: 'red' }}>{error}</p>}
              <p>Miner Token Balance: {balance !== null ? balance : 'Loading...'}</p>

              {miningStatus && <p className="mt-4">{miningStatus}</p>}

              {ipfsHash && (
                <div className="mt-6">
                  <p>IPFS Hash: {ipfsHash}</p>
                  <a href={`https://gateway.pinata.cloud/ipfs/${ipfsHash}`} target="_blank" rel="noopener noreferrer" className="text-blue-400">
                    View on IPFS
                  </a>
                </div>
              )}

              <h2 className="mt-6">Activity:</h2>
              {loading ? (
                <p>Loading...</p>
              ) : blocks && blocks.length > 0 ? (
                <ul className="list-disc">
                  {blocks.slice(0, visibleBlocksCount).map((block, index) => (
                    <li key={index} className="mt-2">
                      Data: {block.data}, Timestamp: {new Date(block.timestamp).toLocaleString()}, Miner: {block.miner}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No blocks found.</p>
              )}
            </div>
          )}
        </div>
      )}

      {showVideo && (
        <button
          onClick={handleToggleVideoImage}
          className="absolute top-72 left-3/4 transform -translate-x-1/2 bg-blue-600 text-white py-4 px-16 rounded-lg text-2xl"
          disabled={loadingImage}
        >
          Mining
        </button>
      )}
    </div>
  );
}
