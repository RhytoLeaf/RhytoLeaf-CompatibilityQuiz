import { useState, useCallback, useMemo } from 'react';
import { QuizQuestion, QuizAnswer, QuizResults, TraitProfile, QuizScreen } from '../types/quiz';
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

    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedOption(null);
      setShowExplanation(false);
    } else {
      setCurrentScreen('results');
    }
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
    // Analyze trait profiles based on answers
    const traitProfiles: TraitProfile[] = [];

    // Emotional Regulation
    const emotionalRegAnswers = answers.filter(answer => {
      const question = quizQuestions.find(q => q.id === answer.questionId);
      return question?.category === "Emotional Regulation";
    });
    
    const seekConnection = emotionalRegAnswers.filter(a => a.selectedOption === 0).length;
    const preferIsolation = emotionalRegAnswers.filter(a => a.selectedOption === 1 || a.selectedOption === 2).length;
    
    if (seekConnection > preferIsolation) {
      traitProfiles.push({
        category: "Emotional Regulation",
        trait: "Connection-Seeking",
        description: "You naturally seek connection and support when stressed. You process emotions best through sharing and interaction.",
        strength: seekConnection >= 2 ? "High" : "Moderate"
      });
    } else {
      traitProfiles.push({
        category: "Emotional Regulation", 
        trait: "Processing-Through-Solitude",
        description: "You prefer to process emotions independently before sharing. You need space to work through stress internally.",
        strength: preferIsolation >= 2 ? "High" : "Moderate"
      });
    }

    // Personal Growth
    const growthAnswers = answers.filter(answer => {
      const question = quizQuestions.find(q => q.id === answer.questionId);
      return question?.category === "Personal Growth";
    });
    
    const growthOriented = growthAnswers.filter(a => a.selectedOption === 0).length;
    const stabilityOriented = growthAnswers.filter(a => a.selectedOption === 2 || a.selectedOption === 3).length;
    
    if (growthOriented > stabilityOriented) {
      traitProfiles.push({
        category: "Personal Growth",
        trait: "Evolution-Focused",
        description: "You see life as constant evolution and actively seek change, new experiences, and personal development.",
        strength: growthOriented >= 2 ? "High" : "Moderate"
      });
    } else {
      traitProfiles.push({
        category: "Personal Growth",
        trait: "Stability-Focused", 
        description: "You value predictability and prefer building upon established foundations rather than constant change.",
        strength: stabilityOriented >= 2 ? "High" : "Moderate"
      });
    }

    // Risk Tolerance
    const riskAnswers = answers.filter(answer => {
      const question = quizQuestions.find(q => q.id === answer.questionId);
      return question?.category === "Risk Tolerance";
    });
    
    const highRisk = riskAnswers.filter(a => a.selectedOption === 0).length;
    const lowRisk = riskAnswers.filter(a => a.selectedOption === 2 || a.selectedOption === 3).length;
    
    if (highRisk > lowRisk) {
      traitProfiles.push({
        category: "Risk Tolerance",
        trait: "Uncertainty-Embracing",
        description: "You thrive in uncertain situations and see unpredictability as opportunity for growth.",
        strength: highRisk >= 2 ? "High" : "Moderate"
      });
    } else {
      traitProfiles.push({
        category: "Risk Tolerance",
        trait: "Security-Seeking",
        description: "You prefer security and predictable outcomes, carefully weighing risks before making decisions.",
        strength: lowRisk >= 2 ? "High" : "Moderate"
      });
    }

    // Generate compatibility insights
    const compatibilityInsights: string[] = [
      "The uncomfortable truth: These patterns cause more relationship breakdowns than infidelity or dramatic conflicts, precisely because they're minimized until they become unmanageable.",
      
      "The paradox few understand: The intensity of initial attraction is often inversely proportional to long-term compatibility. The most powerful chemistry arises from the very polarities that become major sources of conflict.",
      
      "Why authentic love isn't enough: When fundamental needs and deep values create constant friction, no amount of compromise can truly resolve structural incompatibilities.",
      
      "This awareness isn't meant to sabotage promising relationships, but to distinguish between normal differences that create dynamic tension and those structural incompatibilities that no amount of love can overcome."
    ];

    // Add specific insights based on trait combinations
    const hasEvolutionFocus = traitProfiles.some(p => p.trait === "Evolution-Focused");
    const hasStabilityFocus = traitProfiles.some(p => p.trait === "Stability-Focused");
    const hasConnectionSeeking = traitProfiles.some(p => p.trait === "Connection-Seeking");
    const hasProcessingSolitude = traitProfiles.some(p => p.trait === "Processing-Through-Solitude");

    if (hasEvolutionFocus && hasStabilityFocus) {
      compatibilityInsights.push("Your profile shows both growth and stability tendencies - this suggests you seek evolution within secure foundations, which can be a balanced approach to relationships.");
    }

    if (hasConnectionSeeking && hasProcessingSolitude) {
      compatibilityInsights.push("You show both connection-seeking and solitary processing patterns - this suggests you may need both connection and space at different times, requiring clear communication with partners.");
    }

    return {
      traitProfiles,
      compatibilityInsights,
      answers
    };
  }, [answers]);

  const results = useMemo(() => {
    if (currentScreen === 'results') {
      return calculateResults();
    }
    return null;
  }, [currentScreen, calculateResults]);

  const shareResults = useCallback(async () => {
    if (!results) return;

    const dominantTraits = results.traitProfiles.map(p => p.trait).join(', ');
    const shareText = `I just discovered my relationship compatibility traits: ${dominantTraits}. Take the quiz to explore the 7 silent signs of incompatibility!`;
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
