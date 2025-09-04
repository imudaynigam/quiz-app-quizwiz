import React from 'react';
import { cn } from '@/lib/utils';

interface QuestionHeaderProps {
  question: string;
  category?: string;
  questionNumber?: number;
  totalQuestions?: number;
  className?: string;
}

export const QuestionHeader: React.FC<QuestionHeaderProps> = ({
  question,
  category,
  questionNumber,
  totalQuestions,
  className
}) => {
  return (
    <div className={cn("mb-4 sm:mb-6", className)}>
      {/* Question Number */}
      {(questionNumber !== undefined && totalQuestions !== undefined) && (
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 mb-3">
          <div className="quiz-badge-glass px-2 sm:px-3 py-1 text-xs sm:text-sm font-medium">
            Question {questionNumber} of {totalQuestions}
          </div>
          {category && (
            <div className="quiz-badge-glass px-2 sm:px-3 py-1 text-xs sm:text-sm font-medium text-quiz-primary">
              {category}
            </div>
          )}
        </div>
      )}
      
      {/* Question Text */}
      <h2 className="text-lg sm:text-xl md:text-2xl font-bold leading-tight text-foreground quiz-question-reveal break-words">
        {question}
      </h2>
      
      {/* Category only (if no question number) */}
      {category && questionNumber === undefined && (
        <div className="mt-3">
          <div className="inline-block px-3 py-1 bg-quiz-primary/10 text-quiz-primary rounded-full text-sm font-medium">
            {category}
          </div>
        </div>
      )}
    </div>
  );
};
