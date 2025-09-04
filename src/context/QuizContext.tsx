/**
 * Quiz State Management Context
 * 
 * Centralized state management for the entire quiz application using React's
 * useReducer pattern. This context handles all quiz-related state including
 * questions, user answers, scoring, navigation, and persistence.
 * 
 * Architecture Pattern: Reducer + Context API
 * - Provides predictable state updates through actions
 * - Enables complex state logic while maintaining immutability
 * - Offers better performance than multiple useState calls
 */

import React, { createContext, useContext, useReducer, useCallback } from 'react';
import { QuizState, QuizQuestion, Difficulty, HighScore } from '@/types/quiz';

/**
 * Quiz Context Interface
 * 
 * Defines all available operations for quiz state management.
 * This interface serves as the contract between the context and consumers.
 */
interface QuizContextType {
  // Current state
  state: QuizState;
  
  // Quiz lifecycle actions
  startQuiz: (difficulty: Difficulty) => void;
  setQuestions: (questions: QuizQuestion[]) => void;
  finishQuiz: () => void;
  resetQuiz: () => void;
  
  // Answer and navigation actions
  selectAnswer: (answer: string) => void;
  nextQuestion: () => void;
  previousQuestion: () => void;
  
  // UI state actions
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  
  // Timer management
  decrementTimer: () => void;
  resetTimer: () => void;
  
  // High score management
  getHighScores: () => HighScore[];
  saveHighScore: () => void;
}

/**
 * Quiz Action Types
 * 
 * Defines all possible actions that can be dispatched to modify quiz state.
 * Uses discriminated union pattern for type safety and better IntelliSense.
 */
type QuizAction =
  | { type: 'START_QUIZ'; payload: Difficulty }
  | { type: 'SET_QUESTIONS'; payload: QuizQuestion[] }
  | { type: 'SELECT_ANSWER'; payload: string }
  | { type: 'NEXT_QUESTION' }
  | { type: 'PREVIOUS_QUESTION' }
  | { type: 'FINISH_QUIZ' }
  | { type: 'RESET_QUIZ' }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'DECREMENT_TIMER' }
  | { type: 'RESET_TIMER' };

/**
 * Initial Quiz State
 * 
 * Defines the default state when the quiz application starts.
 * This ensures consistent initialization across all quiz sessions.
 */
const initialState: QuizState = {
  questions: [],                    // Quiz questions array
  currentQuestionIndex: 0,          // Current question position
  userAnswers: [],                  // Array of user's selected answers
  score: 0,                         // Final calculated score
  isCompleted: false,               // Quiz completion status
  difficulty: 'easy',               // Default difficulty level
  timeLeft: 30,                     // Timer for current question (seconds)
  isLoading: false,                 // Loading state for async operations
  error: null,                      // Error message for user feedback
};

const quizReducer = (state: QuizState, action: QuizAction): QuizState => {
  switch (action.type) {
    case 'START_QUIZ':
      return {
        ...initialState,
        difficulty: action.payload,
        isLoading: true,
      };
    case 'SET_QUESTIONS':
      return {
        ...state,
        questions: action.payload,
        userAnswers: new Array(action.payload.length).fill(null),
        isLoading: false,
        error: null,
      };
    case 'SELECT_ANSWER':
      const newAnswers = [...state.userAnswers];
      newAnswers[state.currentQuestionIndex] = action.payload;
      return {
        ...state,
        userAnswers: newAnswers,
      };
    case 'NEXT_QUESTION':
      return {
        ...state,
        currentQuestionIndex: Math.min(state.currentQuestionIndex + 1, state.questions.length - 1),
        timeLeft: 30,
      };
    case 'PREVIOUS_QUESTION':
      return {
        ...state,
        currentQuestionIndex: Math.max(state.currentQuestionIndex - 1, 0),
        timeLeft: 30,
      };
    case 'FINISH_QUIZ':
      const score = state.userAnswers.reduce((acc, answer, index) => {
        return answer === state.questions[index]?.answer ? acc + 1 : acc;
      }, 0);
      return {
        ...state,
        score,
        isCompleted: true,
      };
    case 'RESET_QUIZ':
      return initialState;
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload,
      };
    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };
    case 'DECREMENT_TIMER':
      return {
        ...state,
        timeLeft: Math.max(state.timeLeft - 1, 0),
      };
    case 'RESET_TIMER':
      return {
        ...state,
        timeLeft: 30,
      };
    default:
      return state;
  }
};

/** Quiz context - undefined when used outside provider */
const QuizContext = createContext<QuizContextType | undefined>(undefined);

