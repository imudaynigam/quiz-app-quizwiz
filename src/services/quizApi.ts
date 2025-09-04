import { ApiResponse, QuizQuestion, Difficulty } from '@/types/quiz';

const API_BASE_URL = 'https://opentdb.com/api.php';

const decodeHtmlEntities = (text: string): string => {
  const textarea = document.createElement('textarea');
  textarea.innerHTML = text;
  return textarea.value;
};

const shuffleArray = <T>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export const fetchQuizQuestions = async (difficulty: Difficulty): Promise<QuizQuestion[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}?amount=10&difficulty=${difficulty}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch questions');
    }
    
    const data: ApiResponse = await response.json();
    
    if (data.response_code !== 0) {
      throw new Error('No questions available for this difficulty');
    }
    
    return data.results.map((apiQuestion, index) => {
      const decodedQuestion = decodeHtmlEntities(apiQuestion.question);
      const decodedCorrectAnswer = decodeHtmlEntities(apiQuestion.correct_answer);
      const decodedIncorrectAnswers = apiQuestion.incorrect_answers.map(decodeHtmlEntities);
      
      const allOptions = [decodedCorrectAnswer, ...decodedIncorrectAnswers];
      const shuffledOptions = shuffleArray(allOptions);
      
      return {
        id: `question-${index}`,
        question: decodedQuestion,
        options: shuffledOptions,
        answer: decodedCorrectAnswer,
        category: apiQuestion.category,
        difficulty: apiQuestion.difficulty,
        type: apiQuestion.type,
      };
    });
  } catch (error) {
    console.error('Error fetching quiz questions:', error);
    throw error;
  }
};