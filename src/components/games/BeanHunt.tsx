import React, { useState, useEffect, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Star } from "lucide-react";

interface Bean {
  id: number;
  x: number;
  y: number;
  speed: number;
  type: 'regular' | 'golden' | 'dark';
  points: number;
}

interface LeaderboardEntry {
  score: number;
  date: string;
  game: string;
}

const BeanHunt = () => {
  const [gameActive, setGameActive] = useState(false);
  const [beans, setBeans] = useState<Bean[]>([]);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [basket, setBasket] = useState({ x: 50, width: 80 });
  const gameAreaRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>();
  const lastBeanTime = useRef(0);

  // Start the game
  const startGame = () => {
    setGameActive(true);
    setScore(0);
    setTimeLeft(30);
    setBeans([]);
    lastBeanTime.current = Date.now();
  };

  // End the game - wrapped in useCallback to prevent dependency issues
  const endGame = useCallback(() => {
    setGameActive(false);
    toast.success(`Game Over! You scored ${score} points!`);
    
    // Update leaderboard in localStorage
    const leaderboard: LeaderboardEntry[] = JSON.parse(localStorage.getItem('beanHuntLeaderboard') || '[]');
    leaderboard.push({
      score,
      date: new Date().toISOString(),
      game: 'Bean Hunt'
    });
    leaderboard.sort((a: LeaderboardEntry, b: LeaderboardEntry) => b.score - a.score);
    localStorage.setItem('beanHuntLeaderboard', JSON.stringify(leaderboard.slice(0, 10)));
  }, [score]);

  // Handle moving the basket with mouse/touch
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!gameAreaRef.current || !gameActive) return;
    
    const gameArea = gameAreaRef.current.getBoundingClientRect();
    const relativeX = e.clientX - gameArea.left;
    const newX = Math.max(0, Math.min(100, (relativeX / gameArea.width) * 100));
    
    setBasket(prev => ({ ...prev, x: newX - (prev.width / 2) }));
  };

  // Handle touch movement
  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!gameAreaRef.current || !gameActive) return;
    e.preventDefault();
    
    const touch = e.touches[0];
    const gameArea = gameAreaRef.current.getBoundingClientRect();
    const relativeX = touch.clientX - gameArea.left;
    const newX = Math.max(0, Math.min(100, (relativeX / gameArea.width) * 100));
    
    setBasket(prev => ({ ...prev, x: newX - (prev.width / 2) }));
  };

  // Game loop
  useEffect(() => {
    if (!gameActive) return;

    // Timer countdown
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          endGame();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // Animation frame for game loop
    const updateGame = () => {
      // Spawn new beans
      const now = Date.now();
      if (now - lastBeanTime.current > 600) {
        const beanType: ('regular' | 'golden' | 'dark') = 
          Math.random() < 0.1 ? 'golden' : Math.random() < 0.2 ? 'dark' : 'regular';
        
        const points = beanType === 'golden' ? 10 : beanType === 'dark' ? 5 : 2;
        
        setBeans(prev => [...prev, {
          id: Date.now(),
          x: Math.random() * 90 + 5, // Keep beans away from edges
          y: 0,
          speed: Math.random() * 2 + 1,
          type: beanType,
          points
        }]);
        lastBeanTime.current = now;
      }

      // Move beans
      setBeans(prev => {
        const updatedBeans = prev.map(bean => ({
          ...bean,
          y: bean.y + bean.speed
        }));

        // Check for collisions with basket
        const collidedBeans = updatedBeans.filter(bean => 
          bean.y > 85 && bean.y < 95 && // Bottom of screen
          bean.x > basket.x && bean.x < basket.x + basket.width // Within basket
        );

        // Update score based on collisions
        if (collidedBeans.length > 0) {
          const points = collidedBeans.reduce((sum, bean) => sum + bean.points, 0);
          setScore(prevScore => prevScore + points);
          toast(`+${points} points!`, {
            duration: 1000,
            position: "bottom-center"
          });
        }

        // Remove beans that are caught or out of bounds
        return updatedBeans.filter(bean => 
          !(bean.y > 85 && bean.y < 95 && bean.x > basket.x && bean.x < basket.x + basket.width) && 
          bean.y < 100
        );
      });

      animationRef.current = requestAnimationFrame(updateGame);
    };

    animationRef.current = requestAnimationFrame(updateGame);

    return () => {
      clearInterval(timer);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [gameActive, basket, endGame]);

  return (
    <div className="w-full h-full">
      {!gameActive ? (
        <div className="flex flex-col items-center justify-center h-full space-y-4 p-4">
          <div className="text-5xl mb-2">☕</div>
          <h2 className="text-xl font-semibold text-amber-900">Bean Hunt</h2>
          <p className="text-sm text-muted-foreground text-center">
            Catch falling coffee beans to earn points! Golden beans are worth more!
          </p>
          <Button
            onClick={startGame}
            className="bg-amber-600 hover:bg-amber-700 text-white mt-4"
          >
            Start Game
          </Button>
        </div>
      ) : (
        <div 
          ref={gameAreaRef} 
          className="relative w-full h-96 bg-amber-100 rounded-lg overflow-hidden cursor-none"
          onMouseMove={handleMouseMove}
          onTouchMove={handleTouchMove}
        >
          {/* Score and time */}
          <div className="absolute top-2 left-2 right-2 flex justify-between px-2 py-1 bg-amber-900/80 rounded-md text-white z-10">
            <div className="flex items-center">
              <Star className="w-4 h-4 text-amber-400 mr-1" />
              <span>{score}</span>
            </div>
            <div>Time: {timeLeft}s</div>
          </div>
          
          {/* Falling beans */}
          {beans.map(bean => (
            <div
              key={bean.id}
              className={`absolute w-6 h-6 flex items-center justify-center rounded-full transform -translate-x-1/2 -translate-y-1/2 
              ${bean.type === 'golden' ? 'text-yellow-400' : 
                 bean.type === 'dark' ? 'text-amber-900' : 'text-amber-800'}`}
              style={{
                left: `${bean.x}%`,
                top: `${bean.y}%`
              }}
            >
              <span className="text-lg" role="img" aria-label="coffee bean">☕</span>
            </div>
          ))}
          
          {/* Basket */}
          <div 
            className="absolute bottom-0 h-8 bg-amber-600 rounded-t-lg border-t-2 border-x-2 border-amber-800"
            style={{
              left: `${basket.x}%`,
              width: `${basket.width}%`
            }}
          ></div>
        </div>
      )}
    </div>
  );
};

export default BeanHunt;
