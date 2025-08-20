import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, BookOpen, Users, Zap, Menu } from "lucide-react";

// Simple navbar for landing page
function LandingNavbar() {
  return (
    <nav className="absolute top-0 left-0 right-0 z-50 px-4 sm:px-6 lg:px-8 py-6">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
            QuillSpace
          </h1>
        </div>
        
        <div className="hidden md:flex items-center space-x-6">
          <Link href="/auth/signin">
            <span className="text-slate-300 hover:text-white transition-colors cursor-pointer font-medium">
              Sign In
            </span>
          </Link>
          <Button 
            asChild
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white border-0"
            data-testid="navbar-get-started"
          >
            <Link href="/auth/signup">
              Get Started
            </Link>
          </Button>
        </div>

        {/* Mobile menu */}
        <div className="md:hidden flex items-center space-x-2">
          <Button variant="ghost" asChild className="text-slate-300">
            <Link href="/auth/signin">
              Sign In
            </Link>
          </Button>
          <Button asChild size="sm" className="bg-purple-600 hover:bg-purple-700">
            <Link href="/auth/signup">
              Sign Up
            </Link>
          </Button>
        </div>
      </div>
    </nav>
  );
}

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-white overflow-hidden relative">
      <LandingNavbar />
      {/* Hero Section */}
      <div className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-20">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 sm:w-64 sm:h-64 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-32 h-32 sm:w-48 sm:h-48 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
        </div>

        <div className="relative z-10 text-center max-w-5xl mx-auto">
          {/* Main Heading */}
          <div className="mb-12">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-extrabold bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent mb-6 leading-tight tracking-tight">
              Write. Share. Inspire.
            </h1>
            <p className="text-xl sm:text-2xl lg:text-3xl text-slate-200 max-w-3xl mx-auto leading-relaxed font-light">
              The premium platform where <span className="text-purple-300 font-medium">exceptional stories</span> meet 
              <span className="text-cyan-300 font-medium"> passionate readers</span>
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-20">
            <Button 
              asChild
              size="lg"
              className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white border-0 px-10 py-4 text-lg font-bold shadow-2xl shadow-purple-500/25 hover:shadow-purple-500/40 transition-all duration-300"
              data-testid="button-get-started"
            >
              <Link href="/auth/signup">
                Start Writing Today <ArrowRight className="ml-3 h-5 w-5" />
              </Link>
            </Button>
            
            <Button 
              asChild
              variant="outline"
              size="lg"
              className="w-full sm:w-auto border-slate-500 text-slate-200 hover:bg-slate-800/50 hover:text-white hover:border-slate-400 px-10 py-4 text-lg font-semibold backdrop-blur-sm transition-all duration-300"
              data-testid="button-sign-in"
            >
              <Link href="/auth/signin">
                Sign In
              </Link>
            </Button>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="bg-slate-800/30 border-slate-700/30 backdrop-blur-md hover:bg-slate-800/40 transition-all duration-300 group">
              <CardContent className="p-8 text-center">
                <BookOpen className="h-16 w-16 text-purple-400 mx-auto mb-6 group-hover:scale-110 transition-transform duration-300" />
                <h3 className="text-2xl font-bold text-white mb-4 font-serif">Rich Writing Experience</h3>
                <p className="text-slate-300 text-base leading-relaxed">
                  Professional editor with advanced formatting, media embedding, and beautiful typography for your stories
                </p>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/30 border-slate-700/30 backdrop-blur-md hover:bg-slate-800/40 transition-all duration-300 group">
              <CardContent className="p-8 text-center">
                <Users className="h-16 w-16 text-cyan-400 mx-auto mb-6 group-hover:scale-110 transition-transform duration-300" />
                <h3 className="text-2xl font-bold text-white mb-4 font-serif">Engaged Community</h3>
                <p className="text-slate-300 text-base leading-relaxed">
                  Connect with passionate writers and thoughtful readers who appreciate quality content
                </p>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/30 border-slate-700/30 backdrop-blur-md hover:bg-slate-800/40 transition-all duration-300 group">
              <CardContent className="p-8 text-center">
                <Zap className="h-16 w-16 text-pink-400 mx-auto mb-6 group-hover:scale-110 transition-transform duration-300" />
                <h3 className="text-2xl font-bold text-white mb-4 font-serif">Premium Platform</h3>
                <p className="text-slate-300 text-base leading-relaxed">
                  Distraction-free, elegant interface designed for serious creators and meaningful content
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}