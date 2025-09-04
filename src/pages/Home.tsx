import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Trophy, Play, Zap, Target, Star } from 'lucide-react';
import { QuizButton } from '@/components/ui/quiz-button';
import { Layout } from '@/components/layout/Layout';
import { useQuiz } from '@/context/QuizContext';
import { fetchQuizQuestions } from '@/services/quizApi';
import { Difficulty } from '@/types/quiz';
import { useToast } from '@/hooks/use-toast';

export default function Home() {
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty>('easy');
  const { startQuiz, setQuestions, setLoading, setError, getHighScores } = useQuiz();
  const navigate = useNavigate();
  const { toast } = useToast();

  const highScores = getHighScores();

  const handleStartQuiz = async () => {
    try {
      setLoading(true);
      startQuiz(selectedDifficulty);
      
      const questions = await fetchQuizQuestions(selectedDifficulty);
      setQuestions(questions);
      
      navigate('/quiz');
      toast({
        title: "Quiz Started!",
        description: `Good luck with the ${selectedDifficulty} difficulty quiz!`,
      });
    } catch (error) {
      setError('Failed to load quiz questions. Please try again.');
      toast({
        title: "Error",
        description: "Failed to load quiz questions. Please check your connection and try again.",
        variant: "destructive",
      });
    }
  };

  const getDifficultyColor = (difficulty: Difficulty) => {
    switch (difficulty) {
      case 'easy':
        return 'border-quiz-success bg-quiz-success/10 text-quiz-success';
      case 'medium':
        return 'border-quiz-warning bg-quiz-warning/10 text-quiz-warning';
      case 'hard':
        return 'border-quiz-danger bg-quiz-danger/10 text-quiz-danger';
    }
  };

  const getSelectedDifficultyColor = (difficulty: Difficulty) => {
    switch (difficulty) {
      case 'easy':
        return 'border-quiz-success bg-quiz-success text-white';
      case 'medium':
        return 'border-quiz-warning bg-quiz-warning text-white';
      case 'hard':
        return 'border-quiz-danger bg-quiz-danger text-white';
    }
  };

  return (
    <Layout showSocialLinks={true}>
      {/* Seamless Hero Section */}
      <div className="relative overflow-hidden">
        {/* Background gradient that fades into content */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/8 via-primary/3 to-transparent dark:from-primary/15 dark:via-primary/8 dark:to-transparent" />
        
        <div className="relative">
          {/* Hero Content */}
          <section className="pt-16 pb-8">
            <div className="container mx-auto px-4 text-center">
              <div className="flex items-center justify-center gap-3 mb-6">
                <img src="/favicon.png" alt="QuizWiz Logo" className="w-12 h-12 md:w-16 md:h-16" />
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground">
                  QuizWiz
                </h1>
              </div>
              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-4">
                Test your knowledge with our interactive trivia quiz!
              </p>
              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-12">
                Challenge yourself across different difficulty levels and track your progress.
              </p>
            </div>
          </section>
          
          {/* Main Content - Seamlessly blended */}
          <div className="container mx-auto px-4 pb-12">
            <div className="max-w-4xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-8">
                {/* Quiz Setup */}
                <div className="quiz-card-glass p-8 group relative overflow-hidden" data-quiz-setup>
                  {/* Enhanced background with animated gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-quiz-secondary/5 to-primary/8 opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
                  <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-quiz-secondary/20 rounded-xl blur opacity-30 group-hover:opacity-50 transition-opacity duration-500 -z-10" />
                  
                  <div className="relative z-10">
                    <div className="text-center mb-8">
                      <div className="flex items-center justify-center gap-3 mb-4">
                        <div className="p-3 rounded-full bg-gradient-to-r from-primary to-quiz-secondary shadow-lg">
                          <Play className="w-8 h-8 text-white" />
                        </div>
                        <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-quiz-secondary bg-clip-text text-transparent">
                          Start Your Quiz
                        </h2>
                      </div>
                      <p className="text-muted-foreground text-lg">
                        Challenge yourself with our interactive trivia!
                      </p>
                    </div>
                    <div className="mb-8">
                      <div className="flex items-center justify-center gap-2 mb-6">
                        <Target className="w-5 h-5 text-primary" />
                        <h3 className="text-lg font-semibold">Select Difficulty Level</h3>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {(['easy', 'medium', 'hard'] as Difficulty[]).map((difficulty) => {
                          const isSelected = selectedDifficulty === difficulty;
                          return (
                            <QuizButton
                              key={difficulty}
                              variant="outline"
                              className={`h-20 sm:h-24 text-base font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-xl relative overflow-hidden ${
                                isSelected
                                  ? getSelectedDifficultyColor(difficulty) + ' shadow-lg shadow-current/25'
                                  : getDifficultyColor(difficulty) + ' hover:shadow-md'
                              }`}
                              onClick={() => setSelectedDifficulty(difficulty)}
                            >
                              {/* Animated background for selected state */}
                              {isSelected && (
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
                              )}
                              
                              <div className="relative z-10 text-center">
                                <div className="flex items-center justify-center mb-1">
                                  {difficulty === 'easy' && <Zap className="w-4 h-4 mr-1" />}
                                  {difficulty === 'medium' && <Target className="w-4 h-4 mr-1" />}
                                  {difficulty === 'hard' && <Star className="w-4 h-4 mr-1" />}
                                  <div className="capitalize font-bold">{difficulty}</div>
                                </div>
                                <div className="text-xs opacity-80 flex justify-center gap-0.5">
                                  {Array.from({ length: difficulty === 'easy' ? 1 : difficulty === 'medium' ? 2 : 3 }).map((_, i) => (
                                    <Star key={i} className={`w-3 h-3 fill-current ${isSelected ? 'text-white' : 'text-current'}`} />
                                  ))}
                                </div>
                              </div>
                            </QuizButton>
                          );
                        })}
                      </div>
                    </div>

                    <div className="text-center">
                      <div className="relative group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-primary to-quiz-secondary rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
                        <QuizButton
                          variant="quiz"
                          size="xl"
                          onClick={handleStartQuiz}
                          className="relative w-full bg-gradient-to-r from-primary to-quiz-secondary hover:from-primary/90 hover:to-quiz-secondary/90 transform transition-all duration-300 hover:scale-105 shadow-2xl"
                        >
                          <Play className="w-6 h-6 mr-3 animate-pulse" />
                          <span className="font-bold text-lg">Start Quiz Adventure</span>
                        </QuizButton>
                      </div>
                      
                      <div className="mt-6 p-4 bg-muted/50 rounded-lg border border-border/50 backdrop-blur-sm">
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 text-sm text-muted-foreground">
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                            <span className="font-medium">10 Questions</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-quiz-secondary rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
                            <span className="font-medium">30s per question</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-quiz-warning rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
                            <span className="capitalize font-medium">{selectedDifficulty} Level</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* High Scores */}
                <div className="quiz-card-glass p-8 group relative overflow-hidden">
                  {/* Background glow effect */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-primary/8 to-primary/15 rounded-xl blur-sm group-hover:blur-md transition-all duration-500 dark:from-primary/15 dark:to-primary/25 -z-10" />
                    <div className="flex items-center gap-3 mb-6">
                      <Trophy className="w-8 h-8 text-quiz-warning" />
                      <h2 className="text-3xl font-bold">High Scores</h2>
                    </div>

                    {highScores.length > 0 ? (
                      <div className="space-y-4">
                        {highScores.map((score, index) => (
                          <div
                            key={`${score.date}-${index}`}
                            className="quiz-card-glass-sm flex items-center justify-between p-4 group cursor-pointer"
                          >
                            <div className="flex items-center gap-3">
                              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-quiz-primary to-quiz-secondary text-white font-bold text-sm shadow-md">
                                {index + 1}
                              </div>
                              <div>
                                <div className="font-semibold text-foreground">
                                  {score.score}/{score.totalQuestions}
                                </div>
                                <div className="text-sm text-muted-foreground capitalize">
                                  {score.difficulty} • {new Date(score.date).toLocaleDateString()}
                                </div>
                              </div>
                            </div>
                            <div className="text-2xl font-bold bg-gradient-to-r from-quiz-primary to-quiz-secondary bg-clip-text text-transparent">
                              {Math.round((score.score / score.totalQuestions) * 100)}%
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12">
                        <Trophy className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                        <p className="text-muted-foreground text-lg">
                          No high scores yet!
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Complete your first quiz to see your scores here.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}