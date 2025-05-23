import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, Trophy, Clock } from "lucide-react";
import BeanHunt from "./games/BeanHunt";
import PodMatch from "./games/PodMatch";

const MiniGames = () => {
  const [activeGame, setActiveGame] = useState<string | null>(null);

  const games = [
    {
      id: "bean-hunt",
      title: "Bean Hunt",
      description: "Catch falling coffee beans to earn points!",
      difficulty: "Easy",
      time: "2 min",
      points: "+15 Points",
      icon: "☕",
      gradient: "from-amber-400 to-amber-600",
      component: BeanHunt
    },
    {
      id: "pod-match",
      title: "Pod Match",
      description: "Match coffee pod pairs",
      difficulty: "Medium",
      time: "3 min",
      points: "+20 Points",
      icon: "🧩",
      gradient: "from-green-400 to-green-600",
      component: PodMatch
    },
    {
      id: "brew-master",
      title: "Brew Master",
      description: "Perfect the brewing process",
      difficulty: "Hard",
      time: "5 min",
      points: "+30 Points",
      icon: "⚡",
      gradient: "from-blue-400 to-blue-600",
      component: () => <div className="text-center p-8 text-muted-foreground">Coming Soon!</div>
    }
  ];

  if (activeGame) {
    const game = games.find(g => g.id === activeGame);
    if (game) {
      const GameComponent = game.component;
      return (
        <Card className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-amber-900">{game.title}</h3>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setActiveGame(null)}
              className="text-amber-700 border-amber-300 hover:bg-amber-50"
            >
              Back to Games
            </Button>
          </div>
          <GameComponent />
        </Card>
      );
    }
  }

  return (
    <Card className="p-6 bg-gradient-to-br from-amber-50 to-white">
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-2 bg-gradient-to-r from-amber-400 to-amber-600 rounded-lg">
          <Trophy className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-amber-900">Daily Mini-Games</h3>
          <p className="text-sm text-muted-foreground">Play games to earn aroma points!</p>
        </div>
      </div>
      
      <div className="space-y-4">
        {games.map((game) => (
          <div
            key={game.id}
            className="group relative bg-white rounded-lg border border-gray-200 hover:border-amber-300 transition-all duration-200 hover:shadow-lg overflow-hidden"
          >
            <div className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  {/* Game Icon */}
                  <div className={`w-12 h-12 bg-gradient-to-r ${game.gradient} rounded-lg flex items-center justify-center text-white text-xl font-bold shadow-lg`}>
                    {game.icon}
                  </div>
                  
                  {/* Game Info */}
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className="font-semibold text-gray-800 group-hover:text-amber-700 transition-colors">
                        {game.title}
                      </h4>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        game.difficulty === 'Easy' ? 'bg-green-100 text-green-700' :
                        game.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {game.difficulty}
                      </span>
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-2">
                      {game.description}
                    </p>
                    
                    <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <Clock className="w-3 h-3" />
                        <span>{game.time}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Trophy className="w-3 h-3" />
                        <span className="text-amber-600 font-medium">{game.points}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Play Button */}
                <div className="ml-4">
                  <Button
                    onClick={() => setActiveGame(game.id)}
                    className={`bg-gradient-to-r ${game.gradient} hover:opacity-90 text-white shadow-lg hover:shadow-xl transition-all duration-200 px-6 py-2 font-semibold`}
                    size="lg"
                  >
                    <Play className="w-4 h-4 mr-2" />
                    Play Now
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Hover Accent */}
            <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${game.gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200`}></div>
          </div>
        ))}
      </div>
      
      <div className="mt-6 pt-4 border-t border-amber-200">
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            Complete daily games to boost your leaderboard ranking!
          </p>
        </div>
      </div>
    </Card>
  );
};

export default MiniGames;
