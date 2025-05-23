import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, ArrowRight, Lightbulb } from 'lucide-react';
import { QuizQuestion } from '../../types/quiz';

interface QuizScreenProps {
  currentQuestion: QuizQuestion;
  currentQuestionIndex: number;
  totalQuestions: number;
  progress: number;
  selectedOption: number | null;
  showExplanation: boolean;
  onSelectOption: (optionIndex: number) => void;
  onNextQuestion: () => void;
  onPreviousQuestion: () => void;
}

export function QuizScreen({
  currentQuestion,
  currentQuestionIndex,
  totalQuestions,
  progress,
  selectedOption,
  showExplanation,
  onSelectOption,
  onNextQuestion,
  onPreviousQuestion
}: QuizScreenProps) {
  const isLastQuestion = currentQuestionIndex === totalQuestions - 1;

  return (
    <div className="min-h-screen bg-gradient-soft">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Progress Bar */}
        <Card className="shadow-sm mb-6 animate-fade-in-up">
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-muted-foreground">Progress</span>
              <span className="text-sm font-medium text-muted-foreground">
                {currentQuestionIndex + 1} of {totalQuestions}
              </span>
            </div>
            <Progress 
              value={progress} 
              className="h-3 progress-bar" 
            />
          </CardContent>
        </Card>

        {/* Question Card */}
        <Card className="shadow-xl animate-slide-in-right">
          <CardContent className="p-8 md:p-12">
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <Badge 
                  variant="default" 
                  className="px-4 py-2"
                  style={{ backgroundColor: '#F2F2F2', color: '#00CE7C', border: '2px solid #00CE7C' }}
                >
                  {currentQuestion.category}
                </Badge>
                <span className="text-muted-foreground text-sm font-medium">
                  Question {currentQuestionIndex + 1}
                </span>
              </div>
              
              <h3 className="text-2xl font-bold text-foreground mb-6 leading-tight">
                {currentQuestion.question}
              </h3>
            </div>

            {/* Answer Options */}
            <div className="space-y-4 mb-8">
              {currentQuestion.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => onSelectOption(index)}
                  disabled={false}
                  className={`w-full text-left p-6 border-2 rounded-xl transition-all duration-300 group ${
                    selectedOption === index
                      ? 'border-primary bg-green-50 dark:bg-green-900/20'
                      : 'border-border hover:border-primary hover:bg-green-50 dark:hover:bg-green-900/20'
                  } cursor-pointer`}
                >
                  <div className="flex items-center">
                    <div className={`w-6 h-6 border-2 rounded-full mr-4 transition-colors flex items-center justify-center flex-shrink-0 ${
                      selectedOption === index
                        ? 'border-primary bg-primary'
                        : 'border-muted-foreground group-hover:border-primary'
                    }`}
                    style={{ 
                      minWidth: '24px',
                      minHeight: '24px',
                      maxWidth: '24px',
                      maxHeight: '24px',
                      borderRadius: '50%'
                    }}>
                      {selectedOption === index && (
                        <div className="w-3 h-3 bg-white rounded-full" />
                      )}
                    </div>
                    <span className={`font-medium transition-colors ${
                      selectedOption === index
                        ? 'text-foreground'
                        : 'text-muted-foreground group-hover:text-foreground'
                    }`}>
                      {option}
                    </span>
                  </div>
                </button>
              ))}
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between items-center">
              <Button
                onClick={onPreviousQuestion}
                disabled={currentQuestionIndex === 0}
                variant="outline"
                className="px-6 py-3 border-2 hover:text-white transition-colors"
                style={{ 
                  borderColor: '#00CE7C', 
                  color: '#212121',
                  backgroundColor: 'transparent'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#00CE7C';
                  e.currentTarget.style.color = '#FFFFFF';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = '#212121';
                }}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous
              </Button>
              
              <Button
                onClick={onNextQuestion}
                disabled={selectedOption === null}
                className="px-6 py-3"
                style={{ backgroundColor: '#00CE7C', color: '#FFFFFF' }}
              >
                {isLastQuestion ? 'View Results' : 'Next'}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>


      </div>
    </div>
  );
}
