import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Share2, RotateCcw, Star, CheckCircle, Lightbulb, Heart } from 'lucide-react';
import { QuizResults } from '../../types/quiz';

interface ResultsScreenProps {
  results: QuizResults;
  onShareResults: () => void;
  onRetakeQuiz: () => void;
}

export function ResultsScreen({ results, onShareResults, onRetakeQuiz }: ResultsScreenProps) {
  const getScoreDescription = (percentage: number) => {
    if (percentage >= 80) return "Excellent Awareness";
    if (percentage >= 60) return "Good Understanding";
    if (percentage >= 40) return "Developing Insight";
    return "Growing Awareness";
  };

  const getScoreColor = (percentage: number) => {
    if (percentage >= 80) return "text-green-600";
    if (percentage >= 60) return "text-blue-600";
    if (percentage >= 40) return "text-yellow-600";
    return "text-orange-600";
  };

  const getCategoryBadgeVariant = (percentage: number) => {
    if (percentage >= 80) return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
    if (percentage >= 60) return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
    return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
  };

  return (
    <div className="min-h-screen bg-gradient-soft">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Card className="shadow-xl overflow-hidden animate-fade-in-up">
          {/* Results Header */}
          <div className="bg-gradient-primary text-white p-8 md:p-12 text-center">
            <div className="mb-6">
              <div className="w-32 h-32 bg-white bg-opacity-20 rounded-full mx-auto flex items-center justify-center mb-4">
                <span className="text-4xl font-bold">{results.percentage}</span>
                <span className="text-xl ml-1">%</span>
              </div>
              <h2 className="text-3xl font-bold mb-2">Your Compatibility Awareness Score</h2>
              <p className="text-xl opacity-90">{getScoreDescription(results.percentage)}</p>
            </div>
            
            <Button 
              onClick={onShareResults}
              variant="secondary"
              size="lg"
              className="bg-white text-primary hover:bg-gray-50 dark:bg-gray-100 dark:text-primary px-6 py-3 font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300"
            >
              <Share2 className="mr-2 h-5 w-5" />
              Share Your Results
            </Button>
          </div>

          {/* Detailed Results */}
          <CardContent className="p-8 md:p-12">
            <h3 className="text-2xl font-bold text-foreground mb-8">Your Understanding by Category</h3>
            
            {/* Category Breakdown */}
            <div className="grid gap-6 mb-8">
              {results.categoryScores.map((category) => (
                <div key={category.category} className="bg-muted/50 rounded-xl p-6">
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="font-semibold text-foreground">{category.category}</h4>
                    <Badge className={getCategoryBadgeVariant(category.percentage)}>
                      {category.correct}/{category.total} Correct
                    </Badge>
                  </div>
                  <Progress value={category.percentage} className="h-3 mb-3" />
                  <p className="text-sm text-muted-foreground">
                    {category.percentage >= 80 && "Excellent understanding of this compatibility factor."}
                    {category.percentage >= 60 && category.percentage < 80 && "Good awareness with room for growth."}
                    {category.percentage < 60 && "This area offers opportunities for deeper learning."}
                  </p>
                </div>
              ))}
            </div>

            {/* Key Insights */}
            <Card className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 mb-8">
              <CardContent className="p-6">
                <h4 className="text-xl font-semibold text-foreground mb-4 flex items-center">
                  <Star className="mr-3 h-6 w-6 text-accent" />
                  Key Insights for You
                </h4>
                <div className="space-y-3">
                  {results.insights.map((insight, index) => (
                    <div key={index} className="flex items-start">
                      {index === 0 && <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-1 flex-shrink-0" />}
                      {index === 1 && <Lightbulb className="h-5 w-5 text-accent mr-3 mt-1 flex-shrink-0" />}
                      {index === 2 && <Heart className="h-5 w-5 text-primary mr-3 mt-1 flex-shrink-0" />}
                      {index > 2 && <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-1 flex-shrink-0" />}
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
                className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-4 font-semibold hover:shadow-lg transition-all duration-300"
              >
                <RotateCcw className="mr-2 h-5 w-5" />
                Retake Quiz
              </Button>
              <Button 
                onClick={onShareResults}
                variant="outline"
                size="lg"
                className="flex-1 border-2 border-primary text-primary hover:bg-green-50 dark:hover:bg-green-900/20 px-6 py-4 font-semibold transition-all duration-300"
              >
                <Share2 className="mr-2 h-5 w-5" />
                Share Results
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <footer className="bg-white dark:bg-card border-t border-border mt-16 rounded-t-lg">
          <div className="px-4 py-8 text-center">
            <p className="text-muted-foreground mb-4">
              This quiz is based on relationship psychology research and the seven silent signs of incompatibility.
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
