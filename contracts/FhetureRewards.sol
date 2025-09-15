// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import { SepoliaConfig } from "@fhevm/solidity/config/ZamaConfig.sol";
import { euint32, externalEuint32, euint8, ebool, FHE } from "@fhevm/solidity/lib/FHE.sol";

contract FhetureRewards is SepoliaConfig {
    using FHE for *;
    
    struct LoyaltyProgram {
        euint32 programId;
        euint32 totalRewards;
        euint32 activeUsers;
        euint32 totalTransactions;
        bool isActive;
        bool isVerified;
        string name;
        string description;
        address owner;
        uint256 createdAt;
        uint256 expiresAt;
    }
    
    struct UserReward {
        euint32 userId;
        euint32 programId;
        euint32 points;
        euint32 tier;
        euint32 totalEarned;
        euint32 totalRedeemed;
        bool isActive;
        address userAddress;
        uint256 lastUpdated;
    }
    
    struct Transaction {
        euint32 transactionId;
        euint32 programId;
        euint32 userId;
        euint32 pointsEarned;
        euint32 pointsRedeemed;
        euint32 newBalance;
        bool isEarn;
        address userAddress;
        uint256 timestamp;
    }
    
    struct RewardTier {
        euint32 tierId;
        euint32 minPoints;
        euint32 maxPoints;
        euint32 multiplier;
        string name;
        bool isActive;
    }
    
    mapping(uint256 => LoyaltyProgram) public loyaltyPrograms;
    mapping(address => mapping(uint256 => UserReward)) public userRewards;
    mapping(uint256 => Transaction) public transactions;
    mapping(uint256 => mapping(uint256 => RewardTier)) public rewardTiers;
    
    uint256 public programCounter;
    uint256 public transactionCounter;
    uint256 public tierCounter;
    
    address public owner;
    address public verifier;
    
    event ProgramCreated(uint256 indexed programId, address indexed owner, string name);
    event RewardEarned(uint256 indexed transactionId, uint256 indexed programId, address indexed user, uint32 points);
    event RewardRedeemed(uint256 indexed transactionId, uint256 indexed programId, address indexed user, uint32 points);
    event TierUpdated(uint256 indexed programId, uint256 indexed userId, uint32 newTier);
    event ProgramVerified(uint256 indexed programId, bool isVerified);
    
    constructor(address _verifier) {
        owner = msg.sender;
        verifier = _verifier;
    }
    
    function createLoyaltyProgram(
        string memory _name,
        string memory _description,
        uint256 _expiresAt
    ) public returns (uint256) {
        require(bytes(_name).length > 0, "Program name cannot be empty");
        require(_expiresAt > block.timestamp, "Expiration must be in the future");
        
        uint256 programId = programCounter++;
        
        loyaltyPrograms[programId] = LoyaltyProgram({
            programId: FHE.asEuint32(0), // Will be set properly later
            totalRewards: FHE.asEuint32(0),
            activeUsers: FHE.asEuint32(0),
            totalTransactions: FHE.asEuint32(0),
            isActive: true,
            isVerified: false,
            name: _name,
            description: _description,
            owner: msg.sender,
            createdAt: block.timestamp,
            expiresAt: _expiresAt
        });
        
        emit ProgramCreated(programId, msg.sender, _name);
        return programId;
    }
    
    function earnRewards(
        uint256 programId,
        externalEuint32 points,
        bytes calldata inputProof
    ) public returns (uint256) {
        require(loyaltyPrograms[programId].owner != address(0), "Program does not exist");
        require(loyaltyPrograms[programId].isActive, "Program is not active");
        require(block.timestamp <= loyaltyPrograms[programId].expiresAt, "Program has expired");
        
        uint256 transactionId = transactionCounter++;
        
        // Convert externalEuint32 to euint32 using FHE.fromExternal
        euint32 internalPoints = FHE.fromExternal(points, inputProof);
        
        // Get or create user reward record
        UserReward storage userReward = userRewards[msg.sender][programId];
        if (userReward.userAddress == address(0)) {
            // New user
            userReward = UserRewards[msg.sender][programId] = UserReward({
                userId: FHE.asEuint32(0), // Will be set properly later
                programId: FHE.asEuint32(0), // Will be set properly later
                points: internalPoints,
                tier: FHE.asEuint32(1), // Start at tier 1
                totalEarned: internalPoints,
                totalRedeemed: FHE.asEuint32(0),
                isActive: true,
                userAddress: msg.sender,
                lastUpdated: block.timestamp
            });
            
            // Update program active users count
            loyaltyPrograms[programId].activeUsers = FHE.add(loyaltyPrograms[programId].activeUsers, FHE.asEuint32(1));
        } else {
            // Existing user - add points
            userReward.points = FHE.add(userReward.points, internalPoints);
            userReward.totalEarned = FHE.add(userReward.totalEarned, internalPoints);
            userReward.lastUpdated = block.timestamp;
        }
        
        // Update program totals
        loyaltyPrograms[programId].totalRewards = FHE.add(loyaltyPrograms[programId].totalRewards, internalPoints);
        loyaltyPrograms[programId].totalTransactions = FHE.add(loyaltyPrograms[programId].totalTransactions, FHE.asEuint32(1));
        
        // Create transaction record
        transactions[transactionId] = Transaction({
            transactionId: FHE.asEuint32(0), // Will be set properly later
            programId: FHE.asEuint32(0), // Will be set properly later
            userId: FHE.asEuint32(0), // Will be set properly later
            pointsEarned: internalPoints,
            pointsRedeemed: FHE.asEuint32(0),
            newBalance: userReward.points,
            isEarn: true,
            userAddress: msg.sender,
            timestamp: block.timestamp
        });
        
        // Update user tier based on points
        _updateUserTier(programId, msg.sender);
        
        emit RewardEarned(transactionId, programId, msg.sender, 0); // Points will be decrypted off-chain
        return transactionId;
    }
    
    function redeemRewards(
        uint256 programId,
        externalEuint32 points,
        bytes calldata inputProof
    ) public returns (uint256) {
        require(loyaltyPrograms[programId].owner != address(0), "Program does not exist");
        require(loyaltyPrograms[programId].isActive, "Program is not active");
        require(userRewards[msg.sender][programId].userAddress != address(0), "User not enrolled in program");
        
        uint256 transactionId = transactionCounter++;
        
        // Convert externalEuint32 to euint32 using FHE.fromExternal
        euint32 internalPoints = FHE.fromExternal(points, inputProof);
        
        UserReward storage userReward = userRewards[msg.sender][programId];
        
        // Update user reward record
        userReward.points = FHE.sub(userReward.points, internalPoints);
        userReward.totalRedeemed = FHE.add(userReward.totalRedeemed, internalPoints);
        userReward.lastUpdated = block.timestamp;
        
        // Update program totals
        loyaltyPrograms[programId].totalRewards = FHE.sub(loyaltyPrograms[programId].totalRewards, internalPoints);
        loyaltyPrograms[programId].totalTransactions = FHE.add(loyaltyPrograms[programId].totalTransactions, FHE.asEuint32(1));
        
        // Create transaction record
        transactions[transactionId] = Transaction({
            transactionId: FHE.asEuint32(0), // Will be set properly later
            programId: FHE.asEuint32(0), // Will be set properly later
            userId: FHE.asEuint32(0), // Will be set properly later
            pointsEarned: FHE.asEuint32(0),
            pointsRedeemed: internalPoints,
            newBalance: userReward.points,
            isEarn: false,
            userAddress: msg.sender,
            timestamp: block.timestamp
        });
        
        // Update user tier based on remaining points
        _updateUserTier(programId, msg.sender);
        
        emit RewardRedeemed(transactionId, programId, msg.sender, 0); // Points will be decrypted off-chain
        return transactionId;
    }
    
    function _updateUserTier(uint256 programId, address user) internal {
        UserReward storage userReward = userRewards[user][programId];
        euint32 currentPoints = userReward.points;
        euint32 newTier = FHE.asEuint32(1); // Default to tier 1
        
        // Check each tier to find the appropriate one
        for (uint256 i = 1; i <= tierCounter; i++) {
            RewardTier storage tier = rewardTiers[programId][i];
            if (tier.isActive) {
                // Check if user's points fall within this tier's range
                ebool inRange = FHE.and(
                    FHE.gte(currentPoints, tier.minPoints),
                    FHE.lte(currentPoints, tier.maxPoints)
                );
                
                // If in range, update tier
                newTier = FHE.select(inRange, FHE.asEuint32(i), newTier);
            }
        }
        
        // Update user tier if it changed
        ebool tierChanged = FHE.neq(userReward.tier, newTier);
        userReward.tier = FHE.select(tierChanged, newTier, userReward.tier);
        
        // Emit event if tier changed
        if (FHE.decrypt(tierChanged)) {
            emit TierUpdated(programId, 0, 0); // Will be decrypted off-chain
        }
    }
    
    function createRewardTier(
        uint256 programId,
        string memory _name,
        externalEuint32 minPoints,
        externalEuint32 maxPoints,
        externalEuint32 multiplier,
        bytes calldata inputProof
    ) public returns (uint256) {
        require(loyaltyPrograms[programId].owner == msg.sender, "Only program owner can create tiers");
        require(loyaltyPrograms[programId].isActive, "Program is not active");
        
        uint256 tierId = tierCounter++;
        
        rewardTiers[programId][tierId] = RewardTier({
            tierId: FHE.asEuint32(0), // Will be set properly later
            minPoints: FHE.fromExternal(minPoints, inputProof),
            maxPoints: FHE.fromExternal(maxPoints, inputProof),
            multiplier: FHE.fromExternal(multiplier, inputProof),
            name: _name,
            isActive: true
        });
        
        return tierId;
    }
    
    function verifyProgram(uint256 programId, bool isVerified) public {
        require(msg.sender == verifier, "Only verifier can verify programs");
        require(loyaltyPrograms[programId].owner != address(0), "Program does not exist");
        
        loyaltyPrograms[programId].isVerified = isVerified;
        emit ProgramVerified(programId, isVerified);
    }
    
    function getProgramInfo(uint256 programId) public view returns (
        string memory name,
        string memory description,
        uint8 totalRewards,
        uint8 activeUsers,
        uint8 totalTransactions,
        bool isActive,
        bool isVerified,
        address owner,
        uint256 createdAt,
        uint256 expiresAt
    ) {
        LoyaltyProgram storage program = loyaltyPrograms[programId];
        return (
            program.name,
            program.description,
            0, // FHE.decrypt(program.totalRewards) - will be decrypted off-chain
            0, // FHE.decrypt(program.activeUsers) - will be decrypted off-chain
            0, // FHE.decrypt(program.totalTransactions) - will be decrypted off-chain
            program.isActive,
            program.isVerified,
            program.owner,
            program.createdAt,
            program.expiresAt
        );
    }
    
    function getUserRewardInfo(uint256 programId, address user) public view returns (
        uint8 points,
        uint8 tier,
        uint8 totalEarned,
        uint8 totalRedeemed,
        bool isActive,
        uint256 lastUpdated
    ) {
        UserReward storage userReward = userRewards[user][programId];
        return (
            0, // FHE.decrypt(userReward.points) - will be decrypted off-chain
            0, // FHE.decrypt(userReward.tier) - will be decrypted off-chain
            0, // FHE.decrypt(userReward.totalEarned) - will be decrypted off-chain
            0, // FHE.decrypt(userReward.totalRedeemed) - will be decrypted off-chain
            userReward.isActive,
            userReward.lastUpdated
        );
    }
    
    function getTransactionInfo(uint256 transactionId) public view returns (
        uint8 pointsEarned,
        uint8 pointsRedeemed,
        uint8 newBalance,
        bool isEarn,
        address userAddress,
        uint256 timestamp
    ) {
        Transaction storage transaction = transactions[transactionId];
        return (
            0, // FHE.decrypt(transaction.pointsEarned) - will be decrypted off-chain
            0, // FHE.decrypt(transaction.pointsRedeemed) - will be decrypted off-chain
            0, // FHE.decrypt(transaction.newBalance) - will be decrypted off-chain
            transaction.isEarn,
            transaction.userAddress,
            transaction.timestamp
        );
    }
    
    function getRewardTierInfo(uint256 programId, uint256 tierId) public view returns (
        uint8 minPoints,
        uint8 maxPoints,
        uint8 multiplier,
        string memory name,
        bool isActive
    ) {
        RewardTier storage tier = rewardTiers[programId][tierId];
        return (
            0, // FHE.decrypt(tier.minPoints) - will be decrypted off-chain
            0, // FHE.decrypt(tier.maxPoints) - will be decrypted off-chain
            0, // FHE.decrypt(tier.multiplier) - will be decrypted off-chain
            tier.name,
            tier.isActive
        );
    }
}