/**
 * Quiz Provider Component
 * 
 * Provides quiz state and actions to the entire component tree.
 * Uses useReducer for complex state management and useCallback for
 * performance optimization of action functions.
 */
export const QuizProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialize reducer with state and dispatch function
  const [state, dispatch] = useReducer(quizReducer, initialState);

  // Quiz lifecycle actions (memoized for performance)
  
  /**
   * Start a new quiz session with specified difficulty
   * Resets all state and triggers question loading
   */
  const startQuiz = useCallback((difficulty: Difficulty) => {
    dispatch({ type: 'START_QUIZ', payload: difficulty });
  }, []);

  /**
   * Set quiz questions after successful API fetch
   * Initializes answer tracking and clears loading state
   */
  const setQuestions = useCallback((questions: QuizQuestion[]) => {
    dispatch({ type: 'SET_QUESTIONS', payload: questions });
  }, []);

  /**
   * Record user's answer selection for current question
   * Allows users to change their answer before navigation
   */
  const selectAnswer = useCallback((answer: string) => {
    dispatch({ type: 'SELECT_ANSWER', payload: answer });
  }, []);

  /**
   * Navigate to the next question
   * Resets timer and enforces boundary limits
   */
  const nextQuestion = useCallback(() => {
    dispatch({ type: 'NEXT_QUESTION' });
  }, []);

  /**
   * Navigate to the previous question
   * Allows users to review and change previous answers
   */
  const previousQuestion = useCallback(() => {
    dispatch({ type: 'PREVIOUS_QUESTION' });
  }, []);

  /**
   * Complete the quiz and calculate final score
   * Triggers score calculation and result display
   */
  const finishQuiz = useCallback(() => {
    dispatch({ type: 'FINISH_QUIZ' });
  }, []);

  /**
   * Reset quiz to initial state
   * Used for starting new quiz sessions
   */
  const resetQuiz = useCallback(() => {
    dispatch({ type: 'RESET_QUIZ' });
  }, []);

  // UI state management actions
  
  /**
   * Update loading state for async operations
   * Used during question fetching and other API calls
   */
  const setLoading = useCallback((loading: boolean) => {
    dispatch({ type: 'SET_LOADING', payload: loading });
  }, []);

  /**
   * Set error message for user feedback
   * Automatically clears loading state on error
   */
  const setError = useCallback((error: string | null) => {
    dispatch({ type: 'SET_ERROR', payload: error });
  }, []);

  // Timer management actions
  
  /**
   * Decrement timer by one second
   * Used by interval-based timer implementation
   */
  const decrementTimer = useCallback(() => {
    dispatch({ type: 'DECREMENT_TIMER' });
  }, []);

  /**
   * Reset timer to default value (30 seconds)
   * Used when navigating between questions
   */
  const resetTimer = useCallback(() => {
    dispatch({ type: 'RESET_TIMER' });
  }, []);

  // High score management (localStorage-based persistence)
  
  /**
   * Retrieve high scores from localStorage
   * Returns empty array if no scores are saved
   */
  const getHighScores = useCallback((): HighScore[] => {
    const saved = localStorage.getItem('quiz-high-scores');
    return saved ? JSON.parse(saved) : [];
  }, []);

  /**
   * Save current quiz score to high scores
   * Maintains top 5 scores in localStorage, sorted by score
   * Only saves completed quizzes
   */
  const saveHighScore = useCallback(() => {
    if (state.isCompleted) {
      const highScores = getHighScores();
      
      // Create new high score entry
      const newScore: HighScore = {
        score: state.score,
        totalQuestions: state.questions.length,
        difficulty: state.difficulty,
        date: new Date().toISOString(),
      };
      
      // Add to existing scores and sort by score (descending)
      highScores.push(newScore);
      highScores.sort((a, b) => b.score - a.score);
      
      // Keep only top 5 scores to limit storage usage
      const topScores = highScores.slice(0, 5);
      localStorage.setItem('quiz-high-scores', JSON.stringify(topScores));
    }
  }, [state, getHighScores]);

  return (
    <QuizContext.Provider
      value={{
        state,
        startQuiz,
        setQuestions,
        selectAnswer,
        nextQuestion,
        previousQuestion,
        finishQuiz,
        resetQuiz,
        setLoading,
        setError,
        decrementTimer,
        resetTimer,
        getHighScores,
        saveHighScore,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};

export const useQuiz = () => {
  const context = useContext(QuizContext);
  if (context === undefined) {
    throw new Error('useQuiz must be used within a QuizProvider');
  }
  return context;
};
