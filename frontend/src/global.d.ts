// This will add the aptos property to the Window interface
interface Window {
  aptos?: {
    connect: () => Promise<{ address: string }>;
    signAndSubmitTransaction: (transaction: any) => Promise<{ hash: string }>;
    waitForTransaction: (hash: string) => Promise<any>;
  };
}
