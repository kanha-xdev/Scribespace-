import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import ArticleCard from "@/components/article-card";
import { Card, CardContent } from "@/components/ui/card";

export default function FeaturedArticles() {
  const { data: featuredArticles, isLoading } = useQuery({
    queryKey: ["/api/articles/featured"],
  });

  const { data: regularArticles, isLoading: regularLoading } = useQuery({
    queryKey: ["/api/articles"],
  });

  return (
    <section id="discover" className="section-spacing relative">
      <div className="absolute inset-0 bg-gradient-to-b from-background to-secondary/20"></div>
      <div className="relative z-10 max-w-7xl mx-auto container-padding">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4 text-shadow">
            Featured Stories
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover the most engaging and thought-provoking stories from our community
          </p>
        </div>
        
        {/* Featured Articles Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            {[...Array(2)].map((_, i) => (
              <Card key={i} className="glass">
                <div className="loading-skeleton h-64 w-full" />
                <CardContent className="p-8 space-y-4">
                  <div className="loading-skeleton h-6 w-3/4" />
                  <div className="loading-skeleton h-4 w-full" />
                  <div className="loading-skeleton h-4 w-2/3" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : featuredArticles && featuredArticles.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            {featuredArticles.slice(0, 2).map((article, index) => (
              <ArticleCard 
                key={article.id} 
                article={article} 
                featured={true}
                className={index === 0 ? "lg:col-span-1" : "lg:col-span-1"}
              />
            ))}
          </div>
        )}
        
        {/* Regular Articles Grid */}
        {regularLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="glass">
                <div className="loading-skeleton h-48 w-full" />
                <CardContent className="p-6 space-y-3">
                  <div className="loading-skeleton h-4 w-3/4" />
                  <div className="loading-skeleton h-4 w-full" />
                  <div className="loading-skeleton h-4 w-1/2" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : regularArticles && regularArticles.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regularArticles.slice(0, 6).map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        )}
        
        <div className="text-center mt-12">
          <Button 
            variant="outline" 
            size="lg"
            className="glass border-border hover:bg-accent transition-all duration-300 hover-lift"
            data-testid="button-load-more-stories"
          >
            Load More Stories
          </Button>
        </div>
      </div>
    </section>
  );
}
