import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { useParallax } from "@/hooks/use-parallax";

export default function HeroSection() {
  const parallaxOffset = useParallax(0.5);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with parallax effect */}
      <div 
        className="absolute inset-0 parallax"
        style={{ transform: `translateY(${parallaxOffset}px)` }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-background via-purple-900/30 to-cyan-900/30"></div>
        <img 
          src="https://images.unsplash.com/photo-1455390582262-044cdead277a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080" 
          alt="Creative workspace" 
          className="w-full h-full object-cover opacity-20" 
        />
      </div>
      
      {/* Floating geometric shapes */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-primary/20 to-chart-2/20 rounded-full blur-xl animate-float"></div>
      <div 
        className="absolute bottom-32 right-20 w-48 h-48 bg-gradient-to-br from-chart-2/20 to-primary/20 rounded-full blur-xl animate-float" 
        style={{ animationDelay: "2s" }}
      ></div>
      <div 
        className="absolute top-1/2 left-1/4 w-24 h-24 bg-gradient-to-br from-chart-3/20 to-chart-4/20 rounded-full blur-xl animate-float" 
        style={{ animationDelay: "4s" }}
      ></div>
      
      <div className="relative z-10 max-w-6xl mx-auto container-padding text-center">
        <div className="glass rounded-3xl p-12 curve-top curve-bottom animate-slide-up">
          <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6 text-shadow">
            Where Stories
            <span className="gradient-text block mt-2">
              Come Alive
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed max-w-3xl mx-auto">
            A premium platform for writers, readers, and thinkers. Share your ideas, discover amazing stories, and join a community that values quality content.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/write">
              <Button 
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-cyan-600 text-white hover:from-purple-700 hover:to-cyan-700 transition-all duration-300 hover-lift animate-glow px-8 py-4 text-lg"
                data-testid="button-start-writing"
              >
                Start Writing
              </Button>
            </Link>
            <Link href="/discover">
              <Button 
                variant="outline" 
                size="lg"
                className="glass border-border hover:bg-white/20 transition-all duration-300 hover-lift px-8 py-4 text-lg"
                data-testid="button-explore-stories"
              >
                Explore Stories
              </Button>
            </Link>
          </div>
          <div className="flex justify-center items-center space-x-8 mt-12 text-sm text-muted-foreground">
            <div className="flex items-center">
              <svg className="w-4 h-4 mr-2 text-primary" fill="currentColor" viewBox="0 0 20 20">
                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
              </svg>
              <span data-testid="text-user-count">50K+ Writers</span>
            </div>
            <div className="flex items-center">
              <svg className="w-4 h-4 mr-2 text-chart-2" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
              </svg>
              <span data-testid="text-story-count">2M+ Stories</span>
            </div>
            <div className="flex items-center">
              <svg className="w-4 h-4 mr-2 text-chart-3" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
              </svg>
              <span data-testid="text-read-count">100M+ Reads</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
