import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useEffect, useState } from "react";

import LandingPage from "@/pages/landing";
import SignInPage from "@/pages/signin";
import SignUpPage from "@/pages/signup";
import Home from "@/pages/home";
import Article from "@/pages/article";
import Write from "@/pages/write";
import Profile from "@/pages/profile";
import Discover from "@/pages/discover";
import NotFound from "@/pages/not-found";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { useReadingProgress } from "@/hooks/use-reading-progress";

// Authentication check utility
const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is authenticated (mock implementation)
    const checkAuth = () => {
      const authStatus = localStorage.getItem("isAuthenticated");
      setIsAuthenticated(authStatus === "true");
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  return { isAuthenticated, isLoading };
};

// Protected route wrapper
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();
  const [location, setLocation] = useLocation();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      setLocation("/");
    }
  }, [isAuthenticated, isLoading, setLocation]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}

// Main app routes (protected)
function AppRoutes() {
  const readingProgress = useReadingProgress();

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Reading Progress Bar */}
      <div 
        className="reading-progress" 
        style={{ width: `${readingProgress}%` }}
      />
      
      <Navigation />
      <main className="flex-1">
        <Switch>
          <Route path="/home" component={Home} />
          <Route path="/discover" component={Discover} />
          <Route path="/write" component={Write} />
          <Route path="/article/:id" component={Article} />
          <Route path="/profile/:id" component={Profile} />
          <Route component={NotFound} />
        </Switch>
        

      </main>
      <Footer />
    </div>
  );
}

function Router() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  return (
    <Switch>
      {/* Public routes */}
      <Route path="/" component={LandingPage} />
      <Route path="/auth/signin" component={SignInPage} />
      <Route path="/auth/signup" component={SignUpPage} />
      
      {/* Protected routes */}
      <Route>
        <ProtectedRoute>
          <AppRoutes />
        </ProtectedRoute>
      </Route>
    </Switch>
  );
}

function App() {
  useEffect(() => {
    // Add dark class to html element
    document.documentElement.classList.add('dark');
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Router />
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
