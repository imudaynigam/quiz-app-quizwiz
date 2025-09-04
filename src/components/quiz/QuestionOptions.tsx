/**
 * Question Options Component
 *
 * Interactive component for displaying and selecting quiz answer options.
 * Implements responsive design with visual feedback for user interactions.
 *
 * Features:
 * - Letter-based option labeling (A, B, C, D)
 * - Visual selection states with smooth animations
 * - Responsive typography and spacing
 * - Accessibility support with proper ARIA states
 * - Glass-morphism hover effects
 *
 * Design Decisions:
 * - Uses QuizButton for consistent styling across the app
 * - Implements visual hierarchy with letter labels and selection indicators
 * - Responsive breakpoints for mobile-first design
 * - Hover effects provide clear interaction feedback
 */

import React from "react";
import { CheckCircle, Circle } from "lucide-react";
import { QuizButton } from "@/components/ui/quiz-button";
import { cn } from "@/lib/utils";

/** Props interface for QuestionOptions component */
interface QuestionOptionsProps {
  /** Array of answer options to display */
  options: string[];
  /** Currently selected answer (if any) */
  selectedAnswer?: string;
  /** Callback function when user selects an answer */
  onAnswerSelect: (answer: string) => void;
  /** Additional CSS classes for styling customization */
  className?: string;
}

/**
 * Question Options Component
 *
 * Renders a list of selectable answer options with visual feedback.
 * Each option includes a letter label, answer text, and selection indicator.
 */
export const QuestionOptions: React.FC<QuestionOptionsProps> = ({
  options,
  selectedAnswer,
  onAnswerSelect,
  className,
}) => {
  return (
    <div
      className={cn(
        "grid gap-2 sm:gap-3 flex-1 mb-4 sm:mb-6 w-full", // w-full ensures grid fills card
        className
      )}
    >
      {options.map((option, index) => {
        // Determine if this option is currently selected
        const isSelected = selectedAnswer === option;

        // Generate letter label (A, B, C, D, etc.)
        // Uses ASCII conversion: A=65, B=66, C=67...
        const optionLetter = String.fromCharCode(65 + index);

        return (
          <QuizButton
            key={`option-${index}`}
            variant={isSelected ? "quizOptionSelected" : "quizOption"}
            size="quizOption"
            onClick={() => onAnswerSelect(option)}
            className={cn(
              // Base layout and spacing
              "text-left justify-start p-3 sm:p-4 min-h-[50px] sm:min-h-[60px]",
              // Smooth hover animations
              "quiz-option-hover transition-all duration-200 ease-out",
              // Interactive scaling and shadow effects
              "hover:scale-[1.02] hover:shadow-md",
              // Group hover support for child elements
              "group relative overflow-hidden"
            )}
          >
            {/* Option content container */}
            <div className="flex items-center gap-2 sm:gap-4 w-full">
              {/* Letter Label Circle */}
              <div
                className={cn(
                  // Base styles for circular letter indicator
                  "flex-shrink-0 w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center font-bold text-xs sm:text-sm",
                  // Smooth color transitions
                  "transition-all duration-200",
                  // Conditional styling based on selection state
                  isSelected
                    ? "bg-white/20 text-white" // Selected: white overlay on quiz primary
                    : "bg-muted text-muted-foreground group-hover:bg-quiz-primary/20 group-hover:text-quiz-primary" // Unselected: muted with hover effects
                )}
              >
                {optionLetter}
              </div>

              {/* Answer Text */}
              <span className="flex-grow text-xs sm:text-sm leading-relaxed font-medium break-words">
                {option}
              </span>

              {/* Selection Indicator Icon */}
              <div className="flex-shrink-0">
                {isSelected ? (
                  // Selected state: filled checkmark with animation
                  <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-white animate-in zoom-in-50 duration-200" />
                ) : (
                  // Unselected state: empty circle with hover effect
                  <Circle className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground group-hover:text-quiz-primary transition-colors duration-200" />
                )}
              </div>
            </div>

            {/* Subtle Hover Effect Overlay */}
            {/* Creates gradient overlay that appears on hover for enhanced visual feedback */}
            <div className="absolute inset-0 bg-gradient-to-r from-quiz-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none" />
          </QuizButton>
        );
      })}
    </div>
  );
};
