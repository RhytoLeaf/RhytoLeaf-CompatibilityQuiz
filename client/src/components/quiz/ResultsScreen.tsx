import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Share2, RotateCcw, Star, User, Brain, Target } from 'lucide-react';
import { QuizResults } from '../../types/quiz';

interface ResultsScreenProps {
  results: QuizResults;
  onShareResults: () => void;
  onRetakeQuiz: () => void;
}

export function ResultsScreen({ results, onShareResults, onRetakeQuiz }: ResultsScreenProps) {
  const getStrengthColor = (strength: string) => {
    switch (strength) {
      case 'High': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-200';
      case 'Moderate': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-soft">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Card className="shadow-xl overflow-hidden animate-fade-in-up">
          {/* Results Header */}
          <div className="bg-gradient-primary text-white p-8 md:p-12 text-center">
            <div className="mb-6">
              <div className="w-32 h-32 bg-white bg-opacity-20 rounded-full mx-auto flex items-center justify-center mb-4">
                <User className="h-16 w-16" />
              </div>
              <h2 className="text-3xl font-bold mb-2">Your Compatibility Profile</h2>
              <p className="text-xl opacity-90">Understanding Your Relationship Patterns</p>
            </div>
            
            <Button 
              onClick={onShareResults}
              variant="secondary"
              size="lg"
              className="px-6 py-3 font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300"
              style={{ backgroundColor: '#F2F2F2', color: '#212121', border: '2px solid #00CE7C' }}
            >
              <Share2 className="mr-2 h-5 w-5" />
              Share Your Profile
            </Button>
          </div>

          {/* Trait Profiles */}
          <CardContent className="p-8 md:p-12">
            <h3 className="text-2xl font-bold text-foreground mb-8 flex items-center">
              <Brain className="mr-3 h-8 w-8 text-primary" />
              Your Dominant Traits
            </h3>
            
            {/* Trait Cards */}
            <div className="grid gap-6 mb-8">
              {results.traitProfiles.map((trait, index) => (
                <div key={index} className="bg-muted/50 rounded-xl p-6 border-l-4 border-primary">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="text-xl font-semibold text-foreground mb-1">{trait.trait}</h4>
                      <p className="text-sm text-muted-foreground font-medium">{trait.category}</p>
                    </div>
                    <Badge className={getStrengthColor(trait.strength)}>
                      {trait.strength}
                    </Badge>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    {trait.description}
                  </p>
                </div>
              ))}
            </div>

            {/* Compatibility Insights */}
            <Card className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 mb-8">
              <CardContent className="p-6">
                <h4 className="text-xl font-semibold text-foreground mb-4 flex items-center">
                  <Target className="mr-3 h-6 w-6 text-accent" />
                  The Science of Compatibility
                </h4>
                <div className="space-y-4">
                  {results.compatibilityInsights.map((insight, index) => (
                    <div key={index} className="flex items-start">
                      <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                        <span className="text-white text-sm font-bold">{index + 1}</span>
                      </div>
                      <p className="text-muted-foreground leading-relaxed">{insight}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                onClick={onRetakeQuiz}
                size="lg"
                className="flex-1 px-6 py-4 font-semibold hover:shadow-lg transition-all duration-300"
                style={{ backgroundColor: '#00CE7C', color: '#FFFFFF' }}
              >
                <RotateCcw className="mr-2 h-5 w-5" />
                Retake Quiz
              </Button>
              <Button 
                onClick={onShareResults}
                variant="outline"
                size="lg"
                className="flex-1 px-6 py-4 font-semibold transition-all duration-300"
                style={{ border: '2px solid #00CE7C', color: '#212121', backgroundColor: '#F2F2F2' }}
              >
                <Share2 className="mr-2 h-5 w-5" />
                Share Profile
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <footer className="bg-white dark:bg-card border-t border-border mt-16 rounded-t-lg">
          <div className="px-4 py-8 text-center">
            <p className="text-muted-foreground mb-4">
              Based on the study of relationship patterns and the seven silent signs of fundamental incompatibility.
            </p>
            <div className="flex justify-center space-x-6 text-sm text-muted-foreground">
              <span>© 2024 Relationship Insights</span>
              <span>•</span>
              <span>Educational Content</span>
              <span>•</span>
              <span>Privacy Focused</span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
