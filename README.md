# Fheture Rewards

A decentralized loyalty rewards platform built with FHE (Fully Homomorphic Encryption) technology, providing privacy-preserving reward management and transparent loyalty programs.

## Features

- **Privacy-Preserving Rewards**: All reward data is encrypted using FHE technology
- **Decentralized Architecture**: Built on blockchain for transparency and security
- **Multi-Wallet Support**: Compatible with popular Web3 wallets including Rainbow, MetaMask, and more
- **Real-time Analytics**: Track loyalty program performance with encrypted analytics
- **Secure Transactions**: All transactions are protected by FHE encryption

## Technologies Used

- **Frontend**: React, TypeScript, Vite, Tailwind CSS
- **UI Components**: shadcn/ui, Radix UI
- **Blockchain**: Ethereum (Sepolia Testnet)
- **Wallet Integration**: RainbowKit, Wagmi, Viem
- **Encryption**: FHEVM (Fully Homomorphic Encryption)
- **State Management**: TanStack Query

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- A Web3 wallet (MetaMask, Rainbow, etc.)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/kevinhuangdev/fheture-rewards.git
cd fheture-rewards
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

4. Configure your environment variables in `.env.local`:
```env
NEXT_PUBLIC_CHAIN_ID=11155111
NEXT_PUBLIC_RPC_URL=https://sepolia.infura.io/v3/b18fb7e6ca7045ac83c41157ab93f990
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=2ec9743d0d0cd7fb94dee1a7e6d33475
NEXT_PUBLIC_INFURA_API_KEY=b18fb7e6ca7045ac83c41157ab93f990
```

5. Start the development server:
```bash
npm run dev
```

6. Open [http://localhost:5173](http://localhost:5173) in your browser

## Smart Contract

The project includes a smart contract built with FHEVM that handles:
- Encrypted reward storage and management
- Privacy-preserving loyalty program operations
- Secure reward distribution
- Transparent but encrypted analytics

## Deployment

### Vercel Deployment

1. Connect your GitHub repository to Vercel
2. Set up environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Manual Deployment

```bash
npm run build
npm run preview
```

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support, email sidney123@zenithcorp.xyz or create an issue in the repository.