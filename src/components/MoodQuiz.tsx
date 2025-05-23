import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";

type Mood = 'energetic' | 'relaxed' | 'focused' | 'creative' | 'tired';

interface Question {
  id: number;
  text: string;
  options: {
    text: string;
    mood: Mood;
  }[];
}

interface CoffeeRecommendation {
  mood: Mood;
  emoji: string;
  title: string;
  description: string;
  characteristics: string[];
}

const questions: Question[] = [
  {
    id: 1,
    text: "How are you feeling this morning?",
    options: [
      { text: "Ready to take on the world!", mood: "energetic" },
      { text: "Calm and peaceful", mood: "relaxed" },
      { text: "I have a lot of work to do", mood: "focused" },
      { text: "Inspired and imaginative", mood: "creative" },
      { text: "I need a pick-me-up", mood: "tired" }
    ]
  },
  {
    id: 2,
    text: "What's your ideal activity right now?",
    options: [
      { text: "A workout or outdoor activity", mood: "energetic" },
      { text: "Reading a book or meditating", mood: "relaxed" },
      { text: "Working on an important project", mood: "focused" },
      { text: "Brainstorming new ideas", mood: "creative" },
      { text: "Taking a nap", mood: "tired" }
    ]
  },
  {
    id: 3,
    text: "Which environment do you prefer today?",
    options: [
      { text: "Bright and lively spaces", mood: "energetic" },
      { text: "Quiet and cozy corner", mood: "relaxed" },
      { text: "Clean, organized workspace", mood: "focused" },
      { text: "Colorful, inspiring surroundings", mood: "creative" },
      { text: "Comfort of your own space", mood: "tired" }
    ]
  },
  {
    id: 4,
    text: "What kind of music fits your current mood?",
    options: [
      { text: "Upbeat and energetic", mood: "energetic" },
      { text: "Soft instrumental or nature sounds", mood: "relaxed" },
      { text: "None - I need silence to concentrate", mood: "focused" },
      { text: "Eclectic and inspiring", mood: "creative" },
      { text: "Something soothing and comfortable", mood: "tired" }
    ]
  },
  {
    id: 5,
    text: "What's your primary goal for today?",
    options: [
      { text: "Accomplish as much as possible", mood: "energetic" },
      { text: "Find balance and stay calm", mood: "relaxed" },
      { text: "Complete specific important tasks", mood: "focused" },
      { text: "Express yourself or learn something new", mood: "creative" },
      { text: "Get through the day one step at a time", mood: "tired" }
    ]
  }
];

const coffeeRecommendations: Record<Mood, CoffeeRecommendation> = {
  energetic: {
    mood: "energetic",
    emoji: "💪",
    title: "NESCAFÉ Espresso Bold",
    description: "A strong, bold espresso to match your energy and help you make the most of your day.",
    characteristics: ["Bold", "Energetic", "Intense"]
  },
  relaxed: {
    mood: "relaxed",
    emoji: "😌",
    title: "NESCAFÉ Smooth Latte",
    description: "A creamy, soothing latte that complements your calm state while providing gentle warmth.",
    characteristics: ["Smooth", "Comforting", "Balanced"]
  },
  focused: {
    mood: "focused",
    emoji: "🎯",
    title: "NESCAFÉ Gold Blend",
    description: "A perfectly balanced medium roast to enhance your concentration without overwhelming.",
    characteristics: ["Precise", "Clear", "Dependable"]
  },
  creative: {
    mood: "creative",
    emoji: "🎨",
    title: "NESCAFÉ Caramel Macchiato",
    description: "A flavorful and inspiring blend to fuel your creative thinking and imagination.",
    characteristics: ["Surprising", "Uplifting", "Multi-layered"]
  },
  tired: {
    mood: "tired",
    emoji: "😴",
    title: "NESCAFÉ Double Shot",
    description: "A strong double shot of coffee to help you overcome tiredness and regain your energy.",
    characteristics: ["Revitalizing", "Strong", "Effective"]
  }
};

