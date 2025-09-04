import React, { useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import { QuizButton } from '@/components/ui/quiz-button';
import { Timer } from '@/components/Timer';
import { ProgressBar } from '@/components/ProgressBar';
import { Layout } from '@/components/layout/Layout';
import { useQuiz } from '@/context/QuizContext';
import { useToast } from '@/hooks/use-toast';
import { 
  QuestionCard, 
  QuestionHeader, 
  QuestionOptions, 
  QuestionNavigation 
} from '@/components/quiz';

export default function Quiz() {
  const {
    state,
    selectAnswer,
    nextQuestion,
    previousQuestion,
    finishQuiz,
    resetTimer,
  } = useQuiz();
  const navigate = useNavigate();
  const { toast } = useToast();

  const {
    questions,
    currentQuestionIndex,
    userAnswers,
    isCompleted,
    timeLeft,
  } = state;

  const currentQuestion = questions[currentQuestionIndex];
  const selectedAnswer = userAnswers[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  // Redirect to home if no questions
  useEffect(() => {
    if (!questions.length && !state.isLoading) {
      navigate('/');
      toast({
        title: "No Quiz Found",
        description: "Please start a new quiz from the home page.",
        variant: "destructive",
      });
    }
  }, [questions.length, navigate, toast, state.isLoading]);

  // Handle quiz completion
  useEffect(() => {
    if (isCompleted) {
      navigate('/results');
    }
  }, [isCompleted, navigate]);

  // Auto-advance when timer reaches 0
  const handleTimeUp = useCallback(() => {
    if (isLastQuestion) {
      finishQuiz();
    } else {
      nextQuestion();
    }
    toast({
      title: "Time's Up!",
      description: "Moving to the next question.",
    });
  }, [isLastQuestion, finishQuiz, nextQuestion, toast]);

  const handleAnswerSelect = (answer: string) => {
    selectAnswer(answer);
  };

  const handleNext = () => {
    if (isLastQuestion) {
      finishQuiz();
      toast({
        title: "Quiz Completed!",
        description: "Let's see how you did!",
      });
    } else {
      nextQuestion();
    }
  };

  const handlePrevious = () => {
    previousQuestion();
  };

  if (!currentQuestion) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="quiz-card p-8 text-center max-w-md">
            <div className="quiz-pulse text-quiz-primary text-6xl mb-4">🧠</div>
            <h2 className="text-2xl font-bold mb-4">Loading Quiz...</h2>
            <p className="text-muted-foreground">
              Please wait while we prepare your questions.
            </p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen flex flex-col">
        <div className="flex-1 container mx-auto px-2 sm:px-4 py-2 flex flex-col max-w-4xl">
          <div className="w-full flex-1 flex flex-col">
            {/* Header: Progress Bar and Timer in compact layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 sm:gap-3 mb-2">
              <ProgressBar current={currentQuestionIndex} total={questions.length} />
              <Timer onTimeUp={handleTimeUp} />
            </div>

            {/* Main Question Card - takes remaining space */}
            <QuestionCard className="flex-1">
              <QuestionHeader
                question={currentQuestion.question}
                category={currentQuestion.category}
                questionNumber={currentQuestionIndex + 1}
                totalQuestions={questions.length}
              />

              <QuestionOptions
                options={currentQuestion.options}
                selectedAnswer={selectedAnswer}
                onAnswerSelect={handleAnswerSelect}
              />

              <QuestionNavigation
                currentIndex={currentQuestionIndex}
                totalQuestions={questions.length}
                userAnswers={userAnswers}
                isLastQuestion={isLastQuestion}
                hasSelectedAnswer={!!selectedAnswer}
                onPrevious={handlePrevious}
                onNext={handleNext}
              />
            </QuestionCard>
          </div>
        </div>
      </div>
    </Layout>
  );
}