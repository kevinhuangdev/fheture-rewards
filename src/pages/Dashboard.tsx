import { Coffee, Plane, ShoppingBag, Car, Gamepad2, CreditCard } from "lucide-react";
import WalletConnect from "@/components/WalletConnect";
import LoyaltyCard from "@/components/LoyaltyCard";
import StatsOverview from "@/components/StatsOverview";

const Dashboard = () => {
  const loyaltyPrograms = [
    {
      id: "0",
      title: "CoffeeCorp Rewards",
      points: 2450,
      tier: "Gold",
      nextReward: "Free Premium Drink",
      encrypted: true,
      gradient: "linear-gradient(135deg, #8B4513 0%, #D2691E 100%)",
      icon: <Coffee className="w-5 h-5 text-white" />
    },
    {
      id: "1",
      title: "SkyMiles Plus",
      points: 45670,
      tier: "Platinum",
      nextReward: "Free Flight Upgrade",
      encrypted: true,
      gradient: "linear-gradient(135deg, #1E40AF 0%, #3B82F6 100%)",
      icon: <Plane className="w-5 h-5 text-white" />
    },
    {
      id: "2",
      title: "Shop & Save",
      points: 8920,
      tier: "Silver",
      nextReward: "10% Off Coupon",
      encrypted: true,
      gradient: "linear-gradient(135deg, #059669 0%, #10B981 100%)",
      icon: <ShoppingBag className="w-5 h-5 text-white" />
    },
    {
      id: "3",
      title: "Drive Rewards",
      points: 1230,
      tier: "Bronze",
      nextReward: "Free Car Wash",
      encrypted: true,
      gradient: "linear-gradient(135deg, #DC2626 0%, #EF4444 100%)",
      icon: <Car className="w-5 h-5 text-white" />
    },
    {
      id: "4",
      title: "GameZone Points",
      points: 15670,
      tier: "Elite",
      nextReward: "Exclusive Game Access",
      encrypted: true,
      gradient: "linear-gradient(135deg, #7C3AED 0%, #A855F7 100%)",
      icon: <Gamepad2 className="w-5 h-5 text-white" />
    },
    {
      id: "5",
      title: "Premium Card",
      points: 34560,
      tier: "Diamond",
      nextReward: "Cashback Bonus",
      encrypted: true,
      gradient: "linear-gradient(135deg, #1F2937 0%, #4B5563 100%)",
      icon: <CreditCard className="w-5 h-5 text-white" />
    }
  ];

  return (
    <div className="min-h-screen" style={{ background: "var(--gradient-hero)" }}>
      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Header */}
        <div className="text-center space-y-4 mb-12">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
            Rewards Secured by FHE
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Your loyalty rewards are encrypted with Fully Homomorphic Encryption, 
            keeping your data private from competitors while earning maximum benefits.
          </p>
        </div>

        {/* Wallet Connect */}
        <div className="max-w-md mx-auto">
          <WalletConnect />
        </div>

        {/* Stats Overview */}
        <StatsOverview />

        {/* Loyalty Cards Grid */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-center">Your Encrypted Loyalty Programs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {loyaltyPrograms.map((program, index) => (
              <LoyaltyCard key={index} {...program} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;