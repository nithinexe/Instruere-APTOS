'use client';
import React, { useState, useEffect } from 'react';
import { useWallet } from '@aptos-labs/wallet-adapter-react';
import { useInstruereContract } from '../utils/UseInstruereContract';

// Block interface definition
interface Block {
  data: string; 
  timestamp: number;
  miner: string;
}

export default function TokenInteractionWithVideo() {
  const { account } = useWallet();
  const { addEnhancedBlock, getEnhancedBlockDetails, getMinerTokenBalance, getEnhancedBlockCount } = useInstruereContract();

  const [showVideo, setShowVideo] = useState(true);
  const [loadingImage, setLoadingImage] = useState(false);
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [balance, setBalance] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [visibleBlocksCount, setVisibleBlocksCount] = useState(0);
  const [miningStatus, setMiningStatus] = useState<string | null>(null);
  const [ipfsHash, setIpfsHash] = useState<string | null>(null);
  const [transactionSuccessful, setTransactionSuccessful] = useState(false);

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
          if (block) {
            const formattedBlock: Block = {
              data: block.data ?? 'No Data', 
              timestamp: block.timestamp ?? Date.now(), 
              miner: block.miner ?? 'Unknown Miner',  
            };
            newBlocks.push(formattedBlock);
          }
        }
        newBlocks.sort((a, b) => a.timestamp - b.timestamp);
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

  const handleToggleVideoImage = async () => {
    setLoadingImage(true);
    setTimeout(() => {
      setShowVideo(false);
      setLoadingImage(false);
    }, 2000);
    if (account) {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch('/api/mine');
        const result = await response.json();

        if (response.ok && result.ipfsHash) {
          setMiningStatus('');
          setIpfsHash(result.ipfsHash);
          await addEnhancedBlock(account.address, Date.now());
          setTransactionSuccessful(true);
          await fetchData();
        } else {
          setError(result.error || 'Failed to mine. Please try again.');
          setMiningStatus(null);
          setTransactionSuccessful(false);
        }
      } catch (err) {
        setError('Failed to mine. Please try again.');
        console.error(err);
        setTransactionSuccessful(false);
      } finally {
        setLoading(false);
      }
    }
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
              {/* {miningStatus && <p className="mt-4">{miningStatus}</p>} */}

              <h2 className="mt-6 text-4xl">Activity:</h2>
              {loading ? (
                <p>Loading...</p>
              ) : transactionSuccessful && blocks.length > 0 ? (
                <ul className="list-disc">
                  {blocks.slice(0, visibleBlocksCount).map((block, index) => (
                    <li key={index} className="mt-2 text-lg">
                      Block: {index + 1}, 
                      Timestamp: {typeof block.timestamp === 'number' ? new Date(block.timestamp).toLocaleString() : 'No Timestamp'}, 
                      Miner: {typeof block.miner === 'string' ? block.miner : 'No Miner'}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>Loading...</p>
              )}
            </div>
          )}
        </div>
      )}

      {showVideo && (
        <button
          onClick={handleToggleVideoImage}
          className="absolute top-72 left-3/4 transform -translate-x-1/2 bg-gradient-to-r from-[#18c7ff] to-[#933ffd] hover:from-[#18c7ff] hover:to-[#933ffd] text-white py-4 px-16 rounded-lg text-2xl"
          disabled={loadingImage}
        >
          Mining
        </button>
      )}
    </div>
  );
}
