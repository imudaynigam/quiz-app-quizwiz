import React, { useState } from "react";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import { useNavigate, useLocation } from "react-router-dom";
import { Menu, X, Home, Play, Trophy, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { useQuiz } from "@/context/QuizContext";
import { useToast } from "@/hooks/use-toast";

interface NavbarProps {
  className?: string;
}

export const Navbar: React.FC<NavbarProps> = ({ className }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { state, getHighScores } = useQuiz();
  const { toast } = useToast();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menuItems = [
    { label: "Home", icon: Home, path: "/", action: "navigate" },
    { label: "Start Quiz", icon: Play, path: "/", action: "start-quiz" },
    {
      label: "Results",
      icon: Trophy,
      path: "/results",
      action: "view-results",
    },
  ];

  const handleMenuAction = (item: (typeof menuItems)[0]) => {
    setIsMobileMenuOpen(false);

    switch (item.action) {
      case "navigate":
        navigate(item.path);
        break;

      case "start-quiz":
        // Navigate to home page where users can select difficulty
        navigate("/");
        // Scroll to quiz setup section after navigation
        setTimeout(() => {
          const element = document.querySelector("[data-quiz-setup]");
          if (element) {
            element.scrollIntoView({ behavior: "smooth" });
          }
        }, 100);
        break;

      case "view-results":
        // Check if there are any completed results
        const highScores = getHighScores();
        if (highScores.length > 0 || state.isCompleted) {
          navigate("/results");
          toast({
            title: "No Results Available",
            description: "Complete a quiz first to view your results.",
            variant: "destructive",
          });
          navigate("/");
        }
        break;

      default:
        navigate(item.path);
    }
  };

  const isQuizPage = location.pathname === "/quiz";

  const isActive = (item: (typeof menuItems)[0]) => {
    if (item.action === "start-quiz") {
      // Show as active if we're on home page
      return location.pathname === "/";
    }
    return location.pathname === item.path;
  };

  return (
    <nav
      className={`bg-background border-b border-border sticky top-0 z-50 shadow-sm ${className}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`flex justify-between items-center ${
            isQuizPage ? "h-12" : "h-16"
          }`}
        >
          {isQuizPage ? (
            // Minimized Quiz Navbar
            <>
              {/* Compact Logo */}
              <div
                className="flex items-center cursor-pointer"
                onClick={() => navigate("/")}
              >
                <img
                  src="/favicon.png"
                  alt="QuizWiz Logo"
                  className="h-6 w-6 mr-2"
                />
                <span className="text-lg font-bold text-foreground">
                  QuizWiz
                </span>
              </div>

              {/* Quiz Controls */}
              <div className="flex items-center space-x-3">
                {/* Quiz Difficulty - Desktop */}
                {state.difficulty && (
                  <div className="hidden sm:flex items-center px-2 py-1 bg-muted rounded text-xs font-medium text-foreground">
                    <BarChart3 className="h-3 w-3 mr-1 text-muted-foreground" />
                    {state.difficulty}
                  </div>
                )}

                {/* Theme Toggle */}
                <ThemeToggle />

                {/* Exit Quiz Button */}
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-xs px-2 py-1 h-8 hidden sm:flex"
                    >
                      <X className="h-4 w-4 mr-1" />
                      <span className="hidden sm:inline">Exit</span>
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Exit Quiz?</AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to exit the quiz? Your progress
                        will be lost.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => {
                          navigate("/");
                          toast({
                            title: "Quiz Exited",
                            description:
                              "You have successfully exited the quiz. Your progress has been lost.",
                            variant: "destructive",
                          });
                        }}
                      >
                        Exit Quiz
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>

                {/* Mobile menu button for quiz page */}
                <div className="sm:hidden">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  >
                    {isMobileMenuOpen ? (
                      <X className="h-5 w-5" />
                    ) : (
                      <Menu className="h-5 w-5" />
                    )}
                  </Button>
                </div>
              </div>
            </>
          ) : (
            // Full Navbar for other pages
            <>
              {/* Logo */}
              <div
                className="flex items-center cursor-pointer"
                onClick={() => navigate("/")}
              >
                <img
                  src="/favicon.png"
                  alt="QuizWiz Logo"
                  className="h-8 w-8 mr-2"
                />
                <span className="text-xl font-bold text-foreground">
                  QuizWiz
                </span>
              </div>

              {/* Desktop Menu */}
              <div className="hidden md:flex items-center space-x-4">
                <div className="flex items-center space-x-6">
                  {menuItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.path + item.action}
                        onClick={() => handleMenuAction(item)}
                        className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                          isActive(item)
                            ? "text-primary bg-primary/10"
                            : "text-muted-foreground hover:text-primary hover:bg-accent"
                        }`}
                      >
                        <Icon className="h-4 w-4 mr-2" />
                        {item.label}
                      </button>
                    );
                  })}
                </div>

                {/* Theme Toggle */}
                <ThemeToggle />
              </div>

              {/* Mobile menu button */}
              <div className="md:hidden">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                  {isMobileMenuOpen ? (
                    <X className="h-6 w-6" />
                  ) : (
                    <Menu className="h-6 w-6" />
                  )}
                </Button>
              </div>
            </>
          )}
        </div>

        {/* Mobile Menu - Only show for non-quiz pages */}
        {!isQuizPage && isMobileMenuOpen && (
          <div className="md:hidden border-t border-border">
            <div className="pt-2 pb-3 space-y-1">
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.path + item.action}
                    onClick={() => handleMenuAction(item)}
                    className={`flex items-center w-full px-3 py-2 text-base font-medium rounded-md transition-colors ${
                      isActive(item)
                        ? "text-primary bg-primary/10"
                        : "text-muted-foreground hover:text-primary hover:bg-accent"
                    }`}
                  >
                    <Icon className="h-5 w-5 mr-3" />
                    {item.label}
                  </button>
                );
              })}

              {/* Mobile Theme Toggle */}
              <div className="flex items-center px-3 py-2">
                <span className="text-sm font-medium text-muted-foreground mr-3">
                  Theme:
                </span>
                <ThemeToggle />
              </div>
            </div>
          </div>
        )}

        {/* Quiz Mobile Info - Only show on quiz page when menu is open */}
        {isQuizPage && isMobileMenuOpen && (
          <div className="md:hidden border-t border-border">
            <div className="pt-2 pb-3 space-y-1">
              {state.difficulty && (
                <div className="flex items-center px-3 py-2 bg-muted rounded-md mx-3">
                  <BarChart3 className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="text-sm font-medium text-foreground">
                    Difficulty: {state.difficulty}
                  </span>
                </div>
              )}

              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <button className="flex items-center w-full px-3 py-2 text-base font-medium rounded-md transition-colors text-destructive hover:bg-destructive/10">
                    <X className="h-5 w-5 mr-3" />
                    Exit Quiz
                  </button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Exit Quiz?</AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure you want to exit the quiz? Your progress will
                      be lost.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => {
                        navigate("/");
                        setIsMobileMenuOpen(false);
                        toast({
                          title: "Quiz Exited",
                          description:
                            "You have successfully exited the quiz. Your progress has been lost.",
                          variant: "destructive",
                        });
                      }}
                    >
                      Exit Quiz
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
