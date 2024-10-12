import { Aptos, AptosConfig, Network } from '@aptos-labs/ts-sdk';

const aptosConfig = new AptosConfig({ network: Network.DEVNET });
 export const aptosClient = new Aptos(aptosConfig);

export const CONTRACT_ADDRESS = "0xe340bbf6b70d2fd8acb4523c8ff4b5365c99827f5518388e72727a44180f6a46";