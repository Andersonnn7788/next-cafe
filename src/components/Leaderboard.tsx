import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Trophy, Medal } from "lucide-react";
import { format } from "date-fns";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface LeaderboardEntry {
  score: number;
  date: string;
  game: string;
  moves?: number;
  timeLeft?: number;
  question?: number;
  username?: string;
  avatar?: string;
}

// Generate some fake user data for a more populated leaderboard
const demoUsernames = ["CoffeeExplorer", "LatteLover", "EspressoPro", "BeanMaster", "AmericanoFan", "BrewNinja"];
const demoAvatars = ["☕", "🧋", "🥤", "🧉", "🍵", "🫖"];

const generateRandomEntries = (game: string, count: number): LeaderboardEntry[] => {
  const entries: LeaderboardEntry[] = [];
  
  for (let i = 0; i < count; i++) {
    const username = demoUsernames[Math.floor(Math.random() * demoUsernames.length)];
    const avatar = demoAvatars[Math.floor(Math.random() * demoAvatars.length)];
    const date = new Date();
    date.setDate(date.getDate() - Math.floor(Math.random() * 10));
    
    let entry: LeaderboardEntry = {
      score: Math.floor(Math.random() * 100) + 50,
      date: date.toISOString(),
      game,
      username,
      avatar
    };
    
    if (game === "pod-match") {
      entry.moves = Math.floor(Math.random() * 20) + 10;
      entry.timeLeft = Math.floor(Math.random() * 30) + 10;
    } else if (game === "coffee-quiz") {
      entry.question = Math.floor(Math.random() * 5) + 1;
    }
    
    entries.push(entry);
  }
  
  return entries.sort((a, b) => b.score - a.score);
};

const mergeAndSortEntries = (userEntries: LeaderboardEntry[], demoEntries: LeaderboardEntry[]): LeaderboardEntry[] => {
  // Mark user entries with "You" username for highlighting
  const processedUserEntries = userEntries.map(entry => ({
    ...entry,
    username: "You",
    avatar: "👤"
  }));
  
  // Combine and sort by score
  const allEntries = [...processedUserEntries, ...demoEntries];
  return allEntries.sort((a, b) => b.score - a.score).slice(0, 10);
};

const Leaderboard = () => {
  const [activeTab, setActiveTab] = useState("bean-hunt");
  const [beanHuntEntries, setBeanHuntEntries] = useState<LeaderboardEntry[]>([]);
  const [podMatchEntries, setPodMatchEntries] = useState<LeaderboardEntry[]>([]);
  const [brewMasterEntries, setBrewMasterEntries] = useState<LeaderboardEntry[]>([]);
  const [coffeeQuizEntries, setCoffeeQuizEntries] = useState<LeaderboardEntry[]>([]);

  // Load leaderboard entries from localStorage
  useEffect(() => {
    const loadLeaderboards = () => {
      const beanHuntSaved = JSON.parse(localStorage.getItem("beanHuntLeaderboard") || "[]");
      const podMatchSaved = JSON.parse(localStorage.getItem("podMatchLeaderboard") || "[]");
      const brewMasterSaved = JSON.parse(localStorage.getItem("brewMasterLeaderboard") || "[]");
      const coffeeQuizSaved = JSON.parse(localStorage.getItem("coffeeQuizLeaderboard") || "[]");
      
      // Generate demo data for each game
      const beanHuntDemo = generateRandomEntries("Bean Hunt", 8);
      const podMatchDemo = generateRandomEntries("Pod Match", 8);
      const brewMasterDemo = generateRandomEntries("Brew Master", 8);
      const coffeeQuizDemo = generateRandomEntries("Coffee Quiz", 8);
      
      // Merge real and demo data
      setBeanHuntEntries(mergeAndSortEntries(beanHuntSaved, beanHuntDemo));
      setPodMatchEntries(mergeAndSortEntries(podMatchSaved, podMatchDemo));
      setBrewMasterEntries(mergeAndSortEntries(brewMasterSaved, brewMasterDemo));
      setCoffeeQuizEntries(mergeAndSortEntries(coffeeQuizSaved, coffeeQuizDemo));
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
      case "coffee-quiz":
        return coffeeQuizEntries;
      default:
        return [];
    }
  };

  const getRankLabel = (index: number) => {
    switch (index) {
      case 0: return <span className="flex items-center text-yellow-500 font-bold"><Medal className="w-4 h-4 mr-1 fill-yellow-500 stroke-yellow-700" />1st</span>;
      case 1: return <span className="flex items-center text-gray-400 font-bold"><Medal className="w-4 h-4 mr-1 fill-gray-300 stroke-gray-500" />2nd</span>;
      case 2: return <span className="flex items-center text-amber-700 font-bold"><Medal className="w-4 h-4 mr-1 fill-amber-600 stroke-amber-800" />3rd</span>;
      default: return <span className="text-muted-foreground">{index + 1}th</span>;
    }
  };

  const games = ["bean-hunt", "pod-match", "brew-master", "coffee-quiz"];

  return (
    <Card className="p-6">
      <div className="flex items-center space-x-3 mb-4">
        <Trophy className="w-6 h-6 text-amber-600" />
        <h3 className="text-lg font-semibold text-amber-900">Leaderboard</h3>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2 mb-4">
          <TabsTrigger value="bean-hunt">Bean Hunt</TabsTrigger>
          <TabsTrigger value="pod-match">Pod Match</TabsTrigger>
        </TabsList>
        <TabsList className="grid w-full grid-cols-2 mb-4">
          <TabsTrigger value="brew-master">Brew Master</TabsTrigger>
          <TabsTrigger value="coffee-quiz">Coffee Quiz</TabsTrigger>
        </TabsList>
        
        {games.map(game => (
          <TabsContent key={game} value={game}>
            <div className="max-h-[300px] overflow-y-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-10">Rank</TableHead>
                    <TableHead>Player</TableHead>
                    <TableHead>Score</TableHead>
                    {game === "pod-match" && <TableHead>Moves</TableHead>}
                    {game === "pod-match" && <TableHead>Time Left</TableHead>}
                    {game === "coffee-quiz" && <TableHead>Question</TableHead>}
                    <TableHead className="text-right">Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {getEntriesForActiveTab().length > 0 ?
                    getEntriesForActiveTab().map((entry, index) => (
                      <TableRow key={index} className={entry.username === "You" ? "bg-amber-50" : ""}>
                        <TableCell>
                          {getRankLabel(index)}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Avatar className="w-6 h-6">
                              <AvatarFallback>{entry.avatar || "👤"}</AvatarFallback>
                            </Avatar>
                            <span className={entry.username === "You" ? "font-medium" : ""}>
                              {entry.username || "Player"}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className="font-semibold">{entry.score}</TableCell>
                        {game === "pod-match" && (
                          <TableCell>{entry.moves || "-"}</TableCell>
                        )}
                        {game === "pod-match" && (
                          <TableCell>{entry.timeLeft || "-"}s</TableCell>
                        )}
                        {game === "coffee-quiz" && (
                          <TableCell>{entry.question || "-"}</TableCell>
                        )}
                        <TableCell className="text-right text-muted-foreground text-sm">
                          {format(new Date(entry.date), "MMM d")}
                        </TableCell>
                      </TableRow>
                    ))
                  : (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center text-muted-foreground">
                        No entries yet. Play a game to get on the leaderboard!
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
