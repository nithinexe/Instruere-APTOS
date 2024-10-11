// utils/formatAddress.ts
export const formatAddress = (address: string) => {
  if (address.length > 7) {
    return `${address.slice(0, 4)}...${address.slice(-3)}`;
  }
  return address;
};
