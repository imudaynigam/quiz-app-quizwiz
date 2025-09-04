export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  answer: string;
  category?: string;
  difficulty?: string;
  type?: string;
}

export interface ApiQuestion {
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
  category: string;
  difficulty: string;
  type: string;
}

export interface ApiResponse {
  response_code: number;
  results: ApiQuestion[];
}

export type Difficulty = 'easy' | 'medium' | 'hard';

export interface QuizState {
  questions: QuizQuestion[];
  currentQuestionIndex: number;
  userAnswers: (string | null)[];
  score: number;
  isCompleted: boolean;
  difficulty: Difficulty;
  timeLeft: number;
  isLoading: boolean;
  error: string | null;
}

export interface HighScore {
  score: number;
  totalQuestions: number;
  difficulty: Difficulty;
  date: string;
}