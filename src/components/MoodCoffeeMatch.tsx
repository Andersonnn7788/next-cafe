
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const MoodCoffeeMatch = () => {
  return (
    <Card className="p-6 cream-gradient border-coffee-cream">
      <h3 className="text-lg font-semibold text-coffee-dark mb-4">Today's Mood Match</h3>
      
      <div className="mb-4">
        <div className="flex items-center space-x-2 mb-3">
          <span className="text-2xl">😊</span>
          <div>
            <p className="font-medium text-coffee-dark">Feeling Energetic</p>
            <p className="text-sm text-muted-foreground">Perfect for a bold coffee experience</p>
          </div>
        </div>
      </div>
      
      <div className="bg-white/50 rounded-lg p-4 mb-4">
        <div className="flex items-center space-x-3 mb-3">
          <div className="w-12 h-12 bg-coffee-gradient rounded-full flex items-center justify-center">
            <span className="text-white text-xl">☕</span>
          </div>
          <div>
            <h4 className="font-semibold text-coffee-dark">NESCAFÉ Gold Espresso</h4>
            <p className="text-sm text-muted-foreground">Bold, rich, and energizing</p>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-3">
          <Badge variant="secondary" className="text-xs">Bold</Badge>
          <Badge variant="secondary" className="text-xs">Energizing</Badge>
          <Badge variant="secondary" className="text-xs">Morning Boost</Badge>
        </div>
        
        <Button size="sm" className="w-full bg-coffee-gold hover:bg-coffee-gold/90 text-coffee-dark">
          Try This Recipe (+25 Points)
        </Button>
      </div>
      
      <Button variant="outline" size="sm" className="w-full">
        Retake Mood Quiz
      </Button>
    </Card>
  );
};

export default MoodCoffeeMatch;
