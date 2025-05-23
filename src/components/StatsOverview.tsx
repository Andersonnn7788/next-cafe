import { Card } from "@/components/ui/card";
import { Star, Coffee, Gift, Book } from "lucide-react";

const StatsOverview = () => {
  const stats = [
    {
      icon: Star,
      label: "Aroma Points",
      value: "1,250",
      change: "+50 today",
      color: "text-amber-600"
    },
    {
      icon: Coffee,
      label: "Brews This Week",
      value: "12",
      change: "+2 from last week",
      color: "text-amber-800"
    },
    {
      icon: Gift,
      label: "Achievements",
      value: "8",
      change: "2 new this month",
      color: "text-accent"
    },
    {
      icon: Book,
      label: "Quiz Score",
      value: "85%",
      change: "+5% this week",
      color: "text-primary"
    }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <Card key={index} className="p-4 hover:shadow-md transition-shadow">
          <div className="flex items-center space-x-3 mb-2">
            <stat.icon className={`w-5 h-5 ${stat.color}`} />
            <span className="text-sm text-muted-foreground">{stat.label}</span>
          </div>
          <div className="text-2xl font-bold text-amber-900 mb-1">{stat.value}</div>
          <div className="text-xs text-muted-foreground">{stat.change}</div>
        </Card>
      ))}
    </div>
  );
};

export default StatsOverview;
