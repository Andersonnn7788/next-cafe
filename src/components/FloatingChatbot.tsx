
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Coffee, Send, X, Bot, Brain, TrendingUp } from "lucide-react";

const FloatingChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      type: "assistant",
      content: "Hi! I'm your AI Coffee Assistant. I can recommend recipes, analyze your preferences, and help optimize your coffee experience. What would you like to know?",
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    // Add user message
    const userMessage = {
      type: "user",
      content: inputMessage,
      timestamp: new Date()
    };

    // Simulate AI response based on input
    let aiResponse = "";
    if (inputMessage.toLowerCase().includes("recipe")) {
      aiResponse = "Based on your mood and preferences, I recommend a NESCAFÉ Gold Espresso with a hint of cinnamon. This matches your energetic profile and current taste preferences!";
    } else if (inputMessage.toLowerCase().includes("mood")) {
      aiResponse = "I notice you're feeling energetic today! This is perfect for trying bold coffee flavors. Your engagement patterns suggest you prefer morning recommendations.";
    } else {
      aiResponse = "That's interesting! Based on your interaction history, I'm learning more about your preferences. Would you like me to analyze your coffee personality?";
    }

    const assistantMessage = {
      type: "assistant",
      content: aiResponse,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage, assistantMessage]);
    setInputMessage("");
  };

  return (
    <>
      {/* Chat Window */}
      {isOpen && (
        <Card className="fixed bottom-24 right-6 w-80 h-96 flex flex-col z-50 shadow-xl">
          <div className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-coffee-gradient rounded-lg">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-coffee-dark">AI Coffee Assistant</h3>
                <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                  <span className="flex items-center space-x-1">
                    <Brain className="w-3 h-3" />
                    <span>Learning</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <TrendingUp className="w-3 h-3" />
                    <span>Online</span>
                  </span>
                </div>
              </div>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setIsOpen(false)}
              className="h-8 w-8 p-0"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          <div className="flex-1 overflow-y-auto space-y-3 p-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg text-sm ${
                    message.type === "user"
                      ? "bg-coffee-gold text-coffee-dark"
                      : "bg-coffee-light text-coffee-dark border border-coffee-cream"
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))}
          </div>

          <div className="flex space-x-2 p-4 border-t">
            <Input
              placeholder="Ask about recipes, preferences..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              className="flex-1 text-sm"
            />
            <Button
              onClick={handleSendMessage}
              size="sm"
              className="bg-coffee-gradient hover:opacity-90"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </Card>
      )}

      {/* Floating Coffee Icon Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-coffee-gradient hover:opacity-90 shadow-lg z-50 pulse-glow"
        size="icon"
      >
        <Coffee className="w-6 h-6 text-white" />
      </Button>
    </>
  );
};

export default FloatingChatbot;
