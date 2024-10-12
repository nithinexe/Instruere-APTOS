'use client'
import React, { useState, useEffect } from 'react';
import { useWallet } from '@aptos-labs/wallet-adapter-react';
import { useInstruereContract } from '../utils/UseInstruereContract';

interface Block {
  data: string;
  timestamp: number;
  miner: string;
}

export default function TokenInteraction() {
  const { account } = useWallet();
  const { addEnhancedBlock, getEnhancedBlockDetails, getMinerTokenBalance, getEnhancedBlockCount } = useInstruereContract();
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [balance, setBalance] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (account) {
      fetchData();
    }
  }, [account]);

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
        await addEnhancedBlock(account.address, Date.now());
        await fetchData();
      } catch (err) {
        setError("Failed to add block. Please try again.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
  };

  if (!account) return <div>Please connect your wallet</div>;

  return (
    <div>
      <h1>Instruere Network</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <p>Miner Token Balance: {balance !== null ? balance : 'Loading...'}</p>
      <button onClick={handleAddBlock} disabled={loading}>
        {loading ? 'Processing...' : 'Add Enhanced Block'}
      </button>
      <h2>Enhanced Blocks:</h2>
      {loading ? (
        <p>Loading...</p>
      ) : blocks && blocks.length > 0 ? (
        <ul>
          {blocks.map((block, index) => (
            <li key={index}>
              Data: {block.data}, Timestamp: {new Date(block.timestamp).toLocaleString()}, Miner: {block.miner}
            </li>
          ))}
        </ul>
      ) : (
        <p>No blocks found.</p>
      )}
    </div>
  );
}