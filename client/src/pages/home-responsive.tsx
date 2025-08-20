import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Link } from "wouter";
import { TrendingUp, BookOpen, Clock, Eye, ThumbsUp } from "lucide-react";
import { Article } from "@/lib/schemas";

export default function ResponsiveHomePage() {
  const { data: featuredArticles, isLoading: featuredLoading } = useQuery<Article[]>({
    queryKey: ["/api/articles/featured"],
  });

  const { data: recentArticles, isLoading: recentLoading } = useQuery<Article[]>({
    queryKey: ["/api/articles"],
  });

  const isLoading = featuredLoading || recentLoading;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-white">
      {/* Hero Section - Simplified and Mobile-First */}
      <section className="px-4 py-12 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-4xl mx-auto mb-16">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent mb-6">
            Welcome to QuillSpace
          </h1>
          <p className="text-lg sm:text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
            Discover amazing stories, share your thoughts, and connect with writers worldwide.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              asChild
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
              data-testid="button-start-writing"
            >
              <Link href="/write">
                Start Writing
              </Link>
            </Button>
            <Button 
              asChild
              variant="outline"
              size="lg"
              className="border-slate-600 text-slate-300 hover:bg-slate-800"
              data-testid="button-explore"
            >
              <Link href="/discover">
                Explore Stories
              </Link>
            </Button>
          </div>
        </div>

        {/* Quick Stats - Simple Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-400">{featuredArticles?.length || 0}</div>
            <div className="text-sm text-slate-400">Featured Stories</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-cyan-400">{recentArticles?.length || 0}</div>
            <div className="text-sm text-slate-400">Recent Articles</div>
          </div>
          <div className="text-center lg:block hidden">
            <div className="text-2xl font-bold text-pink-400">10+</div>
            <div className="text-sm text-slate-400">Categories</div>
          </div>
          <div className="text-center lg:block hidden">
            <div className="text-2xl font-bold text-green-400">500+</div>
            <div className="text-sm text-slate-400">Writers</div>
          </div>
        </div>

        <Separator className="bg-slate-800 mb-12" />

        {/* Featured Articles Section - Mobile-First Grid */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-2">
              <TrendingUp className="h-6 w-6 text-purple-400" />
              Featured Stories
            </h2>
            <Button variant="ghost" asChild className="hidden sm:flex text-slate-400">
              <Link href="/discover?featured=true">
                View All
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredArticles?.slice(0, 6).map((article) => (
              <Card 
                key={article.id} 
                className="bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-colors group cursor-pointer"
                data-testid={`card-featured-${article.id}`}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="secondary" className="text-xs">
                      {article.category}
                    </Badge>
                    <div className="flex items-center text-xs text-slate-400 gap-1">
                      <Eye className="h-3 w-3" />
                      {article.views || 0}
                    </div>
                  </div>
                  <CardTitle className="text-lg line-clamp-2 group-hover:text-purple-300 transition-colors">
                    <Link href={`/article/${article.id}`}>
                      {article.title}
                    </Link>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-300 text-sm line-clamp-3 mb-4">
                    {article.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {article.readTime}min
                      </span>
                      <span className="flex items-center gap-1">
                        <ThumbsUp className="h-3 w-3" />
                        {article.likes || 0}
                      </span>
                    </div>
                    <span>
                      {article.createdAt ? new Date(article.createdAt).toLocaleDateString() : 'Recently'}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Mobile View All Button */}
          <div className="flex justify-center mt-8 sm:hidden">
            <Button variant="outline" asChild className="border-slate-600 text-slate-300">
              <Link href="/discover?featured=true">
                View All Featured
              </Link>
            </Button>
          </div>
        </section>

        <Separator className="bg-slate-800 mb-12" />

        {/* Recent Articles Section - Simplified Layout */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-2">
              <BookOpen className="h-6 w-6 text-cyan-400" />
              Latest Stories
            </h2>
            <Button variant="ghost" asChild className="hidden sm:flex text-slate-400">
              <Link href="/discover">
                View All
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {recentArticles?.slice(0, 4).map((article) => (
              <Card 
                key={article.id} 
                className="bg-slate-800/30 border-slate-700/50 hover:bg-slate-800/50 transition-colors group cursor-pointer"
                data-testid={`card-recent-${article.id}`}
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <Badge variant="outline" className="text-xs border-slate-600">
                      {article.category}
                    </Badge>
                    <div className="flex items-center text-xs text-slate-500 gap-1">
                      <Clock className="h-3 w-3" />
                      {article.readTime}min read
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-semibold text-white mb-3 line-clamp-2 group-hover:text-cyan-300 transition-colors">
                    <Link href={`/article/${article.id}`}>
                      {article.title}
                    </Link>
                  </h3>
                  
                  <p className="text-slate-400 text-sm line-clamp-2 mb-4">
                    {article.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1">
                        <Eye className="h-3 w-3" />
                        {article.views || 0}
                      </span>
                      <span className="flex items-center gap-1">
                        <ThumbsUp className="h-3 w-3" />
                        {article.likes || 0}
                      </span>
                    </div>
                    <span>
                      {article.createdAt ? new Date(article.createdAt).toLocaleDateString() : 'Recently'}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Mobile View All Button */}
          <div className="flex justify-center mt-8 sm:hidden">
            <Button variant="outline" asChild className="border-slate-600 text-slate-300">
              <Link href="/discover">
                View All Articles
              </Link>
            </Button>
          </div>
        </section>

        {/* Call to Action - Simple */}
        <section className="text-center mt-20 mb-12">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              Ready to Share Your Story?
            </h2>
            <p className="text-slate-300 mb-8">
              Join our community of writers and readers. Create your first article today.
            </p>
            <Button 
              asChild
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700"
              data-testid="button-get-started-cta"
            >
              <Link href="/write">
                Get Started
              </Link>
            </Button>
          </div>
        </section>
      </section>

      {/* Quick Access Floating Button - Only on larger screens */}
      <Link 
        href="/write"
        className="hidden lg:flex fixed bottom-8 right-8 bg-gradient-to-r from-purple-600 to-cyan-600 text-white p-4 rounded-full shadow-2xl hover:from-purple-700 hover:to-cyan-700 transition-all duration-300 hover:scale-110 z-50"
        data-testid="button-floating-write"
      >
        <BookOpen className="h-6 w-6" />
      </Link>
    </div>
  );
}