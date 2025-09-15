# Vercel Deployment Guide for Fheture Rewards

This guide provides step-by-step instructions for deploying the Fheture Rewards application to Vercel.

## Prerequisites

- A Vercel account (free tier available)
- GitHub account with access to the fheture-rewards repository
- Node.js 18+ installed locally (for testing)

## Step-by-Step Deployment

### 1. Access Vercel Dashboard

1. Go to [vercel.com](https://vercel.com)
2. Sign in with your GitHub account
3. Click "New Project" on the dashboard

### 2. Import GitHub Repository

1. In the "Import Git Repository" section, search for `kevinhuangdev/fheture-rewards`
2. Click "Import" next to the repository
3. Vercel will automatically detect it as a Vite project

### 3. Configure Project Settings

1. **Project Name**: `fheture-rewards` (or your preferred name)
2. **Framework Preset**: Vite (should be auto-detected)
3. **Root Directory**: `./` (default)
4. **Build Command**: `npm run build` (default)
5. **Output Directory**: `dist` (default)
6. **Install Command**: `npm install` (default)

### 4. Environment Variables Configuration

Click "Environment Variables" and add the following variables:

```
VITE_CHAIN_ID=11155111
VITE_RPC_URL=https://sepolia.infura.io/v3/YOUR_INFURA_KEY
VITE_WALLET_CONNECT_PROJECT_ID=YOUR_PROJECT_ID
VITE_INFURA_API_KEY=YOUR_INFURA_KEY
VITE_FHEVM_NETWORK=sepolia
VITE_CONTRACT_ADDRESS=0x0000000000000000000000000000000000000000
```

**Important**: Make sure to add these for all environments (Production, Preview, Development).

### 5. Advanced Configuration (Optional)

1. **Node.js Version**: Set to 18.x or higher
2. **Build Settings**: 
   - Enable "Automatically expose System Environment Variables"
   - Set "Node.js Version" to 18.x

### 6. Deploy

1. Click "Deploy" button
2. Wait for the build process to complete (usually 2-5 minutes)
3. Vercel will provide you with a deployment URL

### 7. Custom Domain (Optional)

1. Go to your project dashboard
2. Click "Settings" → "Domains"
3. Add your custom domain
4. Follow DNS configuration instructions

## Post-Deployment Configuration

### 1. Update Contract Address

After deploying your smart contract, update the contract address in:
- `config.ts` file
- Environment variables in Vercel dashboard

### 2. Test the Application

1. Visit your deployment URL
2. Connect a wallet (MetaMask, Rainbow, etc.)
3. Test the loyalty program functionality
4. Verify FHE encryption is working

### 3. Monitor Performance

1. Check Vercel Analytics for performance metrics
2. Monitor error logs in the Vercel dashboard
3. Set up alerts for build failures

## Environment-Specific Configurations

### Production Environment
- Use production RPC URLs
- Set up proper error monitoring
- Configure analytics tracking

### Preview Environment
- Use testnet configurations
- Enable debug logging
- Test new features before production

### Development Environment
- Use local development settings
- Enable hot reloading
- Debug mode enabled

## Troubleshooting

### Common Issues

1. **Build Failures**
   - Check Node.js version compatibility
   - Verify all dependencies are installed
   - Review build logs for specific errors

2. **Environment Variables Not Loading**
   - Ensure variables are set for all environments
   - Check variable names match exactly
   - Redeploy after adding new variables

3. **Wallet Connection Issues**
   - Verify WalletConnect Project ID is correct
   - Check RPC URL accessibility
   - Ensure proper network configuration

4. **FHE Contract Issues**
   - Verify FHEVM network configuration
   - Check contract deployment status
   - Ensure proper encryption setup

### Support

For deployment issues:
- Check Vercel documentation
- Review GitHub repository issues
- Contact support at sidney123@zenithcorp.xyz

## Security Considerations

1. **Environment Variables**: Never commit sensitive keys to the repository
2. **API Keys**: Rotate keys regularly
3. **Access Control**: Limit repository access to authorized personnel
4. **Monitoring**: Set up alerts for unusual activity

## Performance Optimization

1. **Build Optimization**: Use Vite's build optimizations
2. **Caching**: Configure proper caching headers
3. **CDN**: Leverage Vercel's global CDN
4. **Bundle Analysis**: Monitor bundle size and optimize

## Maintenance

1. **Regular Updates**: Keep dependencies updated
2. **Security Patches**: Apply security updates promptly
3. **Performance Monitoring**: Regular performance audits
4. **Backup**: Regular backups of configuration and data

---

**Deployment URL**: Will be provided after successful deployment
**Last Updated**: January 2025
**Version**: 1.0.0
