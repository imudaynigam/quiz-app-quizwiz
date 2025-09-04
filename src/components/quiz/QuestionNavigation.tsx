import React from 'react';
import { ArrowLeft, ArrowRight, CheckCircle } from 'lucide-react';
import { QuizButton } from '@/components/ui/quiz-button';
import { cn } from '@/lib/utils';

interface QuestionNavigationProps {
  currentIndex: number;
  totalQuestions: number;
  userAnswers: (string | undefined)[];
  isLastQuestion: boolean;
  hasSelectedAnswer: boolean;
  onPrevious: () => void;
  onNext: () => void;
  className?: string;
}

export const QuestionNavigation: React.FC<QuestionNavigationProps> = ({
  currentIndex,
  totalQuestions,
  userAnswers,
  isLastQuestion,
  hasSelectedAnswer,
  onPrevious,
  onNext,
  className
}) => {
  return (
    <div className={cn(
      "flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-0 pt-4 border-t border-border/50",
      "bg-gradient-to-r from-transparent via-muted/20 to-transparent",
      "backdrop-blur-sm rounded-b-lg -mx-3 sm:-mx-6 -mb-3 sm:-mb-6 px-3 sm:px-6 pb-3 sm:pb-6",
      className
    )}>
      {/* Mobile Layout */}
      <div className="sm:hidden w-full">
        {/* Progress Dots - Mobile */}
        <div className="flex justify-center gap-2 mb-3">
          {userAnswers.map((_, index) => {
            const isCurrent = index === currentIndex;
            const isAnswered = userAnswers[index] !== undefined;
            const isPast = index < currentIndex;
            
            return (
              <div
                key={`dot-mobile-${index}`}
                className={cn(
                  "w-3 h-3 rounded-full transition-all duration-300",
                  "hover:scale-125 cursor-pointer",
                  isCurrent && "bg-quiz-primary scale-125 shadow-lg shadow-quiz-primary/50 quiz-dot-pulse",
                  isAnswered && !isCurrent && "bg-quiz-success scale-110",
                  !isAnswered && !isCurrent && "bg-muted hover:bg-muted-foreground/50"
                )}
                title={`Question ${index + 1}${isAnswered ? ' (Answered)' : ''}`}
              />
            );
          })}
        </div>
        
        {/* Navigation Buttons - Mobile */}
        <div className="flex justify-between gap-3">
          <QuizButton
            variant="outline"
            size="sm"
            onClick={onPrevious}
            disabled={currentIndex === 0}
            className={cn(
              "transition-all duration-200 flex-1",
              "hover:scale-105 active:scale-95",
              currentIndex === 0 && "opacity-50 cursor-not-allowed"
            )}
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            <span className="text-xs">Previous</span>
          </QuizButton>

          <QuizButton
            variant={isLastQuestion ? "quizSuccess" : "quiz"}
            size="sm"
            onClick={onNext}
            disabled={!hasSelectedAnswer}
            className={cn(
              "transition-all duration-200 flex-1",
              "hover:scale-105 active:scale-95",
              !hasSelectedAnswer && "opacity-50 cursor-not-allowed"
            )}
          >
            {isLastQuestion ? (
              <>
                <CheckCircle className="w-4 h-4 mr-1" />
                <span className="text-xs">Finish</span>
              </>
            ) : (
              <>
                <span className="text-xs">Next</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </>
            )}
          </QuizButton>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden sm:flex w-full justify-between items-center">
        {/* Previous Button */}
        <QuizButton
          variant="outline"
          size="default"
          onClick={onPrevious}
          disabled={currentIndex === 0}
          className={cn(
            "transition-all duration-200",
            "hover:scale-105 active:scale-95",
            currentIndex === 0 && "opacity-50 cursor-not-allowed"
          )}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Previous
        </QuizButton>

        {/* Progress Dots - Desktop */}
        <div className="flex gap-2">
          {userAnswers.map((_, index) => {
            const isCurrent = index === currentIndex;
            const isAnswered = userAnswers[index] !== undefined;
            const isPast = index < currentIndex;
            
            return (
              <div
                key={`dot-desktop-${index}`}
                className={cn(
                  "w-3 h-3 rounded-full transition-all duration-300",
                  "hover:scale-125 cursor-pointer",
                  isCurrent && "bg-quiz-primary scale-125 shadow-lg shadow-quiz-primary/50 quiz-dot-pulse",
                  isAnswered && !isCurrent && "bg-quiz-success scale-110",
                  !isAnswered && !isCurrent && "bg-muted hover:bg-muted-foreground/50"
                )}
                title={`Question ${index + 1}${isAnswered ? ' (Answered)' : ''}`}
              />
            );
          })}
        </div>

        {/* Next/Finish Button */}
        <QuizButton
          variant={isLastQuestion ? "quizSuccess" : "quiz"}
          size="default"
          onClick={onNext}
          disabled={!hasSelectedAnswer}
          className={cn(
            "transition-all duration-200",
            "hover:scale-105 active:scale-95",
            !hasSelectedAnswer && "opacity-50 cursor-not-allowed"
          )}
        >
          {isLastQuestion ? (
            <>
              <CheckCircle className="w-4 h-4 mr-2" />
              Finish Quiz
            </>
          ) : (
            <>
              Next Question
              <ArrowRight className="w-4 h-4 ml-2" />
            </>
          )}
        </QuizButton>
      </div>
    </div>
  );
};
