/**
 * QuizWiz Application Entry Point
 * 
 * This file sets up the main application structure with all necessary providers
 * and routing configuration. The architecture follows a provider composition pattern
 * to manage different aspects of the application state and functionality.
 */

// UI Components for notifications and tooltips
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";

// Data fetching and caching
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Routing
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Global state management contexts
import { QuizProvider } from "@/context/QuizContext";
import { ThemeProvider } from "@/context/ThemeContext";

// Page components
import Home from "./pages/Home";
import Quiz from "./pages/Quiz";
import Results from "./pages/Results";
import NotFound from "./pages/NotFound";

/**
 * Initialize TanStack Query client with default configuration
 * Used for caching and managing server state (quiz questions, etc.)
 */
const queryClient = new QueryClient();

/**
 * Main Application Component
 * 
 * Provider Hierarchy (from outermost to innermost):
 * 1. QueryClientProvider - Manages server state and caching
 * 2. ThemeProvider - Handles light/dark theme switching
 * 3. QuizProvider - Manages quiz state (questions, answers, scores)
 * 4. TooltipProvider - Enables tooltip functionality across the app
 * 5. BrowserRouter - Handles client-side routing
 * 
 * This structure ensures proper context access throughout the component tree
 * and follows React best practices for provider composition.
 */
const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <QuizProvider>
        <TooltipProvider>
          {/* Toast notifications for user feedback */}
          <Toaster />
          <Sonner />
          
          {/* Client-side routing configuration */}
          <BrowserRouter>
            <Routes>
              {/* Main application routes */}
              <Route path="/" element={<Home />} />
              <Route path="/quiz" element={<Quiz />} />
              <Route path="/results" element={<Results />} />
              
              {/* Catch-all route for 404 handling */}
              {/* Note: All custom routes must be added above this catch-all route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </QuizProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
