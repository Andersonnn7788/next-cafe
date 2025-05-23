
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Bot, Send, Coffee, Brain, TrendingUp } from "lucide-react";
import { useState } from "react";

const AICoffeeAssistant = () => {
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
    <Card className="p-6 h-96 flex flex-col">
      <div className="flex items-center space-x-3 mb-4">
        <div className="p-2 bg-coffee-gradient rounded-lg">
          <Bot className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-coffee-dark">AI Coffee Assistant</h3>
          <div className="flex items-center space-x-4 text-xs text-muted-foreground">
            <span className="flex items-center space-x-1">
              <Brain className="w-3 h-3" />
              <span>Learning</span>
            </span>
            <span className="flex items-center space-x-1">
              <TrendingUp className="w-3 h-3" />
              <span>Analyzing</span>
            </span>
            <span className="flex items-center space-x-1">
              <Coffee className="w-3 h-3" />
              <span>Personalizing</span>
            </span>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto space-y-3 mb-4">
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

      <div className="flex space-x-2">
        <Input
          placeholder="Ask about recipes, preferences, or tips..."
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
          className="flex-1"
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
  );
};

export default AICoffeeAssistant;
