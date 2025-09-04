/**
 * QuizButton Component
 * 
 * Specialized button component for quiz interfaces with multiple themed variants.
 * Built on top of Radix UI's Slot primitive for composition flexibility.
 * 
 * Design Features:
 * - Custom quiz-themed variants (quiz, quizSuccess, quizDanger)
 * - Specialized option button variants for question answers
 * - Glass-morphism effects with backdrop blur
 * - Smooth animations and micro-interactions
 * - Responsive sizing with mobile-first approach
 * 
 * Variants:
 * - quiz: Primary action buttons (Start Quiz, Next, etc.)
 * - quizOption: Answer option buttons (unselected state)
 * - quizOptionSelected: Answer option buttons (selected state)
 * - quizOptionCorrect/Incorrect: Result feedback buttons
 * 
 * Technical Implementation:
 * - Uses class-variance-authority for type-safe variant management
 * - Extends standard HTML button attributes
 * - Supports Radix UI Slot for composition patterns
 * - Integrated with Tailwind CSS utility classes
 */

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

/**
 * Quiz Button Variant Definitions
 * 
 * Uses class-variance-authority (CVA) for type-safe styling variants.
 * Each variant serves specific UI purposes within the quiz interface.
 */
const quizButtonVariants = cva(
  // Base styles applied to all button variants
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        // Standard button variants (inherited from shadcn/ui)
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-border/40 bg-card/80 backdrop-blur-sm hover:bg-card/90 hover:text-accent-foreground hover:border-border/60 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 transform hover:-translate-y-0.5",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        
        // Quiz-specific variants with enhanced visual effects
        
        /** Primary quiz action button (Start Quiz, Submit, etc.) */
        quiz: "quiz-button-primary text-white font-semibold border-0 shadow-lg hover:scale-105 active:scale-95 transform transition-all duration-300 hover:shadow-2xl hover:shadow-primary/25",
        
        /** Success state button (Quiz Complete, Correct Answer, etc.) */
        quizSuccess: "quiz-button-success text-white font-semibold border-0 shadow-lg hover:scale-105 active:scale-95 transform transition-all duration-300 hover:shadow-xl hover:shadow-quiz-success/25",
        
        /** Danger/Error state button (Exit Quiz, Wrong Answer, etc.) */
        quizDanger: "quiz-button-danger text-white font-semibold border-0 shadow-lg hover:scale-105 active:scale-95 transform transition-all duration-300 hover:shadow-xl hover:shadow-quiz-danger/25",
        
        /** Answer option button (unselected state) */
        quizOption: "bg-card text-card-foreground border-2 border-border hover:border-quiz-primary hover:bg-quiz-primary/10 transition-all duration-300 transform hover:scale-102 hover:shadow-md",
        
        /** Answer option button (selected state) - removed animate-pulse to fix blinking issue */
        quizOptionSelected: "bg-quiz-primary text-white border-2 border-quiz-primary shadow-glow transform scale-102 ring-2 ring-quiz-primary/50 ring-offset-2",
        
        /** Answer feedback buttons for results display */
        quizOptionCorrect: "quiz-button-success text-white border-2 border-quiz-success",
        quizOptionIncorrect: "quiz-button-danger text-white border-2 border-quiz-danger",
      },
      size: {
        // Standard size variants
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        xl: "h-14 rounded-lg px-12 text-lg",
        icon: "h-10 w-10",
        
        // Quiz-specific sizes
        /** Standard quiz action button size */
        quiz: "h-12 px-6 py-3 text-base",
        /** Answer option button size - flexible height for content */
        quizOption: "min-h-4 p-1 text-left",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

/** Props interface extending HTML button attributes with variant props */
export interface QuizButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof quizButtonVariants> {
  /** 
   * Render as child element instead of button
   * Useful for composition with other components
   */
  asChild?: boolean
}

/**
 * QuizButton Component
 * 
 * Flexible button component that supports multiple quiz-themed variants.
 * Can render as a button element or compose with child elements via Slot.
 */
const QuizButton = React.forwardRef<HTMLButtonElement, QuizButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    // Use Slot for composition or button for standard rendering
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(quizButtonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
QuizButton.displayName = "QuizButton"

export { QuizButton, quizButtonVariants }