import React, { useEffect } from 'react';
import { Clock } from 'lucide-react';
import { useQuiz } from '@/context/QuizContext';

interface TimerProps {
  onTimeUp: () => void;
}

export const Timer: React.FC<TimerProps> = ({ onTimeUp }) => {
  const { state, decrementTimer } = useQuiz();
  const { timeLeft } = state;

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => {
        decrementTimer();
      }, 1000);

      return () => clearTimeout(timer);
    } else {
      onTimeUp();
    }
  }, [timeLeft, decrementTimer, onTimeUp]);

  const getTimerColor = () => {
    if (timeLeft > 20) return 'text-quiz-success';
    if (timeLeft > 10) return 'text-quiz-warning';
    return 'text-quiz-danger';
  };

  const getProgressWidth = () => {
    return (timeLeft / 30) * 100;
  };

  return (
    <div className="quiz-card p-3">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Clock className={`w-4 h-4 ${getTimerColor()}`} />
          <span className="text-xs font-medium text-muted-foreground">Time</span>
        </div>
        <span className={`text-lg font-bold ${getTimerColor()}`}>
          {timeLeft}s
        </span>
      </div>
      <div className="w-full bg-muted rounded-full h-1.5">
        <div
          className={`h-1.5 rounded-full transition-all duration-1000 ease-linear ${
            timeLeft > 10 ? 'bg-quiz-primary' : 'bg-quiz-danger'
          }`}
          style={{ width: `${getProgressWidth()}%` }}
        />
      </div>
      {timeLeft <= 5 && (
        <div className="text-center mt-1">
          <span className="text-quiz-danger font-semibold animate-pulse text-xs">
            Hurry up!
          </span>
        </div>
      )}
    </div>
  );
};