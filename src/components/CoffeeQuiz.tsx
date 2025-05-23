
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";

interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const coffeeQuizQuestions: QuizQuestion[] = [
  {
    question: "Which region is known for producing the highest quality Arabica beans?",
    options: ["Ethiopia", "Brazil", "Colombia", "Vietnam"],
    correctAnswer: 0,
    explanation: "Ethiopia is considered the birthplace of coffee and is known for producing exceptional Arabica beans with complex, floral flavors."
  },
  {
    question: "What does 'espresso' refer to in coffee making?",
    options: ["Bean type", "Brewing method", "Roast level", "Origin country"],
    correctAnswer: 1,
    explanation: "Espresso refers to a brewing method where hot water is forced through finely-ground coffee beans under pressure."
  },
  {
    question: "Which coffee brewing method uses immersion followed by filtration?",
    options: ["Drip", "French Press", "Espresso", "Siphon"],
    correctAnswer: 1,
    explanation: "French Press brewing involves steeping ground coffee in hot water (immersion) and then pressing a metal filter to separate the grounds."
  },
  {
    question: "What is the ideal water temperature for brewing coffee?",
    options: ["85-90°C", "90-96°C", "97-100°C", "80-85°C"],
    correctAnswer: 1,
    explanation: "The ideal water temperature for brewing coffee is between 90-96°C (195-205°F), as this extracts optimal flavors without burning the coffee."
  },
  {
    question: "Which of these is NOT a coffee processing method?",
    options: ["Washed", "Natural", "Honey", "Roasted"],
    correctAnswer: 3,
    explanation: "Roasting is not a processing method but a step that comes after processing. The main processing methods are washed, natural, and honey."
  }
];

const CoffeeQuiz = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [todayProgress, setTodayProgress] = useState(() => {
    const saved = localStorage.getItem("coffeeQuizProgress");
    if (saved) {
      const progress = JSON.parse(saved);
      if (progress.date === new Date().toDateString()) {
        return progress.questionsAnswered;
      }
    }
    return 0;
  });

  useEffect(() => {
    if (todayProgress === coffeeQuizQuestions.length && !quizCompleted) {
      setQuizCompleted(true);
    }
  }, [todayProgress, quizCompleted]);

  const handleOptionSelect = (optionIndex: number) => {
    if (isAnswered) return;
    
    setSelectedOption(optionIndex);
    setIsAnswered(true);
    
    const currentQuestion = coffeeQuizQuestions[currentQuestionIndex];
    const isCorrect = optionIndex === currentQuestion.correctAnswer;
    
    if (isCorrect) {
      setScore(score + 20);
      toast.success("Correct answer! +20 points", { duration: 2000 });
    } else {
      toast.error("Not quite right. Try again tomorrow!", { duration: 2000 });
    }
    
    setShowExplanation(true);

    // Save progress
    const newProgress = todayProgress < coffeeQuizQuestions.length ? todayProgress + 1 : todayProgress;
    setTodayProgress(newProgress);
    localStorage.setItem("coffeeQuizProgress", JSON.stringify({
      date: new Date().toDateString(),
      questionsAnswered: newProgress
    }));

    // Save score to leaderboard
    if (isCorrect) {
      const quizLeaderboard = JSON.parse(localStorage.getItem("coffeeQuizLeaderboard") || "[]");
      quizLeaderboard.push({
        score: 20,
        date: new Date().toISOString(),
        game: "Coffee Quiz",
        question: currentQuestionIndex + 1
      });
      localStorage.setItem("coffeeQuizLeaderboard", JSON.stringify(quizLeaderboard));
    }

    // Move to next question after delay
    setTimeout(() => {
      if (currentQuestionIndex < coffeeQuizQuestions.length - 1 && newProgress < coffeeQuizQuestions.length) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedOption(null);
        setIsAnswered(false);
        setShowExplanation(false);
      } else {
        setQuizCompleted(true);
        // Award completion bonus
        if (newProgress === coffeeQuizQuestions.length) {
          setScore(score + 40);
          toast.success("Quiz completed! +40 bonus points", { duration: 3000 });
        }
      }
    }, 3000);
  };

  const resetQuiz = () => {
    // This would typically be available the next day
    toast.info("The quiz resets daily. Come back tomorrow for new questions!");
  };

  const progressPercentage = (todayProgress / coffeeQuizQuestions.length) * 100;
  const currentQuestion = coffeeQuizQuestions[currentQuestionIndex];

  return (
    <Card className="p-6 bg-gradient-to-br from-coffee-light to-white">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-coffee-dark">Coffee Knowledge Quiz</h3>
        <span className="text-sm text-muted-foreground">Daily Challenge</span>
      </div>
      
      <div className="mb-4">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-muted-foreground">Today's Progress</span>
          <span className="text-coffee-dark font-medium">{todayProgress}/{coffeeQuizQuestions.length} Questions</span>
        </div>
        <Progress value={progressPercentage} className="h-2" />
      </div>
      
      {quizCompleted ? (
        <div className="bg-white rounded-lg p-6 border border-coffee-cream mb-4 text-center">
          <h4 className="font-medium text-coffee-dark mb-3">Quiz Completed!</h4>
          <p className="text-muted-foreground mb-4">You've answered all of today's coffee questions.</p>
          <Button 
            variant="outline" 
            className="w-full border-coffee-gold text-coffee-dark hover:bg-coffee-cream/20"
            onClick={resetQuiz}
          >
            Check Back Tomorrow
          </Button>
        </div>
      ) : (
        <div className="bg-white rounded-lg p-4 border border-coffee-cream mb-4">
          <h4 className="font-medium text-coffee-dark mb-3">
            {currentQuestion.question}
          </h4>
          
          <div className="space-y-2">
            {currentQuestion.options.map((option, index) => (
              <Button
                key={index}
                variant="outline"
                className={`w-full justify-start text-left ${
                  isAnswered && index === selectedOption
                    ? index === currentQuestion.correctAnswer
                      ? "bg-green-100 border-green-500 hover:bg-green-100"
                      : "bg-red-100 border-red-500 hover:bg-red-100"
                    : isAnswered && index === currentQuestion.correctAnswer
                    ? "bg-green-100 border-green-500 hover:bg-green-100"
                    : "hover:bg-coffee-cream/50"
                }`}
                size="sm"
                onClick={() => handleOptionSelect(index)}
                disabled={isAnswered}
              >
                {String.fromCharCode(65 + index)}. {option}
              </Button>
            ))}
          </div>
          
          {showExplanation && (
            <div className="mt-4 p-3 bg-coffee-cream/20 rounded text-sm">
              <p className="font-medium mb-1">Explanation:</p>
              <p>{currentQuestion.explanation}</p>
            </div>
          )}
        </div>
      )}
      
      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground">Your current score</span>
        <span className="text-coffee-gold font-medium">+{score} Aroma Points</span>
      </div>
    </Card>
  );
};

export default CoffeeQuiz;
