export interface QuizQuestion {
  id: number;
  category: string;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

export interface QuizAnswer {
  questionId: number;
  selectedOption: number;
  isCorrect: boolean;
}

export interface TraitProfile {
  category: string;
  trait: string;
  description: string;
  strength: 'High' | 'Moderate' | 'Low';
}

export interface QuizResults {
  traitProfiles: TraitProfile[];
  compatibilityInsights: string[];
  answers: QuizAnswer[];
}

export type QuizScreen = 'welcome' | 'quiz' | 'results';
