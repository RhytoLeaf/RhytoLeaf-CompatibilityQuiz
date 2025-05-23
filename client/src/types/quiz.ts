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

export interface CategoryScore {
  category: string;
  correct: number;
  total: number;
  percentage: number;
}

export interface QuizResults {
  totalScore: number;
  percentage: number;
  categoryScores: CategoryScore[];
  answers: QuizAnswer[];
  insights: string[];
}

export type QuizScreen = 'welcome' | 'quiz' | 'results';
