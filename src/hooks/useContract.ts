import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { config } from '../../config';

// Contract ABI - This would be generated from the compiled contract
const CONTRACT_ABI = [
  {
    "inputs": [
      {"internalType": "string", "name": "_name", "type": "string"},
      {"internalType": "string", "name": "_description", "type": "string"},
      {"internalType": "uint256", "name": "_expiresAt", "type": "uint256"}
    ],
    "name": "createLoyaltyProgram",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {"internalType": "uint256", "name": "programId", "type": "uint256"},
      {"internalType": "bytes", "name": "points", "type": "bytes"},
      {"internalType": "bytes", "name": "inputProof", "type": "bytes"}
    ],
    "name": "earnRewards",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {"internalType": "uint256", "name": "programId", "type": "uint256"},
      {"internalType": "bytes", "name": "points", "type": "bytes"},
      {"internalType": "bytes", "name": "inputProof", "type": "bytes"}
    ],
    "name": "redeemRewards",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "uint256", "name": "programId", "type": "uint256"}],
    "name": "getProgramInfo",
    "outputs": [
      {"internalType": "string", "name": "name", "type": "string"},
      {"internalType": "string", "name": "description", "type": "string"},
      {"internalType": "uint8", "name": "totalRewards", "type": "uint8"},
      {"internalType": "uint8", "name": "activeUsers", "type": "uint8"},
      {"internalType": "uint8", "name": "totalTransactions", "type": "uint8"},
      {"internalType": "bool", "name": "isActive", "type": "bool"},
      {"internalType": "bool", "name": "isVerified", "type": "bool"},
      {"internalType": "address", "name": "owner", "type": "address"},
      {"internalType": "uint256", "name": "createdAt", "type": "uint256"},
      {"internalType": "uint256", "name": "expiresAt", "type": "uint256"}
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {"internalType": "uint256", "name": "programId", "type": "uint256"},
      {"internalType": "address", "name": "user", "type": "address"}
    ],
    "name": "getUserRewardInfo",
    "outputs": [
      {"internalType": "uint8", "name": "points", "type": "uint8"},
      {"internalType": "uint8", "name": "tier", "type": "uint8"},
      {"internalType": "uint8", "name": "totalEarned", "type": "uint8"},
      {"internalType": "uint8", "name": "totalRedeemed", "type": "uint8"},
      {"internalType": "bool", "name": "isActive", "type": "bool"},
      {"internalType": "uint256", "name": "lastUpdated", "type": "uint256"}
    ],
    "stateMutability": "view",
    "type": "function"
  }
] as const;

export const useFhetureRewards = () => {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();

  const createLoyaltyProgram = async (
    name: string,
    description: string,
    expiresAt: number
  ) => {
    try {
      const hash = await writeContract({
        address: config.contractAddress as `0x${string}`,
        abi: CONTRACT_ABI,
        functionName: 'createLoyaltyProgram',
        args: [name, description, BigInt(expiresAt)],
      });
      return hash;
    } catch (error) {
      console.error('Error creating loyalty program:', error);
      throw error;
    }
  };

  const earnRewards = async (programId: number, points: number) => {
    try {
      // For now, we'll use a mock implementation
      // In a real FHE implementation, you would encrypt the points here
      const mockEncryptedPoints = new Uint8Array(32); // Mock encrypted data
      const mockInputProof = new Uint8Array(64); // Mock proof

      const hash = await writeContract({
        address: config.contractAddress as `0x${string}`,
        abi: CONTRACT_ABI,
        functionName: 'earnRewards',
        args: [BigInt(programId), mockEncryptedPoints, mockInputProof],
      });
      return hash;
    } catch (error) {
      console.error('Error earning rewards:', error);
      throw error;
    }
  };

  const redeemRewards = async (programId: number, points: number) => {
    try {
      // For now, we'll use a mock implementation
      // In a real FHE implementation, you would encrypt the points here
      const mockEncryptedPoints = new Uint8Array(32); // Mock encrypted data
      const mockInputProof = new Uint8Array(64); // Mock proof

      const hash = await writeContract({
        address: config.contractAddress as `0x${string}`,
        abi: CONTRACT_ABI,
        functionName: 'redeemRewards',
        args: [BigInt(programId), mockEncryptedPoints, mockInputProof],
      });
      return hash;
    } catch (error) {
      console.error('Error redeeming rewards:', error);
      throw error;
    }
  };

  return {
    createLoyaltyProgram,
    earnRewards,
    redeemRewards,
  };
};

export const useProgramInfo = (programId: number) => {
  const { data, isLoading, error } = useReadContract({
    address: config.contractAddress as `0x${string}`,
    abi: CONTRACT_ABI,
    functionName: 'getProgramInfo',
    args: [BigInt(programId)],
  });

  return {
    programInfo: data,
    isLoading,
    error,
  };
};

export const useUserRewardInfo = (programId: number, userAddress?: string) => {
  const { address } = useAccount();
  const targetAddress = userAddress || address;

  const { data, isLoading, error } = useReadContract({
    address: config.contractAddress as `0x${string}`,
    abi: CONTRACT_ABI,
    functionName: 'getUserRewardInfo',
    args: [BigInt(programId), targetAddress as `0x${string}`],
    query: {
      enabled: !!targetAddress,
    },
  });

  return {
    userRewardInfo: data,
    isLoading,
    error,
  };
};
