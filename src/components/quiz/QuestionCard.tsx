import React from "react";
import { cn } from "@/lib/utils";

interface QuestionCardProps {
  children: React.ReactNode;
  className?: string;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  children,
  className,
}) => {
  return (
    <div
      className={cn(
        "quiz-card-glass p-3 sm:p-6 flex-1 flex flex-col min-h-0",
        "quiz-card-enter transition-all duration-300 ease-out",
        "hover:shadow-lg hover:scale-[1.01]",
        // Removed overflow-hidden to prevent cutting borders
        "w-full md:w-auto", // Ensure full width on mobile, auto on desktop
        className
      )}
      // Remove any inline style or maxWidth
    >
      {children}
    </div>
  );
};
