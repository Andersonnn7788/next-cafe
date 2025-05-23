
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const CoffeeQuiz = () => {
  return (
    <Card className="p-6 bg-gradient-to-br from-coffee-light to-white">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-coffee-dark">Coffee Knowledge Quiz</h3>
        <span className="text-sm text-muted-foreground">Daily Challenge</span>
      </div>
      
      <div className="mb-4">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-muted-foreground">Today's Progress</span>
          <span className="text-coffee-dark font-medium">2/5 Questions</span>
        </div>
        <Progress value={40} className="h-2" />
      </div>
      
      <div className="bg-white rounded-lg p-4 border border-coffee-cream mb-4">
        <h4 className="font-medium text-coffee-dark mb-3">
          Which region is known for producing the highest quality Arabica beans?
        </h4>
        
        <div className="space-y-2">
          {['Ethiopia', 'Brazil', 'Colombia', 'Vietnam'].map((option, index) => (
            <Button
              key={index}
              variant="outline"
              className="w-full justify-start text-left hover:bg-coffee-cream/50"
              size="sm"
            >
              {String.fromCharCode(65 + index)}. {option}
            </Button>
          ))}
        </div>
      </div>
      
      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground">Complete to earn</span>
        <span className="text-coffee-gold font-medium">+100 Aroma Points</span>
      </div>
    </Card>
  );
};

export default CoffeeQuiz;
