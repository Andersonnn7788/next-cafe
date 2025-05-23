
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const CoffeeAvatar = () => {
  return (
    <Card className="p-6 coffee-gradient text-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12"></div>
      
      <div className="relative z-10">
        <div className="flex items-center space-x-4 mb-4">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
            <span className="text-2xl">☕</span>
          </div>
          <div>
            <h3 className="text-xl font-display font-bold">Espresso Explorer</h3>
            <p className="text-white/80 text-sm">Level 12 • Bold & Adventurous</p>
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-3 mb-4">
          <div className="text-center">
            <div className="text-2xl font-bold">47</div>
            <div className="text-xs text-white/80">Day Streak</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">23</div>
            <div className="text-xs text-white/80">Recipes Tried</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">8</div>
            <div className="text-xs text-white/80">Achievements</div>
          </div>
        </div>
        
        <Button variant="secondary" className="w-full bg-white/20 hover:bg-white/30 text-white border-white/30">
          Customize Avatar
        </Button>
      </div>
    </Card>
  );
};

export default CoffeeAvatar;
