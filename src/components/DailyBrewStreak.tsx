
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Coffee, Star } from "lucide-react";

const DailyBrewStreak = () => {
  const streakDays = [
    { day: 'Mon', brewed: true },
    { day: 'Tue', brewed: true },
    { day: 'Wed', brewed: true },
    { day: 'Thu', brewed: true },
    { day: 'Fri', brewed: true },
    { day: 'Sat', brewed: true },
    { day: 'Sun', brewed: false, today: true },
  ];

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-coffee-dark">Daily Brew Streak</h3>
        <div className="flex items-center space-x-1 text-coffee-gold">
          <Star className="w-4 h-4 fill-current" />
          <span className="text-sm font-medium">47 Days</span>
        </div>
      </div>
      
      <div className="grid grid-cols-7 gap-2 mb-6">
        {streakDays.map((day, index) => (
          <div key={index} className="text-center">
            <div className="text-xs text-muted-foreground mb-1">{day.day}</div>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center mx-auto ${
              day.today 
                ? 'bg-accent pulse-glow' 
                : day.brewed 
                  ? 'bg-coffee-gradient' 
                  : 'bg-muted'
            }`}>
              {day.brewed && <Coffee className="w-4 h-4 text-white" />}
              {day.today && !day.brewed && <Coffee className="w-4 h-4 text-white" />}
            </div>
          </div>
        ))}
      </div>
      
      <Button className="w-full coffee-gradient hover:opacity-90 text-white font-medium">
        ☕ Brew Your Daily Coffee
      </Button>
      
      <p className="text-xs text-center text-muted-foreground mt-2">
        +50 Aroma Points • Keep your streak alive!
      </p>
    </Card>
  );
};

export default DailyBrewStreak;
