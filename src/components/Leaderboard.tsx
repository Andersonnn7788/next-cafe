import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Trophy, Medal, Star } from "lucide-react";
import { format } from "date-fns";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface LeaderboardEntry {
  username: string;
  avatar: string;
  aromaPoints: number;
  level: number;
  streak: number;
  achievements: number;
  lastActive: string;
}

// Generate demo leaderboard data based on aroma points
const generateAromaPointsLeaderboard = (): LeaderboardEntry[] => {
  const demoUsers = [
    { name: "You", avatar: "👤", points: 1250, level: 12, streak: 7, achievements: 8 },
    { name: "CoffeeExplorer", avatar: "☕", points: 2180, level: 18, streak: 15, achievements: 12 },
    { name: "LatteLover", avatar: "🥛", points: 1980, level: 16, streak: 12, achievements: 10 },
    { name: "EspressoPro", avatar: "🧋", points: 1750, level: 14, streak: 9, achievements: 11 },
    { name: "BeanMaster", avatar: "🍵", points: 1650, level: 13, streak: 18, achievements: 9 },
    { name: "AmericanoFan", avatar: "🥤", points: 1420, level: 11, streak: 5, achievements: 7 },
    { name: "BrewNinja", avatar: "🫖", points: 1320, level: 10, streak: 8, achievements: 6 },
    { name: "MochaQueen", avatar: "🧉", points: 1180, level: 9, streak: 4, achievements: 5 },
    { name: "FrappeFan", avatar: "🥤", points: 980, level: 8, streak: 3, achievements: 4 },
    { name: "ColdBrewKing", avatar: "☕", points: 850, level: 7, streak: 2, achievements: 3 }
  ];

  return demoUsers.map((user, index) => ({
    username: user.name,
    avatar: user.avatar,
    aromaPoints: user.points,
    level: user.level,
    streak: user.streak,
    achievements: user.achievements,
    lastActive: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString()
  })).sort((a, b) => b.aromaPoints - a.aromaPoints);
};

const Leaderboard = () => {
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardEntry[]>([]);

  useEffect(() => {
    setLeaderboardData(generateAromaPointsLeaderboard());
  }, []);

  const getRankDisplay = (index: number, entry: LeaderboardEntry) => {
    const isCurrentUser = entry.username === "You";
    
    switch (index) {
      case 0: 
        return (
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center">
              <Trophy className="w-4 h-4 text-yellow-900" />
            </div>
            <span className="font-bold text-yellow-600">1st</span>
          </div>
        );
      case 1: 
        return (
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-gray-300 to-gray-500 rounded-full flex items-center justify-center">
              <Medal className="w-4 h-4 text-gray-700" />
            </div>
            <span className="font-bold text-gray-600">2nd</span>
          </div>
        );
      case 2: 
        return (
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-amber-400 to-amber-600 rounded-full flex items-center justify-center">
              <Medal className="w-4 h-4 text-amber-800" />
            </div>
            <span className="font-bold text-amber-700">3rd</span>
          </div>
        );
      default: 
        return (
          <div className="flex items-center space-x-2">
            <div className={`w-8 h-8 ${isCurrentUser ? 'bg-amber-100 border-2 border-amber-400' : 'bg-gray-100'} rounded-full flex items-center justify-center`}>
              <span className={`text-sm font-semibold ${isCurrentUser ? 'text-amber-700' : 'text-gray-600'}`}>
                #{index + 1}
              </span>
            </div>
          </div>
        );
    }
  };

  const getLevelBadge = (level: number) => {
    if (level >= 15) return { color: 'bg-purple-500', text: 'text-white', label: 'Master' };
    if (level >= 10) return { color: 'bg-amber-500', text: 'text-white', label: 'Expert' };
    if (level >= 5) return { color: 'bg-blue-500', text: 'text-white', label: 'Pro' };
    return { color: 'bg-green-500', text: 'text-white', label: 'Novice' };
  };

  return (
    <Card className="p-6 bg-gradient-to-br from-amber-50 to-white">
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-2 bg-gradient-to-r from-amber-400 to-amber-600 rounded-lg">
          <Trophy className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-amber-900">Aroma Points Leaderboard</h3>
          <p className="text-sm text-muted-foreground">Top coffee explorers this month</p>
        </div>
      </div>
      
      <div className="space-y-3">
        {leaderboardData.map((entry, index) => {
          const isCurrentUser = entry.username === "You";
          const levelBadge = getLevelBadge(entry.level);
          
          return (
            <div 
              key={index} 
              className={`p-4 rounded-lg border transition-all hover:shadow-md ${
                isCurrentUser 
                  ? 'bg-amber-50 border-amber-200 shadow-md' 
                  : 'bg-white border-gray-200 hover:border-amber-200'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  {getRankDisplay(index, entry)}
                  
                  <div className="flex items-center space-x-3">
                    <Avatar className="w-10 h-10">
                      <AvatarFallback className="text-lg">{entry.avatar}</AvatarFallback>
                    </Avatar>
                    
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className={`font-semibold ${isCurrentUser ? 'text-amber-800' : 'text-gray-800'}`}>
                          {entry.username}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${levelBadge.color} ${levelBadge.text}`}>
                          Lv.{entry.level} {levelBadge.label}
                        </span>
                      </div>
                      
                      <div className="flex items-center space-x-4 text-xs text-muted-foreground mt-1">
                        <span>🔥 {entry.streak} day streak</span>
                        <span>🏆 {entry.achievements} achievements</span>
                        <span>⏰ {format(new Date(entry.lastActive), "MMM d")}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-amber-500" />
                    <span className="text-xl font-bold text-amber-700">
                      {entry.aromaPoints.toLocaleString()}
                    </span>
                  </div>
                  <span className="text-xs text-muted-foreground">Aroma Points</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="mt-6 pt-4 border-t border-amber-200">
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            Earn more points by completing daily challenges, quizzes, and games!
          </p>
        </div>
      </div>
    </Card>
  );
};

export default Leaderboard;
