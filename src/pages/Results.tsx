import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { RotateCcw, Home, CheckCircle, XCircle, Star } from 'lucide-react';
import { QuizButton } from '@/components/ui/quiz-button';
import { Layout } from '@/components/layout/Layout';
import { useQuiz } from '@/context/QuizContext';
import { useToast } from '@/hooks/use-toast';

export default function Results() {
  const { state, resetQuiz, saveHighScore } = useQuiz();
  const navigate = useNavigate();
  const { toast } = useToast();

  const { questions, userAnswers, score, difficulty } = state;

  // Redirect to home if no quiz data
  useEffect(() => {
    if (!questions.length) {
      navigate('/');
      toast({
        title: "No Results Found",
        description: "Please complete a quiz first to see results.",
        variant: "destructive",
      });
      return;
    }

    // Save high score
    saveHighScore();
  }, [questions.length, navigate, toast, saveHighScore]);

  const percentage = Math.round((score / questions.length) * 100);
  
  const getPerformanceMessage = () => {
    if (percentage >= 90) return "Outstanding! You're a quiz master! 🏆";
    if (percentage >= 80) return "Excellent work! You know your stuff! 🌟";
    if (percentage >= 70) return "Good job! You're on the right track! 👏";
    if (percentage >= 60) return "Not bad! Keep practicing! 💪";
    return "Don't give up! Practice makes perfect! 🎯";
  };

  const getPerformanceColor = () => {
    if (percentage >= 80) return "text-quiz-success";
    if (percentage >= 60) return "text-quiz-warning";
    return "text-quiz-danger";
  };

  const getStarRating = () => {
    if (percentage >= 90) return 5;
    if (percentage >= 80) return 4;
    if (percentage >= 70) return 3;
    if (percentage >= 60) return 2;
    return 1;
  };

  const handleRestart = () => {
    resetQuiz();
    navigate('/');
    toast({
      title: "Ready for Another Quiz?",
      description: "Choose your difficulty and start fresh!",
    });
  };

  const handleGoHome = () => {
    resetQuiz();
    navigate('/');
  };

  if (!questions.length) {
    return null;
  }

  return (
    <Layout showSocialLinks={true}>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Score Summary */}
          <div className="quiz-card p-8 mb-8 text-center">
            <div className="mb-6">
              <div className="text-6xl md:text-8xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-4">
                {score}/{questions.length}
              </div>
              <div className={`text-3xl font-bold mb-4 ${getPerformanceColor()}`}>
                {percentage}%
              </div>
              <div className="flex justify-center gap-1 mb-4">
                {[...Array(5)].map((_, index) => (
                  <Star
                    key={index}
                    className={`w-8 h-8 ${
                      index < getStarRating()
                        ? 'text-quiz-warning fill-current'
                        : 'text-muted-foreground'
                    }`}
                  />
                ))}
              </div>
              <p className="text-xl text-muted-foreground mb-4">
                {getPerformanceMessage()}
              </p>
              <div className="inline-block px-4 py-2 bg-quiz-primary/10 text-quiz-primary rounded-full font-medium">
                Difficulty: {difficulty.toUpperCase()}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <QuizButton
                variant="quiz"
                size="xl"
                onClick={handleRestart}
                className="flex-1 sm:flex-none"
              >
                <RotateCcw className="w-5 h-5 mr-2" />
                Restart Quiz
              </QuizButton>
              <QuizButton
                variant="outline"
                size="xl"
                onClick={handleGoHome}
                className="flex-1 sm:flex-none"
              >
                <Home className="w-5 h-5 mr-2" />
                Home
              </QuizButton>
            </div>
          </div>

          {/* Detailed Results */}
          <div className="quiz-card p-8">
            <h2 className="text-2xl font-bold mb-6">Question Review</h2>
            <div className="space-y-6">
              {questions.map((question, index) => {
                const userAnswer = userAnswers[index];
                const isCorrect = userAnswer === question.answer;
                const wasAnswered = userAnswer !== null;

                return (
                  <div
                    key={question.id}
                    className="border border-border rounded-lg p-6 bg-muted/30"
                  >
                    <div className="flex items-start gap-4 mb-4">
                      <div className="flex-shrink-0">
                        {isCorrect ? (
                          <CheckCircle className="w-6 h-6 text-quiz-success" />
                        ) : (
                          <XCircle className="w-6 h-6 text-quiz-danger" />
                        )}
                      </div>
                      <div className="flex-grow">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-sm font-medium text-muted-foreground">
                            Question {index + 1}
                          </span>
                          <span className={`text-sm font-medium ${
                            isCorrect ? 'text-quiz-success' : 'text-quiz-danger'
                          }`}>
                            {isCorrect ? 'Correct' : wasAnswered ? 'Incorrect' : 'Not Answered'}
                          </span>
                        </div>
                        <p className="text-lg font-medium mb-4">{question.question}</p>
                        
                        <div className="space-y-2">
                          {wasAnswered && (
                            <div className="flex items-center gap-2">
                              <span className="text-sm text-muted-foreground">Your answer:</span>
                              <span className={`font-medium ${
                                isCorrect ? 'text-quiz-success' : 'text-quiz-danger'
                              }`}>
                                {userAnswer}
                              </span>
                            </div>
                          )}
                          
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-muted-foreground">Correct answer:</span>
                            <span className="font-medium text-quiz-success">
                              {question.answer}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}