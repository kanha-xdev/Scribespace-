import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart, MessageCircle, Bookmark, Share2, Clock, Eye } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { cn } from "@/lib/utils";

interface Article {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  authorId: string;
  category: string;
  tags?: string[];
  readTime: number;
  likes: number;
  views: number;
  commentCount: number;
  isPublished: boolean;
  featuredImage?: string;
  createdAt: string;
  updatedAt: string;
  author?: {
    id: string;
    name: string;
    avatar?: string;
    bio?: string;
    isVerified?: boolean;
  };
}

interface ArticleCardProps {
  article: Article;
  featured?: boolean;
  className?: string;
}

export default function ArticleCard({ article, featured = false, className }: ArticleCardProps) {
  const getCategoryColor = (category: string) => {
    const colors = {
      Writing: "text-primary bg-primary/20",
      Design: "text-chart-2 bg-chart-2/20",
      Technology: "text-chart-1 bg-chart-1/20",
      Lifestyle: "text-chart-4 bg-chart-4/20",
      Business: "text-chart-5 bg-chart-5/20",
      Productivity: "text-chart-3 bg-chart-3/20",
      Photography: "text-violet-400 bg-violet-400/20",
      Travel: "text-teal-400 bg-teal-400/20",
      Wellness: "text-rose-400 bg-rose-400/20",
      Creativity: "text-orange-400 bg-orange-400/20",
    };
    return colors[category as keyof typeof colors] || "text-muted-foreground bg-muted";
  };

  return (
    <Card 
      className={cn(
        "glass rounded-2xl overflow-hidden hover-lift group cursor-pointer border-border/50 hover:border-primary/20 transition-all duration-300",
        featured && "lg:rounded-3xl",
        className
      )}
      data-testid={`article-card-${article.id}`}
    >
      <Link href={`/article/${article.id}`}>
        {/* Article Image */}
        {article.featuredImage && (
          <div className={cn(
            "relative overflow-hidden",
            featured ? "h-64" : "h-48"
          )}>
            <img 
              src={article.featuredImage}
              alt={article.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
              data-testid="img-article-featured"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            
            {/* Category Badge on Image */}
            <Badge 
              className={cn(
                "absolute top-4 left-4 border-0",
                getCategoryColor(article.category)
              )}
              data-testid="badge-article-category"
            >
              {article.category}
            </Badge>
          </div>
        )}
        
        <CardContent className={cn("p-6", featured && "p-8")}>
          {/* Author Info */}
          <div className="flex items-center mb-4">
            <img 
              src={article.author?.avatar || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"}
              alt={article.author?.name}
              className="w-8 h-8 rounded-full border-2 border-primary/50 mr-3" 
              data-testid="img-author-avatar"
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2">
                <p className="text-sm font-medium text-foreground truncate" data-testid="text-author-name">
                  {article.author?.name}
                </p>
                {article.author?.isVerified && (
                  <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                    <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </div>
              <p className="text-xs text-muted-foreground" data-testid="text-publish-date">
                {formatDistanceToNow(new Date(article.createdAt), { addSuffix: true })}
              </p>
            </div>
          </div>
          
          {/* Article Title */}
          <h3 className={cn(
            "font-serif font-bold mb-3 group-hover:text-primary transition-colors leading-tight line-clamp-2",
            featured ? "text-2xl" : "text-lg"
          )} data-testid="text-article-title">
            {article.title}
          </h3>
          
          {/* Article Excerpt */}
          <p className={cn(
            "text-muted-foreground mb-4 leading-relaxed",
            featured ? "text-base line-clamp-3" : "text-sm line-clamp-2"
          )} data-testid="text-article-excerpt">
            {article.excerpt}
          </p>
          
          {/* Tags */}
          {article.tags && article.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-4">
              {article.tags.slice(0, 3).map((tag, index) => (
                <Badge 
                  key={index} 
                  variant="outline" 
                  className="text-xs bg-muted/50 border-border/50 text-muted-foreground hover:text-foreground transition-colors"
                  data-testid={`tag-${tag}`}
                >
                  {tag}
                </Badge>
              ))}
            </div>
          )}
          
          {/* Article Stats and Actions */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 text-xs text-muted-foreground">
              <div className="flex items-center">
                <Clock className="w-3 h-3 mr-1" />
                <span data-testid="text-read-time">{article.readTime} min read</span>
              </div>
              <div className="flex items-center">
                <Eye className="w-3 h-3 mr-1" />
                <span data-testid="text-view-count">{article.views}</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button 
                variant="ghost" 
                size="sm" 
                className="p-1 hover:text-primary transition-colors"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  // Handle like
                }}
                data-testid="button-like-article"
              >
                <Heart className="w-4 h-4" />
                <span className="ml-1 text-xs">{article.likes}</span>
              </Button>
              
              <Button 
                variant="ghost" 
                size="sm" 
                className="p-1 hover:text-primary transition-colors"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  // Handle comment
                }}
                data-testid="button-comment-article"
              >
                <MessageCircle className="w-4 h-4" />
                <span className="ml-1 text-xs">{article.commentCount}</span>
              </Button>
              
              <Button 
                variant="ghost" 
                size="sm" 
                className="p-1 hover:text-primary transition-colors"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  // Handle bookmark
                }}
                data-testid="button-bookmark-article"
              >
                <Bookmark className="w-4 h-4" />
              </Button>
              
              <Button 
                variant="ghost" 
                size="sm" 
                className="p-1 hover:text-primary transition-colors"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  // Handle share
                }}
                data-testid="button-share-article"
              >
                <Share2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Link>
    </Card>
  );
}
