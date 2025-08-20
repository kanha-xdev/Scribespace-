import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import ArticleCard from "@/components/article-card";
import TopicsSection from "@/components/topics-section";
import Breadcrumb from "@/components/breadcrumb";
import { Search, Filter, TrendingUp, Clock, Heart } from "lucide-react";

const categories = [
  "All", "Writing", "Design", "Technology", "Lifestyle", "Business", 
  "Travel", "Photography", "Wellness", "Creativity", "Productivity"
];

const sortOptions = [
  { value: "latest", label: "Latest", icon: Clock },
  { value: "trending", label: "Trending", icon: TrendingUp },
  { value: "popular", label: "Most Liked", icon: Heart },
];

export default function Discover() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("latest");

  const { data: articles = [], isLoading } = useQuery({
    queryKey: ["/api/articles", { category: selectedCategory === "All" ? undefined : selectedCategory }],
  });

  const { data: searchResults = [], isLoading: searchLoading } = useQuery({
    queryKey: ["/api/search", { q: searchQuery }],
    enabled: searchQuery.length > 2,
  });

  const displayArticles = searchQuery.length > 2 ? searchResults : articles;

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto container-padding">
        <Breadcrumb />
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4 text-shadow">
            Discover Stories
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Explore thought-provoking articles and discover new voices in the QuillSpace community
          </p>
        </div>

        {/* Search and Filters */}
        <Card className="glass rounded-3xl mb-12 border-border/50">
          <CardContent className="p-6">
            {/* Search Bar */}
            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search stories, authors, topics..."
                className="pl-12 bg-transparent border-border/50 text-lg h-12"
                data-testid="input-search"
              />
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap gap-2 mb-6">
              {categories.map((category) => (
                <Badge
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  className={`cursor-pointer transition-all hover:scale-105 ${
                    selectedCategory === category 
                      ? "bg-primary text-primary-foreground" 
                      : "hover:bg-accent"
                  }`}
                  onClick={() => setSelectedCategory(category)}
                  data-testid={`filter-category-${category.toLowerCase()}`}
                >
                  {category}
                </Badge>
              ))}
            </div>

            {/* Sort Options */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <span className="text-sm text-muted-foreground">Sort by:</span>
                <div className="flex space-x-2">
                  {sortOptions.map((option) => {
                    const Icon = option.icon;
                    return (
                      <Button
                        key={option.value}
                        variant={sortBy === option.value ? "default" : "ghost"}
                        size="sm"
                        onClick={() => setSortBy(option.value)}
                        className="flex items-center space-x-1"
                        data-testid={`sort-${option.value}`}
                      >
                        <Icon className="w-4 h-4" />
                        <span>{option.label}</span>
                      </Button>
                    );
                  })}
                </div>
              </div>
              
              <div className="text-sm text-muted-foreground">
                {displayArticles?.length || 0} articles found
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Articles Grid */}
        {isLoading || searchLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {[...Array(9)].map((_, i) => (
              <Card key={i} className="glass">
                <div className="loading-skeleton h-48 w-full rounded-t-lg" />
                <CardContent className="p-6 space-y-3">
                  <div className="loading-skeleton h-4 w-3/4" />
                  <div className="loading-skeleton h-4 w-1/2" />
                  <div className="loading-skeleton h-20 w-full" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : displayArticles && displayArticles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {displayArticles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="glass rounded-3xl p-12 inline-block">
              <Search className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No articles found</h3>
              <p className="text-muted-foreground">
                {searchQuery.length > 2 
                  ? `No results found for "${searchQuery}"`
                  : "Try adjusting your filters or search terms"
                }
              </p>
            </div>
          </div>
        )}

        {/* Load More Button */}
        {displayArticles && displayArticles.length > 0 && (
          <div className="text-center">
            <Button 
              variant="outline" 
              size="lg" 
              className="glass border-border hover:bg-accent"
              data-testid="button-load-more"
            >
              Load More Articles
            </Button>
          </div>
        )}

        {/* Topics Section */}
        <div className="mt-24">
          <TopicsSection />
        </div>
      </div>
    </div>
  );
}
