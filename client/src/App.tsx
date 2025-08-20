import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/home";
import Article from "@/pages/article";
import Write from "@/pages/write";
import Profile from "@/pages/profile";
import Discover from "@/pages/discover";
import NotFound from "@/pages/not-found";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { useReadingProgress } from "@/hooks/use-reading-progress";
import { useEffect } from "react";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/discover" component={Discover} />
      <Route path="/write" component={Write} />
      <Route path="/article/:id" component={Article} />
      <Route path="/profile/:id" component={Profile} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const readingProgress = useReadingProgress();

  useEffect(() => {
    // Add dark class to html element
    document.documentElement.classList.add('dark');
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
          {/* Reading Progress Bar */}
          <div 
            className="reading-progress" 
            style={{ width: `${readingProgress}%` }}
          />
          
          <Navigation />
          <main>
            <Router />
          </main>
          <Footer />
          
          {/* Floating Action Button */}
          <a 
            href="/write"
            className="fixed bottom-8 right-8 bg-gradient-to-r from-purple-600 to-cyan-600 text-white p-4 rounded-full shadow-2xl hover:from-purple-700 hover:to-cyan-700 transition-all duration-300 hover:scale-110 animate-glow z-50"
            data-testid="button-quick-write"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
          </a>
        </div>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
