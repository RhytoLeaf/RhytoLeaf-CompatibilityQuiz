import { useQuiz } from '../hooks/useQuiz';
import { WelcomeScreen } from '../components/quiz/WelcomeScreen';
import { QuizScreen } from '../components/quiz/QuizScreen';
import { ResultsScreen } from '../components/quiz/ResultsScreen';

export default function Quiz() {
  const {
    currentScreen,
    currentQuestion,
    currentQuestionIndex,
    totalQuestions,
    progress,
    selectedOption,
    showExplanation,
    results,
    startQuiz,
    selectOption,
    nextQuestion,
    previousQuestion,
    shareResults,
    retakeQuiz
  } = useQuiz();

  if (currentScreen === 'welcome') {
    return <WelcomeScreen onStartQuiz={startQuiz} />;
  }

  if (currentScreen === 'quiz') {
    return (
      <QuizScreen
        currentQuestion={currentQuestion}
        currentQuestionIndex={currentQuestionIndex}
        totalQuestions={totalQuestions}
        progress={progress}
        selectedOption={selectedOption}
        showExplanation={showExplanation}
        onSelectOption={selectOption}
        onNextQuestion={nextQuestion}
        onPreviousQuestion={previousQuestion}
      />
    );
  }

  if (currentScreen === 'results' && results) {
    return (
      <ResultsScreen
        results={results}
        onShareResults={shareResults}
        onRetakeQuiz={retakeQuiz}
      />
    );
  }

  return null;
}
