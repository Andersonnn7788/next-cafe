import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Palette, Star, Coffee, Sparkles, Droplet, Zap, Award, Cherry } from "lucide-react";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";

const AvatarCustomization = () => {
  // Main avatar properties
  const [selectedStyle, setSelectedStyle] = useState(() => {
    return localStorage.getItem("avatarStyle") || "espresso-explorer";
  });
  
  const [selectedAccessory, setSelectedAccessory] = useState(() => {
    return localStorage.getItem("avatarAccessory") || "coffee-mug";
  });
  
  const [selectedBackground, setSelectedBackground] = useState(() => {
    return localStorage.getItem("avatarBackground") || "beans";
  });
  
  // Advanced customization properties
  const [selectedTab, setSelectedTab] = useState("style");
  const [beanSize, setBeanSize] = useState(() => {
    return parseInt(localStorage.getItem("avatarBeanSize") || "50", 10);
  });
  
  const [avatarRotation, setAvatarRotation] = useState(() => {
    return parseInt(localStorage.getItem("avatarRotation") || "0", 10);
  });
  
  const [frameStyle, setFrameStyle] = useState(() => {
    return localStorage.getItem("avatarFrameStyle") || "none";
  });
  
  const [avatarVibe, setAvatarVibe] = useState(() => {
    return localStorage.getItem("avatarVibe") || "energetic";
  });

  // Define available options
  const avatarStyles = [
    { id: "espresso-explorer", name: "Espresso Explorer", emoji: "☕", trait: "Bold & Adventurous" },
    { id: "latte-lover", name: "Latte Lover", emoji: "🥛", trait: "Smooth & Creative" },
    { id: "americano-achiever", name: "Americano Achiever", emoji: "💼", trait: "Strong & Focused" },
    { id: "cappuccino-creator", name: "Cappuccino Creator", emoji: "🎨", trait: "Artistic & Balanced" },
    { id: "mocha-master", name: "Mocha Master", emoji: "🍫", trait: "Sweet & Sophisticated" },
    { id: "cold-brew-coder", name: "Cold Brew Coder", emoji: "💻", trait: "Chill & Productive" }
  ];

  const accessories = [
    { id: "coffee-mug", name: "Classic Mug", icon: Coffee },
    { id: "golden-star", name: "Golden Star", icon: Star },
    { id: "magic-sparkles", name: "Magic Sparkles", icon: Sparkles },
    { id: "palette", name: "Artist Palette", icon: Palette },
    { id: "water-drop", name: "Water Drop", icon: Droplet },
    { id: "lightning", name: "Lightning", icon: Zap },
    { id: "award", name: "Award", icon: Award },
    { id: "cherry", name: "Cherry", icon: Cherry }
  ];

  const backgrounds = [
    { id: "beans", name: "Coffee Beans", color: "bg-gradient-to-br from-amber-800 to-amber-900" },
    { id: "cream", name: "Cream Swirl", color: "bg-gradient-to-br from-amber-100 to-amber-200" },
    { id: "gold", name: "Golden Hour", color: "bg-gradient-to-br from-yellow-400 to-amber-400" },
    { id: "gradient", name: "Coffee Gradient", color: "bg-gradient-to-br from-amber-600 to-amber-800" },
    { id: "mocha", name: "Mocha Swirl", color: "bg-gradient-to-br from-amber-800 to-amber-900" },
    { id: "mint", name: "Mint Fresh", color: "bg-gradient-to-br from-emerald-300 to-teal-700" }
  ];

  const frameStyles = [
    { id: "none", name: "None" },
    { id: "circle", name: "Circle", class: "rounded-full" },
    { id: "square", name: "Square", class: "rounded-lg" },
    { id: "hexagon", name: "Hexagon", class: "rounded-lg" },
    { id: "coffee-bean", name: "Bean Shape", class: "rounded-full" }
  ];

  const vibeOptions = [
    { id: "energetic", name: "Energetic", effect: "animate-bounce", intensity: "slow" },
    { id: "chill", name: "Chill", effect: "animate-pulse", intensity: "very-slow" },
    { id: "excited", name: "Excited", effect: "animate-spin", intensity: "slow" },
    { id: "zen", name: "Zen", effect: "hover:scale-105", intensity: "medium" }
  ];

  // Helper functions to get current selections
  const getCurrentAvatar = () => {
    return avatarStyles.find(style => style.id === selectedStyle);
  };

  const getCurrentAccessory = () => {
    return accessories.find(acc => acc.id === selectedAccessory);
  };

  const getCurrentBackground = () => {
    return backgrounds.find(bg => bg.id === selectedBackground);
  };
  
  const getCurrentFrame = () => {
    return frameStyles.find(frame => frame.id === frameStyle);
  };
  
  const getCurrentVibe = () => {
    return vibeOptions.find(vibe => vibe.id === avatarVibe);
  };

  // For UI display
  const currentAvatar = getCurrentAvatar();
  const currentAccessory = getCurrentAccessory();
  const currentBackground = getCurrentBackground();
  const currentFrame = getCurrentFrame();
  const currentVibe = getCurrentVibe();

  // Save to localStorage when selections change
  useEffect(() => {
    localStorage.setItem("avatarStyle", selectedStyle);
    localStorage.setItem("avatarAccessory", selectedAccessory);
    localStorage.setItem("avatarBackground", selectedBackground);
    localStorage.setItem("avatarBeanSize", beanSize.toString());
    localStorage.setItem("avatarRotation", avatarRotation.toString());
    localStorage.setItem("avatarFrameStyle", frameStyle);
    localStorage.setItem("avatarVibe", avatarVibe);
  }, [selectedStyle, selectedAccessory, selectedBackground, beanSize, avatarRotation, frameStyle, avatarVibe]);

  const saveAvatar = () => {
    toast.success("Avatar customization saved! +50 Aroma Points", {
      duration: 2000
    });
  };

  // Get dynamic styles for avatar preview
  const getAvatarClasses = () => {
    let classes = `relative flex items-center justify-center ${currentVibe?.effect || ""}`;
    
    if (currentFrame?.class) {
      classes += ` ${currentFrame.class}`;
    } else {
      classes += " rounded-full";
    }
    
    return classes;
  };

  return (
    <Card className="p-6">
      <div className="flex items-center space-x-3 mb-6">
        <Palette className="w-6 h-6 text-amber-600" />
        <h3 className="text-lg font-semibold text-amber-900">Customize Your Coffee Avatar</h3>
      </div>

      {/* Avatar Preview */}
      <div className="flex justify-center mb-6">
        <div 
          className={getAvatarClasses()}
          style={{
            width: `${Math.max(60, beanSize)}px`,
            height: `${Math.max(60, beanSize)}px`,
            transform: `rotate(${avatarRotation}deg)`,
            transition: "all 0.3s ease-in-out"
          }}
        >
          <div className={`w-full h-full ${currentBackground?.color || "bg-gradient-to-br from-amber-600 to-amber-800"} flex items-center justify-center`}>
            <span className="text-4xl">{currentAvatar?.emoji}</span>
          </div>
          
          {currentAccessory && (
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg">
              {React.createElement(currentAccessory.icon, { className: "w-4 h-4 text-amber-600" })}
            </div>
          )}
        </div>
      </div>

      <div className="text-center mb-6">
        <h4 className="font-semibold text-amber-900">{currentAvatar?.name}</h4>
        <Badge variant="secondary" className="mt-1 text-xs">
          {currentAvatar?.trait}
        </Badge>
      </div>

      <Tabs defaultValue="style" className="w-full">
        <TabsList className="w-full">
          <TabsTrigger value="style">Style</TabsTrigger>
          <TabsTrigger value="accessories">Accessories</TabsTrigger>
          <TabsTrigger value="advanced">Advanced</TabsTrigger>
        </TabsList>
        
        <TabsContent value="style" className="pt-4">
          {/* Style Selection */}
          <div className="mb-6">
            <label className="text-sm font-medium text-amber-900 mb-3 block">Personality Style</label>
            <div className="grid grid-cols-2 gap-2">
              {avatarStyles.map((style) => (
                <Button
                  key={style.id}
                  variant={selectedStyle === style.id ? "default" : "outline"}
                  className={`h-auto p-3 ${
                    selectedStyle === style.id ? "bg-amber-600 hover:bg-amber-700 text-white" : ""
                  }`}
                  onClick={() => setSelectedStyle(style.id)}
                >
                  <div className="text-center">
                    <div className="text-xl mb-1">{style.emoji}</div>
                    <div className="text-xs font-medium">{style.name}</div>
                  </div>
                </Button>
              ))}
            </div>
          </div>

          {/* Background Selection */}
          <div>
            <label className="text-sm font-medium text-amber-900 mb-3 block">Background</label>
            <div className="grid grid-cols-3 gap-2">
              {backgrounds.map((background) => (
                <Button
                  key={background.id}
                  variant={selectedBackground === background.id ? "default" : "outline"}
                  className={`h-12 ${
                    selectedBackground === background.id ? "bg-amber-600 hover:bg-amber-700 text-white" : ""
                  }`}
                  onClick={() => setSelectedBackground(background.id)}
                >
                  <div className={`w-6 h-6 rounded-full mr-2 ${background.color}`}></div>
                  <span className="text-xs">{background.name}</span>
                </Button>
              ))}
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="accessories" className="pt-4">
          {/* Accessory Selection */}
          <div className="mb-6">
            <label className="text-sm font-medium text-amber-900 mb-3 block">Accessory</label>
            <div className="grid grid-cols-4 gap-2">
              {accessories.map((accessory) => (
                <Button
                  key={accessory.id}
                  variant={selectedAccessory === accessory.id ? "default" : "outline"}
                  size="sm"
                  className={selectedAccessory === accessory.id ? "bg-amber-600 hover:bg-amber-700 text-white" : ""}
                  onClick={() => setSelectedAccessory(accessory.id)}
                >
                  {React.createElement(accessory.icon, { className: "w-4 h-4" })}
                </Button>
              ))}
            </div>
          </div>
          
          {/* Frame Selection */}
          <div>
            <label className="text-sm font-medium text-amber-900 mb-3 block">Frame Style</label>
            <div className="grid grid-cols-2 gap-2">
              {frameStyles.map((frame) => (
                <Button
                  key={frame.id}
                  variant={frameStyle === frame.id ? "default" : "outline"}
                  className={`${
                    frameStyle === frame.id ? "bg-amber-600 hover:bg-amber-700 text-white" : ""
                  }`}
                  onClick={() => setFrameStyle(frame.id)}
                >
                  {frame.name}
                </Button>
              ))}
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="advanced" className="pt-4">
          {/* Size Adjustment */}
          <div className="mb-6">
            <label className="text-sm font-medium text-amber-900 mb-3 block">Avatar Size</label>
            <Slider
              value={[beanSize]}
              min={40}
              max={100}
              step={5}
              onValueChange={(values) => setBeanSize(values[0])}
              className="mb-2"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Small</span>
              <span>Large</span>
            </div>
          </div>
          
          {/* Rotation Adjustment */}
          <div className="mb-6">
            <label className="text-sm font-medium text-amber-900 mb-3 block">Rotation</label>
            <Slider
              value={[avatarRotation]}
              min={-180}
              max={180}
              step={15}
              onValueChange={(values) => setAvatarRotation(values[0])}
              className="mb-2"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>-180°</span>
              <span>180°</span>
            </div>
          </div>
          
          {/* Animation/Vibe Selection */}
          <div>
            <label className="text-sm font-medium text-amber-900 mb-3 block">Animation Style</label>
            <div className="grid grid-cols-2 gap-2">
              {vibeOptions.map((vibe) => (
                <Button
                  key={vibe.id}
                  variant={avatarVibe === vibe.id ? "default" : "outline"}
                  className={`${
                    avatarVibe === vibe.id ? "bg-amber-600 hover:bg-amber-700 text-white" : ""
                  }`}
                  onClick={() => setAvatarVibe(vibe.id)}
                >
                  <div className="text-center">
                    <div className={`inline-block ${vibe.effect} ${vibe.intensity}`}>☕</div>
                    <div className="text-xs mt-1">{vibe.name}</div>
                  </div>
                </Button>
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>

      <Button 
        className="w-full bg-gradient-to-r from-amber-600 to-amber-800 hover:opacity-90 text-white mt-4"
        onClick={saveAvatar}
      >
        Save Avatar (+50 Aroma Points)
      </Button>
    </Card>
  );
};

export default AvatarCustomization;
