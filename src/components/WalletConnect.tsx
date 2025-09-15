import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount, useDisconnect } from 'wagmi';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Wallet, Shield, Check } from "lucide-react";

const WalletConnect = () => {
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();

  return (
    <Card className="glass-card p-6 border-primary/20">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Wallet className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold">Wallet Connection</h3>
            <p className="text-sm text-muted-foreground">
              {isConnected ? "Connected securely" : "Connect to access rewards"}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Shield className="w-4 h-4 text-success" />
          <span className="text-xs text-success font-medium">FHE Protected</span>
        </div>
      </div>

      {isConnected ? (
        <div className="space-y-4">
          <div className="flex items-center gap-2 p-3 bg-success/10 rounded-lg border border-success/20">
            <Check className="w-4 h-4 text-success" />
            <span className="text-sm font-medium">Connected: {address?.slice(0, 6)}...{address?.slice(-4)}</span>
          </div>
          <Button 
            variant="outline" 
            onClick={() => disconnect()}
            className="w-full"
          >
            Disconnect Wallet
          </Button>
        </div>
      ) : (
        <ConnectButton.Custom>
          {({
            account,
            chain,
            openAccountModal,
            openChainModal,
            openConnectModal,
            authenticationStatus,
            mounted,
          }) => {
            const ready = mounted && authenticationStatus !== 'loading';
            const connected =
              ready &&
              account &&
              chain &&
              (!authenticationStatus ||
                authenticationStatus === 'authenticated');

            return (
              <div
                {...(!ready && {
                  'aria-hidden': true,
                  'style': {
                    opacity: 0,
                    pointerEvents: 'none',
                    userSelect: 'none',
                  },
                })}
              >
                {(() => {
                  if (!connected) {
                    return (
                      <Button 
                        onClick={openConnectModal}
                        className="w-full bg-gradient-to-r from-primary to-primary-glow glow hover:scale-105 transition-smooth"
                      >
                        <Wallet className="w-4 h-4 mr-2" />
                        Connect Wallet
                      </Button>
                    );
                  }

                  if (chain.unsupported) {
                    return (
                      <Button 
                        onClick={openChainModal}
                        className="w-full bg-red-500 hover:bg-red-600"
                      >
                        Wrong network
                      </Button>
                    );
                  }

                  return (
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 p-3 bg-success/10 rounded-lg border border-success/20">
                        <Check className="w-4 h-4 text-success" />
                        <span className="text-sm font-medium">Connected: {account.displayName}</span>
                      </div>
                      <Button 
                        variant="outline" 
                        onClick={openAccountModal}
                        className="w-full"
                      >
                        Account Details
                      </Button>
                    </div>
                  );
                })()}
              </div>
            );
          }}
        </ConnectButton.Custom>
      )}
    </Card>
  );
};

export default WalletConnect;