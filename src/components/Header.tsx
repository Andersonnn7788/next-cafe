
import { Coffee, Bell, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="bg-card/80 backdrop-blur-sm border-b border-border/50 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-coffee-gradient rounded-xl">
              <Coffee className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-display font-bold text-coffee-dark">NESCAFÉ</h1>
              <p className="text-xs text-muted-foreground">Your Coffee Journey</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 bg-coffee-light px-3 py-2 rounded-full">
              <Star className="w-4 h-4 text-coffee-gold" />
              <span className="text-sm font-semibold text-coffee-dark">1,250</span>
              <span className="text-xs text-muted-foreground">Aroma Points</span>
            </div>
            
            <Button variant="ghost" size="sm" className="relative">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full"></span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
