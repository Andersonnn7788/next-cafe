import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, Flame, Coffee } from "lucide-react";
import { toast } from "sonner";

const DailyBrewStreak = () => {
  const [currentStreak, setCurrentStreak] = useState(1);
  const [hasBrewedToday, setHasBrewedToday] = useState(false);
  const [weeklyProgress, setWeeklyProgress] = useState<boolean[]>([false, false, false, false, true, false, false]); // Sun-Sat

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const today = new Date().getDay(); // 0 = Sunday, 1 = Monday, etc.

  useEffect(() => {
    // Load streak data from localStorage
    const savedStreak = localStorage.getItem("dailyBrewStreak");
    const savedLastBrew = localStorage.getItem("lastBrewDate");
    const savedWeeklyProgress = localStorage.getItem("weeklyBrewProgress");
    
    if (savedStreak) {
      setCurrentStreak(parseInt(savedStreak));
    }
    
    if (savedWeeklyProgress) {
      setWeeklyProgress(JSON.parse(savedWeeklyProgress));
    }
    
    // Check if user has brewed today
    if (savedLastBrew) {
      const lastBrewDate = new Date(savedLastBrew);
      const todayDate = new Date();
      const isToday = lastBrewDate.toDateString() === todayDate.toDateString();
      setHasBrewedToday(isToday);
    }
  }, []);

  const handleBrewToday = () => {
    if (hasBrewedToday) {
      toast.info("You've already brewed today! Come back tomorrow.");
      return;
    }

    // Update streak
    const newStreak = currentStreak + 1;
    setCurrentStreak(newStreak);
    setHasBrewedToday(true);
    
    // Update weekly progress
    const newWeeklyProgress = [...weeklyProgress];
    newWeeklyProgress[today] = true;
    setWeeklyProgress(newWeeklyProgress);
    
    // Save to localStorage
    localStorage.setItem("dailyBrewStreak", newStreak.toString());
    localStorage.setItem("lastBrewDate", new Date().toISOString());
    localStorage.setItem("weeklyBrewProgress", JSON.stringify(newWeeklyProgress));
    
    // Add aroma points
    const currentPoints = parseInt(localStorage.getItem("aromaPoints") || "0");
    const newPoints = currentPoints + 50;
    localStorage.setItem("aromaPoints", newPoints.toString());
    
    toast.success(`+50 Aroma Points • Keep your streak alive!`, {
      duration: 3000,
    });
  };

  const getDayIcon = (dayIndex: number) => {
    const isCompleted = weeklyProgress[dayIndex];
    const isToday = dayIndex === today;
    const isFuture = dayIndex > today;
    
    if (isCompleted) {
      return (
        <div className="w-10 h-10 bg-gradient-to-r from-amber-400 to-amber-600 rounded-full flex items-center justify-center shadow-lg">
          <Coffee className="w-5 h-5 text-white" />
        </div>
      );
    } else if (isToday) {
      return (
        <div className="w-10 h-10 bg-amber-100 border-2 border-amber-400 rounded-full flex items-center justify-center animate-pulse">
          <Coffee className="w-5 h-5 text-amber-600" />
        </div>
      );
    } else if (isFuture) {
      return (
        <div className="w-10 h-10 bg-gray-100 border-2 border-gray-300 rounded-full flex items-center justify-center opacity-50">
          <Coffee className="w-5 h-5 text-gray-400" />
        </div>
      );
    } else {
      // Past days not completed
      return (
        <div className="w-10 h-10 bg-gray-100 border-2 border-gray-300 rounded-full flex items-center justify-center">
          <Coffee className="w-5 h-5 text-gray-400" />
        </div>
      );
    }
  };

  const getStreakMessage = () => {
    if (currentStreak === 1) return "Start your brewing journey!";
    if (currentStreak < 7) return "Building momentum!";
    if (currentStreak < 30) return "Great consistency!";
    return "Coffee master level!";
  };

  return (
    <Card className="p-6 bg-gradient-to-br from-amber-50 to-white">
      <div className="flex items-center space-x-3 mb-6">
        <div className="relative">
          <div className="p-2 bg-gradient-to-r from-amber-400 to-amber-600 rounded-lg">
            <Flame className="w-6 h-6 text-white" />
          </div>
          <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
            {currentStreak}
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-amber-900">Daily Brew Streak</h3>
          <p className="text-sm text-muted-foreground">{getStreakMessage()}</p>
        </div>
      </div>

      {/* Weekly Progress */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-3">
          {daysOfWeek.map((day, index) => (
            <div key={day} className="flex flex-col items-center space-y-2">
              <span className={`text-xs font-medium ${
                index === today ? 'text-amber-600' : 'text-muted-foreground'
              }`}>
                {day}
              </span>
              {getDayIcon(index)}
            </div>
          ))}
        </div>
      </div>

      {/* Action Button */}
      <div className="space-y-4">
        <Button
          onClick={handleBrewToday}
          disabled={hasBrewedToday}
          className={`w-full py-6 text-lg font-semibold transition-all duration-200 ${
            hasBrewedToday
              ? 'bg-green-100 text-green-700 border border-green-300 cursor-not-allowed'
              : 'bg-gradient-to-r from-amber-400 to-amber-600 hover:from-amber-500 hover:to-amber-700 text-white shadow-lg hover:shadow-xl'
          }`}
        >
          {hasBrewedToday ? (
            <div className="flex items-center justify-center space-x-2">
              <span>✅ Brewed Today</span>
            </div>
          ) : (
            <div className="flex items-center justify-center space-x-2">
              <Coffee className="w-5 h-5" />
              <span>Brew Today</span>
            </div>
          )}
        </Button>

        {hasBrewedToday && (
          <div className="text-center p-4 bg-amber-100 rounded-lg">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <Star className="w-5 h-5 text-amber-600" />
              <span className="font-semibold text-amber-800">+50 Aroma Points • Keep your streak alive!</span>
            </div>
            <p className="text-sm text-amber-700">
              Come back tomorrow to continue your brewing journey!
            </p>
          </div>
        )}

        {!hasBrewedToday && (
          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              Check back tomorrow to continue your streak!
            </p>
          </div>
        )}
      </div>
    </Card>
  );
};

export default DailyBrewStreak;