const MoodQuiz = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Mood[]>([]);
  const [result, setResult] = useState<CoffeeRecommendation | null>(null);
  const [showingResult, setShowingResult] = useState(false);

  const handleAnswer = (mood: Mood) => {
    const newAnswers = [...answers, mood];
    setAnswers(newAnswers);
    
    if (currentQuestionIndex + 1 >= questions.length) {
      // Quiz complete - determine result
      const moodCounts: Record<Mood, number> = {
        energetic: 0,
        relaxed: 0,
        focused: 0,
        creative: 0,
        tired: 0
      };
      
      newAnswers.forEach(mood => {
        moodCounts[mood]++;
      });
      
      // Find dominant mood
      const dominantMood = Object.entries(moodCounts).reduce(
        (acc, [mood, count]) => (count > acc.count ? { mood: mood as Mood, count } : acc),
        { mood: 'relaxed' as Mood, count: 0 }
      ).mood;
      
      // Set result and save to local storage
      setResult(coffeeRecommendations[dominantMood]);
      setShowingResult(true);
      
      // Save to localStorage
      localStorage.setItem('currentMood', dominantMood);
      localStorage.setItem('lastQuizDate', new Date().toISOString());
      
      toast.success("Quiz completed! Your coffee match has been found!");
    } else {
      // Move to next question
      setCurrentQuestionIndex(prevIndex => prevIndex + 1);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setResult(null);
    setShowingResult(false);
  };

  return (
    <Card className="p-6 bg-gradient-to-br from-amber-50 to-white">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-amber-900">Coffee Mood Quiz</h3>
        <span className="text-sm text-muted-foreground">Personalized Match</span>
      </div>
      
      {!showingResult ? (
        <>
          <div className="mb-4">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-muted-foreground">Progress</span>
              <span className="text-amber-900 font-medium">
                {currentQuestionIndex + 1}/{questions.length} Questions
              </span>
            </div>
            <Progress 
              value={((currentQuestionIndex + 1) / questions.length) * 100} 
              className="h-2" 
            />
          </div>
          
          <div className="bg-white rounded-lg p-4 border border-amber-200 mb-4">
            <h4 className="font-medium text-amber-900 mb-3">
              {questions[currentQuestionIndex].text}
            </h4>
            
            <div className="space-y-2">
              {questions[currentQuestionIndex].options.map((option, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="w-full justify-start text-left hover:bg-amber-50"
                  size="sm"
                  onClick={() => handleAnswer(option.mood)}
                >
                  {option.text}
                </Button>
              ))}
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="bg-white/50 rounded-lg p-4 mb-4">
            <div className="flex items-center space-x-2 mb-3">
              <span className="text-2xl">{result?.emoji}</span>
              <div>
                <p className="font-medium text-amber-900">Feeling {result?.mood}</p>
                <p className="text-sm text-muted-foreground">Perfect match found</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white/70 rounded-lg p-4 mb-4">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-12 h-12 bg-gradient-to-br from-amber-600 to-amber-800 rounded-full flex items-center justify-center">
                <span className="text-white text-xl">☕</span>
              </div>
              <div>
                <h4 className="font-semibold text-amber-900">{result?.title}</h4>
                <p className="text-sm text-muted-foreground">{result?.description}</p>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2 mb-3">
              {result?.characteristics.map((trait, index) => (
                <span 
                  key={index} 
                  className="px-2 py-1 bg-amber-100 rounded-full text-xs"
                >
                  {trait}
                </span>
              ))}
            </div>
            
            <Button 
              size="sm" 
              className="w-full bg-amber-600 hover:bg-amber-700 text-white mt-2"
            >
              Try This Recipe (+25 Points)
            </Button>
          </div>
          
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full"
            onClick={resetQuiz}
          >
            Retake Quiz
          </Button>
        </>
      )}
    </Card>
  );
};

export default MoodQuiz;
