
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Coffee, Star } from "lucide-react";
import { toast } from "sonner";

const DailyBrewStreak = () => {
  const [streak, setStreak] = useState(() => {
    return parseInt(localStorage.getItem("brewStreak") || "0", 10);
  });
  
  const [lastBrewDate, setLastBrewDate] = useState(() => {
    return localStorage.getItem("lastBrewDate") || "";
  });
  
  const [todayBrewed, setTodayBrewed] = useState(() => {
    const today = new Date().toDateString();
    return lastBrewDate === today;
  });
  
  const [streakDays, setStreakDays] = useState<{ day: string; brewed: boolean; today?: boolean }[]>([]);
  
  useEffect(() => {
    // Generate the days of the week with proper status
    const today = new Date();
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const todayIndex = today.getDay();
    
    const weekDays = Array(7).fill(null).map((_, i) => {
      const dayIndex = (todayIndex - 6 + i + 7) % 7;
      const dayName = days[dayIndex];
      const isToday = i === 6;
      
      // If today, use todayBrewed, otherwise check if this day should be marked as brewed
      // based on streak length
      let brewed = false;
      if (isToday) {
        brewed = todayBrewed;
      } else {
        const daysAgo = 6 - i;
        brewed = streak >= daysAgo;
      }
      
      return {
        day: dayName,
        brewed,
        today: isToday
      };
    });
    
    setStreakDays(weekDays);
  }, [streak, todayBrewed]);
  
  const handleDailyBrew = () => {
    const today = new Date().toDateString();
    
    // If already brewed today, don't do anything
    if (todayBrewed) {
      toast.info("You've already brewed your daily coffee today!");
      return;
    }
    
    // Check if we need to increment the streak
    let newStreak = streak;
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayString = yesterday.toDateString();
    
    if (lastBrewDate === yesterdayString || streak === 0) {
      // Maintain or start streak
      newStreak = streak + 1;
    } else if (lastBrewDate !== today) {
      // Broke the streak, start again
      newStreak = 1;
      toast.info("New streak started! Keep going!", { duration: 3000 });
    }
    
    // Update state and localStorage
    setStreak(newStreak);
    setLastBrewDate(today);
    setTodayBrewed(true);
    
    localStorage.setItem("brewStreak", newStreak.toString());
    localStorage.setItem("lastBrewDate", today);
    
    // Update UI
    const updatedDays = streakDays.map(day => 
      day.today ? { ...day, brewed: true } : day
    );
    setStreakDays(updatedDays);
    
    // Award points
    toast.success(`Daily Coffee Brewed! +50 Aroma Points! Streak: ${newStreak} days`, {
      duration: 3000
    });
  };
  
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-coffee-dark">Daily Brew Streak</h3>
        <div className="flex items-center space-x-1 text-coffee-gold">
          <Star className="w-4 h-4 fill-current" />
          <span className="text-sm font-medium">{streak} Days</span>
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
      
      <Button 
        className="w-full coffee-gradient hover:opacity-90 text-white font-medium"
        onClick={handleDailyBrew}
        disabled={todayBrewed}
      >
        {todayBrewed ? "Brewed Today ✓" : "☕ Brew Your Daily Coffee"}
      </Button>
      
      <p className="text-xs text-center text-muted-foreground mt-2">
        +50 Aroma Points • Keep your streak alive!
      </p>
    </Card>
  );
};

export default DailyBrewStreak;
