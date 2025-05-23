import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Card } from "@/components/ui/card";

interface PodCard {
  id: number;
  type: string;
  emoji: string;
  flipped: boolean;
  matched: boolean;
}

interface LeaderboardEntry {
  score: number;
  moves: number;
  timeLeft: number;
  date: string;
  game: string;
}

const podTypes = [
  { type: "espresso", emoji: "☕" },
  { type: "latte", emoji: "🥛" },
  { type: "americano", emoji: "💧" },
  { type: "cappuccino", emoji: "🌟" },
  { type: "mocha", emoji: "🍫" },
  { type: "macchiato", emoji: "🍮" }
];

const PodMatch = () => {
  const [cards, setCards] = useState<PodCard[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [gameActive, setGameActive] = useState(false);
  const [moves, setMoves] = useState(0);
  const [matchedPairs, setMatchedPairs] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);

  // Initialize game
  const initializeGame = () => {
    // Get 6 pod types and duplicate them to create pairs
    const gamePods = podTypes.slice(0, 6);
    const newCards: PodCard[] = [];
    
    // Create pairs of pods
    gamePods.forEach((pod, index) => {
      // Create two cards for each pod type
      const card1: PodCard = { 
        id: index * 2, 
        type: pod.type, 
        emoji: pod.emoji, 
        flipped: false, 
        matched: false 
      };
      
      const card2: PodCard = { 
        id: index * 2 + 1, 
        type: pod.type, 
        emoji: pod.emoji, 
        flipped: false, 
        matched: false 
      };
      
      newCards.push(card1, card2);
    });
    
    // Shuffle the cards
    for (let i = newCards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newCards[i], newCards[j]] = [newCards[j], newCards[i]];
    }
    
    setCards(newCards);
    setMoves(0);
    setMatchedPairs(0);
    setTimeLeft(60);
    setFlippedCards([]);
    setGameActive(true);
  };

  // Handle card click
  const handleCardClick = (id: number) => {
    if (!gameActive) return;
    
    // Ignore if already flipped or matched
    const clickedCard = cards.find(card => card.id === id);
    if (!clickedCard || clickedCard.flipped || clickedCard.matched) {
      return;
    }
    
    // Don't allow more than 2 cards to be flipped at once
    if (flippedCards.length >= 2) {
      return;
    }
    
    // Flip the card
    setCards(cards.map(card => 
      card.id === id ? { ...card, flipped: true } : card
    ));
    
    setFlippedCards([...flippedCards, id]);
  };

  // Check for matches when two cards are flipped
  useEffect(() => {
    if (flippedCards.length === 2) {
      setMoves(moves => moves + 1);
      
      const [firstId, secondId] = flippedCards;
      const firstCard = cards.find(card => card.id === firstId);
      const secondCard = cards.find(card => card.id === secondId);
      
      if (firstCard && secondCard && firstCard.type === secondCard.type) {
        // Match found
        setMatchedPairs(matchedPairs => matchedPairs + 1);
        setCards(cards.map(card => 
          card.id === firstId || card.id === secondId
            ? { ...card, matched: true }
            : card
        ));
        setFlippedCards([]);
        
        toast(`Match found! +5 points`, {
          position: "bottom-center",
          duration: 1000
        });
      } else {
        // No match, flip cards back after delay
        setTimeout(() => {
          setCards(cards.map(card => 
            card.id === firstId || card.id === secondId
              ? { ...card, flipped: false }
              : card
          ));
          setFlippedCards([]);
        }, 1000);
      }
    }
  }, [flippedCards.length, cards, moves, matchedPairs]);

  // Check for game completion
  useEffect(() => {
    if (gameActive && matchedPairs === 6) {
      // Calculate score based on moves and time left
      const score = Math.max(0, 100 - (moves * 3) + (timeLeft * 2));
      
      toast.success(`Game Complete! You scored ${score} points!`);
      setGameActive(false);
      
      // Save to leaderboard
      const leaderboard: LeaderboardEntry[] = JSON.parse(localStorage.getItem('podMatchLeaderboard') || '[]');
      leaderboard.push({
        score,
        moves,
        timeLeft,
        date: new Date().toISOString(),
        game: 'Pod Match'
      });
      leaderboard.sort((a: LeaderboardEntry, b: LeaderboardEntry) => b.score - a.score);
      localStorage.setItem('podMatchLeaderboard', JSON.stringify(leaderboard.slice(0, 10)));
    }
  }, [matchedPairs, gameActive, moves, timeLeft]);

  // Timer countdown
  useEffect(() => {
    if (!gameActive || timeLeft <= 0) return;
    
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          toast.error("Time's up!");
          setGameActive(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, [gameActive, timeLeft]);

  return (
    <div className="w-full h-full">
      {!gameActive ? (
        <div className="flex flex-col items-center justify-center h-full space-y-4 p-4">
          <div className="text-5xl mb-2">🧩</div>
          <h2 className="text-xl font-semibold text-amber-900">Pod Match</h2>
          <p className="text-sm text-muted-foreground text-center">
            Match pairs of coffee pods to earn points! Faster matches give higher scores.
          </p>
          <Button
            onClick={initializeGame}
            className="bg-amber-600 hover:bg-amber-700 text-white mt-4"
          >
            Start Game
          </Button>
        </div>
      ) : (
        <div className="w-full">
          {/* Game info */}
          <div className="flex justify-between mb-4 px-2 py-1 bg-amber-100 rounded-md">
            <div>Moves: {moves}</div>
            <div>Pairs: {matchedPairs}/6</div>
            <div>Time: {timeLeft}s</div>
          </div>
          
          {/* Game board */}
          <div className="grid grid-cols-3 gap-2">
            {cards.map(card => (
              <Card
                key={card.id}
                onClick={() => handleCardClick(card.id)}
                className={`aspect-square flex items-center justify-center text-3xl cursor-pointer transition-all transform ${
                  card.flipped || card.matched ? 'bg-amber-100' : 'bg-amber-800'
                } ${
                  card.matched ? 'opacity-70' : 'opacity-100'
                } hover:scale-[1.02]`}
              >
                {card.flipped || card.matched ? card.emoji : ''}
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PodMatch;
