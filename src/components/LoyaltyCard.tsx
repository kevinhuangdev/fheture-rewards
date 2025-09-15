import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Lock, Star, Gift, TrendingUp, Plus, Minus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useUserRewardInfo, useFhetureRewards } from "@/hooks/useContract";
import { useState } from "react";

interface LoyaltyCardProps {
  id: string;
  title: string;
  points?: number;
  tier?: string;
  nextReward?: string;
  encrypted: boolean;
  gradient: string;
  icon: React.ReactNode;
}

const LoyaltyCard = ({ 
  id,
  title, 
  points: mockPoints, 
  tier: mockTier, 
  nextReward: mockNextReward, 
  encrypted, 
  gradient,
  icon 
}: LoyaltyCardProps) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const programId = parseInt(id);
  
  // Get real data from contract
  const { userRewardInfo, isLoading: isContractLoading } = useUserRewardInfo(programId);
  const { earnRewards, redeemRewards } = useFhetureRewards();
  
  // Use contract data if available, otherwise fall back to mock data
  const points = userRewardInfo?.points || mockPoints || 0;
  const tier = userRewardInfo?.tier ? `Tier ${userRewardInfo.tier}` : mockTier || 'Bronze';
  const nextReward = mockNextReward || 'Free coffee';

  const handleClick = () => {
    navigate(`/loyalty/${id}`);
  };

  const handleEarnRewards = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsLoading(true);
    try {
      await earnRewards(programId, 10); // Earn 10 points
    } catch (error) {
      console.error('Error earning rewards:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRedeemRewards = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsLoading(true);
    try {
      await redeemRewards(programId, 5); // Redeem 5 points
    } catch (error) {
      console.error('Error redeeming rewards:', error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Card 
      className="glass-card hover:glow transition-smooth cursor-pointer group"
      onClick={handleClick}
    >
      <div 
        className={`p-6 rounded-lg relative overflow-hidden ${gradient}`}
        style={{
          background: gradient
        }}
      >
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-20 h-20 bg-white/5 rounded-full -translate-y-4 translate-x-4" />
        <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/5 rounded-full translate-y-4 -translate-x-4" />
        
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/10 rounded-lg">
              {icon}
            </div>
            <div>
              <h3 className="font-bold text-white">{title}</h3>
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                {tier}
              </Badge>
            </div>
          </div>
          {encrypted && (
            <div className="flex items-center gap-1 px-2 py-1 bg-white/20 rounded-full">
              <Lock className="w-3 h-3 text-white" />
              <span className="text-xs text-white font-medium">FHE</span>
            </div>
          )}
        </div>

        {/* Points */}
        <div className="mb-4">
          <div className="text-3xl font-bold text-white mb-1">
            {points.toLocaleString()}
          </div>
          <div className="text-white/80 text-sm">Reward Points</div>
        </div>

        {/* Next Reward */}
        <div className="flex items-center gap-2 text-white/90 text-sm mb-4">
          <Gift className="w-4 h-4" />
          <span>Next: {nextReward}</span>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="secondary"
            className="flex-1 bg-white/20 hover:bg-white/30 text-white border-white/30"
            onClick={handleEarnRewards}
            disabled={isLoading || isContractLoading}
          >
            <Plus className="w-3 h-3 mr-1" />
            Earn
          </Button>
          <Button
            size="sm"
            variant="secondary"
            className="flex-1 bg-white/20 hover:bg-white/30 text-white border-white/30"
            onClick={handleRedeemRewards}
            disabled={isLoading || isContractLoading}
          >
            <Minus className="w-3 h-3 mr-1" />
            Redeem
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default LoyaltyCard;