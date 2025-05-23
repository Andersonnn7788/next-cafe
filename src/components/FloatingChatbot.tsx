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
      content: "Hi! I'm your AI Coffee Assistant ☕ I can recommend recipes, analyze your preferences, and help optimize your coffee experience. What would you like to know?",
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
      aiResponse = "Based on your mood and preferences, I recommend a NESCAFÉ Gold Espresso with a hint of cinnamon. This matches your energetic profile and current taste preferences! ☕✨";
    } else if (inputMessage.toLowerCase().includes("mood")) {
      aiResponse = "I notice you're feeling energetic today! This is perfect for trying bold coffee flavors. Your engagement patterns suggest you prefer morning recommendations. 🌟";
    } else if (inputMessage.toLowerCase().includes("points") || inputMessage.toLowerCase().includes("streak")) {
      aiResponse = "Great question! Keep brewing daily to maintain your streak and earn more aroma points. Try the mini-games for bonus points too! 🎮";
    } else {
      aiResponse = "That's interesting! Based on your interaction history, I'm learning more about your preferences. Would you like me to analyze your coffee personality? 🤔";
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
        <Card className="fixed bottom-20 right-4 w-80 h-96 flex flex-col z-50 shadow-2xl border-2 border-amber-200 bg-white">
          <div className="flex items-center justify-between p-4 border-b border-amber-200 bg-gradient-to-r from-amber-50 to-amber-100">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-amber-500 to-amber-600 rounded-lg shadow-lg">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-amber-900">AI Coffee Assistant</h3>
                <div className="flex items-center space-x-2 text-xs text-amber-700">
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
              className="h-8 w-8 p-0 hover:bg-amber-200 text-amber-700"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          <div className="flex-1 overflow-y-auto space-y-3 p-4 bg-gradient-to-b from-white to-amber-50">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg text-sm shadow-sm ${
                    message.type === "user"
                      ? "bg-gradient-to-r from-amber-500 to-amber-600 text-white"
                      : "bg-white text-gray-800 border border-amber-200"
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))}
          </div>

          <div className="flex space-x-2 p-4 border-t border-amber-200 bg-amber-50">
            <Input
              placeholder="Ask about recipes, preferences..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              className="flex-1 text-sm border-amber-300 focus:border-amber-500 focus:ring-amber-500"
            />
            <Button
              onClick={handleSendMessage}
              size="sm"
              className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white shadow-lg"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </Card>
      )}

      {/* Floating Coffee Icon Button - More Prominent */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 h-16 w-16 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-200 z-50 border-2 border-white"
        size="icon"
      >
        <Coffee className="w-7 h-7 text-white animate-pulse" />
        {!isOpen && (
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
            <span className="text-xs text-white font-bold">!</span>
          </div>
        )}
      </Button>

      {/* Tooltip when closed */}
      {!isOpen && (
        <div className="fixed bottom-24 right-20 bg-gray-800 text-white px-3 py-1 rounded-lg text-sm z-40 opacity-0 hover:opacity-100 transition-opacity pointer-events-none">
          Chat with AI Assistant
        </div>
      )}
    </>
  );
};

export default FloatingChatbot;
