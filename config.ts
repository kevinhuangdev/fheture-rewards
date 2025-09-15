// Environment configuration
export const config = {
  chainId: 11155111, // Sepolia testnet
  rpcUrl: 'https://sepolia.infura.io/v3/b18fb7e6ca7045ac83c41157ab93f990',
  walletConnectProjectId: '2ec9743d0d0cd7fb94dee1a7e6d33475',
  infuraApiKey: 'b18fb7e6ca7045ac83c41157ab93f990',
  fhevmNetwork: 'sepolia',
  contractAddress: '0x0000000000000000000000000000000000000000', // Will be updated after deployment
} as const;
