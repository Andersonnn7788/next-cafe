
import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Trophy } from "lucide-react";
import { format } from "date-fns";

interface LeaderboardEntry {
  score: number;
  date: string;
  game: string;
  moves?: number;
  timeLeft?: number;
}

const Leaderboard = () => {
  const [activeTab, setActiveTab] = useState("bean-hunt");
  const [beanHuntEntries, setBeanHuntEntries] = useState<LeaderboardEntry[]>([]);
  const [podMatchEntries, setPodMatchEntries] = useState<LeaderboardEntry[]>([]);
  const [brewMasterEntries, setBrewMasterEntries] = useState<LeaderboardEntry[]>([]);

  // Load leaderboard entries from localStorage
  useEffect(() => {
    const loadLeaderboards = () => {
      const beanHunt = JSON.parse(localStorage.getItem("beanHuntLeaderboard") || "[]");
      const podMatch = JSON.parse(localStorage.getItem("podMatchLeaderboard") || "[]");
      const brewMaster = JSON.parse(localStorage.getItem("brewMasterLeaderboard") || "[]");
      
      setBeanHuntEntries(beanHunt);
      setPodMatchEntries(podMatch);
      setBrewMasterEntries(brewMaster);
    };
    
    // Load on initial render
    loadLeaderboards();
    
    // Set up event listener for storage changes
    window.addEventListener("storage", loadLeaderboards);
    
    return () => {
      window.removeEventListener("storage", loadLeaderboards);
    };
  }, []);

  const getEntriesForActiveTab = () => {
    switch (activeTab) {
      case "bean-hunt":
        return beanHuntEntries;
      case "pod-match":
        return podMatchEntries;
      case "brew-master":
        return brewMasterEntries;
      default:
        return [];
    }
  };

  return (
    <Card className="p-6">
      <div className="flex items-center space-x-3 mb-6">
        <Trophy className="w-6 h-6 text-coffee-gold" />
        <h3 className="text-lg font-semibold text-coffee-dark">Leaderboard</h3>
      </div>
      
      <Tabs defaultValue="bean-hunt" onValueChange={setActiveTab}>
        <TabsList className="w-full mb-4">
          <TabsTrigger value="bean-hunt" className="flex-1">Bean Hunt</TabsTrigger>
          <TabsTrigger value="pod-match" className="flex-1">Pod Match</TabsTrigger>
          <TabsTrigger value="brew-master" className="flex-1">Brew Master</TabsTrigger>
        </TabsList>
        
        {["bean-hunt", "pod-match", "brew-master"].map(game => (
          <TabsContent key={game} value={game}>
            <div className="max-h-[300px] overflow-y-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-10">Rank</TableHead>
                    <TableHead>Score</TableHead>
                    {game === "pod-match" && <TableHead>Moves</TableHead>}
                    {game === "pod-match" && <TableHead>Time Left</TableHead>}
                    <TableHead>Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {getEntriesForActiveTab().length > 0 ? (
                    getEntriesForActiveTab().map((entry, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          {index === 0 ? (
                            <span className="text-yellow-500 font-bold">1st</span>
                          ) : index === 1 ? (
                            <span className="text-gray-400 font-bold">2nd</span>
                          ) : index === 2 ? (
                            <span className="text-amber-700 font-bold">3rd</span>
                          ) : (
                            `${index + 1}th`
                          )}
                        </TableCell>
                        <TableCell className="font-semibold">{entry.score}</TableCell>
                        {game === "pod-match" && (
                          <TableCell>{entry.moves}</TableCell>
                        )}
                        {game === "pod-match" && (
                          <TableCell>{entry.timeLeft}s</TableCell>
                        )}
                        <TableCell>
                          {format(new Date(entry.date), "MMM d, yyyy")}
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-4 text-muted-foreground">
                        No scores yet. Play a game to be the first on the leaderboard!
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </Card>
  );
};

export default Leaderboard;
