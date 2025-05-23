import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Settings, TrendingUp, Brain } from "lucide-react";
import { useState } from "react";
import AvatarCustomization from "./AvatarCustomization";

const CoffeeAvatar = () => {
  const [showCustomization, setShowCustomization] = useState(false);

  return (
    <Card className="p-6 bg-gradient-to-br from-amber-600 to-amber-800 text-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12"></div>
      
      <div className="relative z-10">
        <div className="mb-4">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm relative">
              <span className="text-2xl">☕</span>
              <div className="absolute -top-1 -right-1 w-6 h-6 bg-white/30 rounded-full flex items-center justify-center">
                <Settings className="w-3 h-3 text-white" />
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold">Espresso Explorer</h3>
              <p className="text-white/80 text-sm">Level 12 • Bold & Adventurous</p>
              <div className="flex items-center space-x-2 mt-1">
                <div className="flex items-center space-x-1 text-xs">
                  <Brain className="w-3 h-3" />
                  <span>AI Learning</span>
                </div>
                <div className="flex items-center space-x-1 text-xs">
                  <TrendingUp className="w-3 h-3" />
                  <span>Adapting</span>
                </div>
              </div>
            </div>
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
        
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="secondary" className="w-full bg-white/20 hover:bg-white/30 text-white border-white/30">
              Customize Avatar
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-96 p-0" side="right" align="start">
            <AvatarCustomization />
          </PopoverContent>
        </Popover>
      </div>
    </Card>
  );
};

export default CoffeeAvatar;
