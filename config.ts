// Environment configuration
export const config = {
  chainId: parseInt(import.meta.env.VITE_CHAIN_ID || '11155111'), // Sepolia testnet
  rpcUrl: import.meta.env.VITE_RPC_URL || 'https://sepolia.infura.io/v3/YOUR_INFURA_KEY',
  walletConnectProjectId: import.meta.env.VITE_WALLET_CONNECT_PROJECT_ID || 'YOUR_PROJECT_ID',
  infuraApiKey: import.meta.env.VITE_INFURA_API_KEY || 'YOUR_INFURA_KEY',
  fhevmNetwork: import.meta.env.VITE_FHEVM_NETWORK || 'sepolia',
  contractAddress: import.meta.env.VITE_CONTRACT_ADDRESS || '0x0000000000000000000000000000000000000000', // Will be updated after deployment
} as const;
