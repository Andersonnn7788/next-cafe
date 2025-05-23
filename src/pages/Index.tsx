
import Header from "@/components/Header";
import CoffeeAvatar from "@/components/CoffeeAvatar";
import DailyBrewStreak from "@/components/DailyBrewStreak";
import MoodCoffeeMatch from "@/components/MoodCoffeeMatch";
import MiniGames from "@/components/MiniGames";
import CoffeeQuiz from "@/components/CoffeeQuiz";
import StatsOverview from "@/components/StatsOverview";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-coffee-light via-background to-coffee-cream">
      <Header />
      
      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* Welcome Section */}
        <div className="text-center mb-8 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-coffee-dark mb-2">
            Welcome Back, Coffee Explorer! ☕
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Continue your personalized coffee journey with daily challenges, brewing adventures, and discovering new flavors.
          </p>
        </div>

        {/* Stats Overview */}
        <div className="animate-slide-up">
          <StatsOverview />
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-1 space-y-6">
            <div className="animate-slide-up" style={{ animationDelay: '0.1s' }}>
              <CoffeeAvatar />
            </div>
            <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <DailyBrewStreak />
            </div>
          </div>

          {/* Middle Column */}
          <div className="lg:col-span-1 space-y-6">
            <div className="animate-slide-up" style={{ animationDelay: '0.3s' }}>
              <MoodCoffeeMatch />
            </div>
            <div className="animate-slide-up" style={{ animationDelay: '0.4s' }}>
              <MiniGames />
            </div>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-1 space-y-6">
            <div className="animate-slide-up" style={{ animationDelay: '0.5s' }}>
              <CoffeeQuiz />
            </div>
          </div>
        </div>

        {/* Footer Message */}
        <div className="text-center py-8 animate-fade-in" style={{ animationDelay: '0.6s' }}>
          <p className="text-muted-foreground">
            "Every cup tells a story. What's yours today?" - NESCAFÉ
          </p>
        </div>
      </main>
    </div>
  );
};

export default Index;
