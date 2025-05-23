
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const MiniGames = () => {
  const games = [
    {
      title: "Bean Hunt",
      description: "Catch falling coffee beans!",
      emoji: "🫘",
      reward: "+15 Points",
      difficulty: "Easy",
      playTime: "2 min"
    },
    {
      title: "Pod Match",
      description: "Match coffee pod pairs",
      emoji: "🧩",
      reward: "+20 Points",
      difficulty: "Medium",
      playTime: "3 min"
    },
    {
      title: "Brew Master",
      description: "Perfect the brewing process",
      emoji: "⚡",
      reward: "+30 Points",
      difficulty: "Hard",
      playTime: "5 min"
    }
  ];

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold text-coffee-dark mb-4">Daily Mini-Games</h3>
      
      <div className="space-y-3">
        {games.map((game, index) => (
          <div key={index} className="bg-muted/50 rounded-lg p-4 hover:bg-muted/70 transition-colors">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">{game.emoji}</span>
                <div>
                  <h4 className="font-medium text-coffee-dark">{game.title}</h4>
                  <p className="text-sm text-muted-foreground">{game.description}</p>
                </div>
              </div>
              <Button size="sm" className="bg-accent hover:bg-accent/90">
                Play
              </Button>
            </div>
            
            <div className="flex items-center justify-between text-xs">
              <div className="flex space-x-2">
                <Badge variant="outline" className="text-xs">{game.difficulty}</Badge>
                <Badge variant="outline" className="text-xs">{game.playTime}</Badge>
              </div>
              <span className="text-coffee-gold font-medium">{game.reward}</span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default MiniGames;
