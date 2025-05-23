import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Heart, Users, CheckCircle, Play } from 'lucide-react';

interface WelcomeScreenProps {
  onStartQuiz: () => void;
}

export function WelcomeScreen({ onStartQuiz }: WelcomeScreenProps) {
  return (
    <div className="min-h-screen bg-gradient-soft">
      <header className="bg-white dark:bg-card shadow-sm border-b border-gray-100 dark:border-gray-700">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-foreground mb-2 flex items-center justify-center gap-3">
              <Heart className="h-8 w-8 text-primary" />
              Relationship Compatibility Quiz
            </h1>
            <p className="text-muted-foreground font-medium">Discover the 7 Silent Signs of Incompatibility</p>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <Card className="shadow-xl animate-fade-in-up">
          <CardContent className="p-8 md:p-12 text-center">
            <div className="mb-8">
              <div className="w-24 h-24 bg-gradient-primary rounded-full mx-auto mb-6 flex items-center justify-center">
                <Users className="h-12 w-12 text-white" />
              </div>
              <h2 className="text-4xl font-bold text-foreground mb-4">Understanding Relationship Compatibility</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Take this comprehensive quiz to explore the seven silent signs of incompatibility that can affect relationships. 
                Get personalized insights based on relationship psychology research.
              </p>
            </div>
            
            <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-xl p-6 mb-8">
              <h3 className="font-semibold text-foreground mb-3">What You'll Discover:</h3>
              <div className="grid md:grid-cols-2 gap-4 text-sm text-muted-foreground">
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                  <span>Emotional regulation differences</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                  <span>Communication compatibility</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                  <span>Growth mindset alignment</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                  <span>Value system compatibility</span>
                </div>
              </div>
            </div>

            <Button 
              onClick={onStartQuiz}
              size="lg"
              className="px-8 py-4 text-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300"
              style={{ backgroundColor: '#00CE7C', color: '#FFFFFF' }}
            >
              <Play className="mr-3 h-5 w-5" />
              Start Quiz (18 Questions)
            </Button>
            
            <p className="text-sm text-muted-foreground mt-4">Takes approximately 8-10 minutes to complete</p>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
