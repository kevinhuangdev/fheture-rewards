import { Card } from "@/components/ui/card";
import { TrendingUp, Shield, Users, Award } from "lucide-react";

const StatsOverview = () => {
  const stats = [
    {
      title: "Total Rewards",
      value: "24,567",
      change: "+12.5%",
      icon: <Award className="w-5 h-5 text-success" />,
      color: "success"
    },
    {
      title: "Active Programs",
      value: "8",
      change: "+2",
      icon: <Users className="w-5 h-5 text-primary" />,
      color: "primary"
    },
    {
      title: "Encryption Level",
      value: "FHE-256",
      change: "Max Security",
      icon: <Shield className="w-5 h-5 text-primary-glow" />,
      color: "primary-glow"
    },
    {
      title: "Monthly Growth",
      value: "18.2%",
      change: "+5.4%",
      icon: <TrendingUp className="w-5 h-5 text-success" />,
      color: "success"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <Card key={index} className="glass-card p-6 hover:glow transition-smooth">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-primary/10 rounded-lg">
              {stat.icon}
            </div>
            <div className={`text-xs font-medium px-2 py-1 bg-${stat.color}/10 text-${stat.color} rounded-full`}>
              {stat.change}
            </div>
          </div>
          <div className="space-y-1">
            <div className="text-2xl font-bold">{stat.value}</div>
            <div className="text-sm text-muted-foreground">{stat.title}</div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default StatsOverview;