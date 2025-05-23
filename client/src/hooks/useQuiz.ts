import { useState, useCallback, useMemo } from 'react';
import { QuizQuestion, QuizAnswer, QuizResults, CategoryScore, QuizScreen } from '../types/quiz';
import { quizQuestions, categories } from '../data/questions';

export const useQuiz = () => {
  const [currentScreen, setCurrentScreen] = useState<QuizScreen>('welcome');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswer[]>([]);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);

  const currentQuestion = quizQuestions[currentQuestionIndex];
  const totalQuestions = quizQuestions.length;
  const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100;

  const startQuiz = useCallback(() => {
    setCurrentScreen('quiz');
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setSelectedOption(null);
    setShowExplanation(false);
  }, []);

  const selectOption = useCallback((optionIndex: number) => {
    setSelectedOption(optionIndex);
  }, []);

  const nextQuestion = useCallback(() => {
    if (selectedOption === null) return;

    const answer: QuizAnswer = {
      questionId: currentQuestion.id,
      selectedOption,
      isCorrect: selectedOption === currentQuestion.correct
    };

    setAnswers(prev => [...prev, answer]);
    setShowExplanation(true);

    setTimeout(() => {
      if (currentQuestionIndex < totalQuestions - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
        setSelectedOption(null);
        setShowExplanation(false);
      } else {
        setCurrentScreen('results');
      }
    }, 3000);
  }, [selectedOption, currentQuestion, currentQuestionIndex, totalQuestions]);

  const previousQuestion = useCallback(() => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
      setAnswers(prev => prev.slice(0, -1));
      setSelectedOption(null);
      setShowExplanation(false);
    }
  }, [currentQuestionIndex]);

  const calculateResults = useCallback((): QuizResults => {
    const correctAnswers = answers.filter(answer => answer.isCorrect).length;
    const totalScore = correctAnswers;
    const percentage = Math.round((correctAnswers / totalQuestions) * 100);

    // Calculate category scores
    const categoryScores: CategoryScore[] = categories.map(category => {
      const categoryQuestions = quizQuestions.filter(q => q.category === category);
      const categoryAnswers = answers.filter(answer => 
        categoryQuestions.some(q => q.id === answer.questionId)
      );
      const correct = categoryAnswers.filter(answer => answer.isCorrect).length;
      const total = categoryQuestions.length;
      
      return {
        category,
        correct,
        total,
        percentage: total > 0 ? Math.round((correct / total) * 100) : 0
      };
    });

    // Generate insights based on performance
    const insights: string[] = [];
    
    if (percentage >= 80) {
      insights.push("You demonstrate excellent awareness of relationship compatibility factors and the subtle signs that can impact long-term success.");
    } else if (percentage >= 60) {
      insights.push("You have a good understanding of relationship dynamics with room to deepen your awareness of compatibility factors.");
    } else {
      insights.push("This quiz has introduced you to important compatibility concepts that can help you build stronger relationships.");
    }

    // Add category-specific insights
    const strongCategories = categoryScores.filter(cat => cat.percentage >= 80);
    const weakCategories = categoryScores.filter(cat => cat.percentage < 60);

    if (strongCategories.length > 0) {
      insights.push(`You show particularly strong awareness in: ${strongCategories.map(cat => cat.category).join(', ')}.`);
    }

    if (weakCategories.length > 0) {
      insights.push(`Consider exploring these areas further: ${weakCategories.map(cat => cat.category).join(', ')}.`);
    }

    return {
      totalScore,
      percentage,
      categoryScores,
      answers,
      insights
    };
  }, [answers, totalQuestions]);

  const results = useMemo(() => {
    if (currentScreen === 'results') {
      return calculateResults();
    }
    return null;
  }, [currentScreen, calculateResults]);

  const shareResults = useCallback(async () => {
    if (!results) return;

    const shareText = `I just completed the Relationship Compatibility Quiz and scored ${results.percentage}%! Test your understanding of the 7 silent signs of incompatibility.`;
    const shareUrl = window.location.href;

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Relationship Compatibility Quiz Results',
          text: shareText,
          url: shareUrl
        });
      } catch (error) {
        console.log('Sharing cancelled or failed');
      }
    } else {
      // Fallback for browsers without Web Share API
      const shareContent = `${shareText}\n\n${shareUrl}`;
      
      try {
        await navigator.clipboard.writeText(shareContent);
        alert('Results copied to clipboard! You can now paste and share.');
      } catch (error) {
        // Final fallback
        const textArea = document.createElement('textarea');
        textArea.value = shareContent;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        alert('Results copied to clipboard! You can now paste and share.');
      }
    }
  }, [results]);

  const retakeQuiz = useCallback(() => {
    setCurrentScreen('welcome');
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setSelectedOption(null);
    setShowExplanation(false);
  }, []);

  return {
    // State
    currentScreen,
    currentQuestion,
    currentQuestionIndex,
    totalQuestions,
    progress,
    selectedOption,
    showExplanation,
    answers,
    results,
    
    // Actions
    startQuiz,
    selectOption,
    nextQuestion,
    previousQuestion,
    shareResults,
    retakeQuiz
  };
};
