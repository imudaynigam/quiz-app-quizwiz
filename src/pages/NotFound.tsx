import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Home, AlertTriangle } from "lucide-react";
import { QuizButton } from "@/components/ui/quiz-button";
import { Layout } from "@/components/layout/Layout";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <Layout>
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="quiz-card p-12 text-center max-w-lg">
          <AlertTriangle className="w-20 h-20 text-quiz-danger mx-auto mb-6" />
          <h1 className="text-6xl font-bold mb-4 text-quiz-primary">404</h1>
          <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>
          <p className="text-muted-foreground mb-8 text-lg">
            Oops! The page you're looking for doesn't exist. Let's get you back to the quiz!
          </p>
          <QuizButton
            variant="quiz"
            size="xl"
            asChild
            className="w-full"
          >
            <Link to="/">
              <Home className="w-5 h-5 mr-2" />
              Return to Home
            </Link>
          </QuizButton>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;
