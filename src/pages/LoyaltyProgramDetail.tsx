import { useParams, useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Lock, Star, Gift, TrendingUp, Calendar, CreditCard, Shield } from "lucide-react";

const LoyaltyProgramDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock data - in real app this would come from API/state management
  const loyaltyPrograms = [
    {
      id: "0",
      title: "CoffeeCorp Rewards",
      points: 2450,
      tier: "Gold",
      nextReward: "Free Premium Drink",
      encrypted: true,
      gradient: "linear-gradient(135deg, #8B4513 0%, #D2691E 100%)",
      description: "Earn points with every coffee purchase and unlock exclusive rewards.",
      memberSince: "January 2023",
      totalSpent: "$1,245",
      rewardsEarned: 18,
      nextTierPoints: 550,
      benefits: [
        "10% discount on all beverages",
        "Priority ordering during peak hours",
        "Exclusive access to seasonal drinks",
        "Birthday month special offers"
      ],
      recentActivity: [
        { date: "2024-01-15", activity: "Earned 25 points - Grande Latte", points: 25 },
        { date: "2024-01-12", activity: "Redeemed - Free Pastry", points: -150 },
        { date: "2024-01-10", activity: "Earned 30 points - Venti Cappuccino", points: 30 },
        { date: "2024-01-08", activity: "Earned 20 points - Regular Coffee", points: 20 }
      ]
    }
    // Add other programs as needed
  ];

  const program = loyaltyPrograms.find(p => p.id === id) || loyaltyPrograms[0];
  const progressToNextTier = ((program.points % 1000) / 1000) * 100;

  return (
    <div className="min-h-screen" style={{ background: "var(--gradient-hero)" }}>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => navigate(-1)}
            className="text-white hover:bg-white/10"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
        </div>

        {/* Hero Card */}
        <Card className="glass-card mb-8 overflow-hidden">
          <div 
            className="p-8 text-white relative"
            style={{ background: program.gradient }}
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-8 translate-x-8" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-8 -translate-x-8" />
            
            <div className="relative">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h1 className="text-3xl font-bold mb-2">{program.title}</h1>
                  <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                    {program.tier} Member
                  </Badge>
                </div>
                {program.encrypted && (
                  <div className="flex items-center gap-2 px-3 py-2 bg-white/20 rounded-full">
                    <Lock className="w-4 h-4" />
                    <span className="text-sm font-medium">FHE Encrypted</span>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <div className="text-4xl font-bold mb-1">
                    {program.points.toLocaleString()}
                  </div>
                  <div className="text-white/80">Current Points</div>
                </div>
                <div>
                  <div className="text-2xl font-bold mb-1">{program.rewardsEarned}</div>
                  <div className="text-white/80">Rewards Earned</div>
                </div>
                <div>
                  <div className="text-2xl font-bold mb-1">{program.totalSpent}</div>
                  <div className="text-white/80">Total Spent</div>
                </div>
              </div>
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Next Tier Progress */}
            <Card className="glass-card p-6">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                Progress to Next Tier
              </h2>
              <div className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span>Current: {program.tier}</span>
                  <span>Next: Platinum</span>
                </div>
                <Progress value={progressToNextTier} className="h-3" />
                <div className="text-sm text-muted-foreground">
                  {program.nextTierPoints} more points needed for Platinum tier
                </div>
              </div>
            </Card>

            {/* Tier Benefits */}
            <Card className="glass-card p-6">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Star className="w-5 h-5 text-primary" />
                Your {program.tier} Benefits
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {program.benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-accent/10 rounded-lg">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                    <span className="text-sm">{benefit}</span>
                  </div>
                ))}
              </div>
            </Card>

            {/* Recent Activity */}
            <Card className="glass-card p-6">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-primary" />
                Recent Activity
              </h2>
              <div className="space-y-4">
                {program.recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-accent/5 rounded-lg">
                    <div>
                      <div className="font-medium">{activity.activity}</div>
                      <div className="text-sm text-muted-foreground">{activity.date}</div>
                    </div>
                    <div className={`font-bold ${activity.points > 0 ? 'text-success' : 'text-primary'}`}>
                      {activity.points > 0 ? '+' : ''}{activity.points} pts
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <Card className="glass-card p-6">
              <h3 className="font-bold mb-4 flex items-center gap-2">
                <Shield className="w-5 h-5 text-primary" />
                Account Details
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Member Since</span>
                  <span>{program.memberSince}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Encryption</span>
                  <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                    FHE-256
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Status</span>
                  <Badge variant="outline" className="bg-success/10 text-success border-success/20">
                    Active
                  </Badge>
                </div>
              </div>
            </Card>

            {/* Next Reward */}
            <Card className="glass-card p-6">
              <h3 className="font-bold mb-4 flex items-center gap-2">
                <Gift className="w-5 h-5 text-primary" />
                Next Reward
              </h3>
              <div className="text-center space-y-4">
                <div className="p-4 bg-primary/10 rounded-lg">
                  <div className="text-lg font-bold">{program.nextReward}</div>
                  <div className="text-sm text-muted-foreground">Available now!</div>
                </div>
                <Button className="w-full">
                  <Gift className="w-4 h-4 mr-2" />
                  Redeem Now
                </Button>
              </div>
            </Card>

            {/* Quick Actions */}
            <Card className="glass-card p-6">
              <h3 className="font-bold mb-4 flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-primary" />
                Quick Actions
              </h3>
              <div className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  View Transaction History
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Update Preferences
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Contact Support
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoyaltyProgramDetail;