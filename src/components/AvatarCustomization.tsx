
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Palette, Star, Coffee, Sparkles } from "lucide-react";

const AvatarCustomization = () => {
  const [selectedStyle, setSelectedStyle] = useState("espresso-explorer");
  const [selectedAccessory, setSelectedAccessory] = useState("coffee-mug");
  const [selectedBackground, setSelectedBackground] = useState("beans");

  const avatarStyles = [
    { id: "espresso-explorer", name: "Espresso Explorer", emoji: "☕", trait: "Bold & Adventurous" },
    { id: "latte-lover", name: "Latte Lover", emoji: "🥛", trait: "Smooth & Creative" },
    { id: "americano-achiever", name: "Americano Achiever", emoji: "💼", trait: "Strong & Focused" },
    { id: "cappuccino-creator", name: "Cappuccino Creator", emoji: "🎨", trait: "Artistic & Balanced" }
  ];

  const accessories = [
    { id: "coffee-mug", name: "Classic Mug", icon: Coffee },
    { id: "golden-star", name: "Golden Star", icon: Star },
    { id: "magic-sparkles", name: "Magic Sparkles", icon: Sparkles },
    { id: "palette", name: "Artist Palette", icon: Palette }
  ];

  const backgrounds = [
    { id: "beans", name: "Coffee Beans", color: "bg-gradient-to-br from-coffee-bean to-coffee-dark" },
    { id: "cream", name: "Cream Swirl", color: "bg-gradient-to-br from-coffee-cream to-coffee-light" },
    { id: "gold", name: "Golden Hour", color: "bg-gradient-to-br from-coffee-gold to-amber-400" },
    { id: "gradient", name: "Coffee Gradient", color: "coffee-gradient" }
  ];

  const getCurrentAvatar = () => {
    return avatarStyles.find(style => style.id === selectedStyle);
  };

  const getCurrentAccessory = () => {
    return accessories.find(acc => acc.id === selectedAccessory);
  };

  const currentAvatar = getCurrentAvatar();
  const currentAccessory = getCurrentAccessory();

  return (
    <Card className="p-6">
      <div className="flex items-center space-x-3 mb-6">
        <Palette className="w-6 h-6 text-coffee-gold" />
        <h3 className="text-lg font-semibold text-coffee-dark">Customize Your Coffee Avatar</h3>
      </div>

      <div className="flex justify-center mb-6">
        <div className={`relative w-24 h-24 rounded-full flex items-center justify-center ${
          backgrounds.find(bg => bg.id === selectedBackground)?.color || "bg-coffee-gradient"
        }`}>
          <span className="text-4xl">{currentAvatar?.emoji}</span>
          {currentAccessory && (
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg">
              <currentAccessory.icon className="w-4 h-4 text-coffee-gold" />
            </div>
          )}
        </div>
      </div>

      <div className="text-center mb-6">
        <h4 className="font-semibold text-coffee-dark">{currentAvatar?.name}</h4>
        <Badge variant="secondary" className="mt-1 text-xs">
          {currentAvatar?.trait}
        </Badge>
      </div>

      <div className="mb-6">
        <label className="text-sm font-medium text-coffee-dark mb-3 block">Personality Style</label>
        <div className="grid grid-cols-2 gap-2">
          {avatarStyles.map((style) => (
            <Button
              key={style.id}
              variant={selectedStyle === style.id ? "default" : "outline"}
              className={`h-auto p-3 ${
                selectedStyle === style.id ? "bg-coffee-gold hover:bg-coffee-gold/90 text-coffee-dark" : ""
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

      <div className="mb-6">
        <label className="text-sm font-medium text-coffee-dark mb-3 block">Accessory</label>
        <div className="grid grid-cols-4 gap-2">
          {accessories.map((accessory) => {
            const IconComponent = accessory.icon;
            return (
              <Button
                key={accessory.id}
                variant={selectedAccessory === accessory.id ? "default" : "outline"}
                size="sm"
                className={selectedAccessory === accessory.id ? "bg-coffee-gold hover:bg-coffee-gold/90 text-coffee-dark" : ""}
                onClick={() => setSelectedAccessory(accessory.id)}
              >
                <IconComponent className="w-4 h-4" />
              </Button>
            );
          })}
        </div>
      </div>

      <div className="mb-6">
        <label className="text-sm font-medium text-coffee-dark mb-3 block">Background</label>
        <div className="grid grid-cols-2 gap-2">
          {backgrounds.map((background) => (
            <Button
              key={background.id}
              variant={selectedBackground === background.id ? "default" : "outline"}
              className={`h-12 ${
                selectedBackground === background.id ? "bg-coffee-gold hover:bg-coffee-gold/90 text-coffee-dark" : ""
              }`}
              onClick={() => setSelectedBackground(background.id)}
            >
              <div className={`w-6 h-6 rounded-full mr-2 ${background.color}`}></div>
              <span className="text-xs">{background.name}</span>
            </Button>
          ))}
        </div>
      </div>

      <Button className="w-full bg-coffee-gradient hover:opacity-90 text-white">
        Save Avatar (+50 Aroma Points)
      </Button>
    </Card>
  );
};

export default AvatarCustomization;
