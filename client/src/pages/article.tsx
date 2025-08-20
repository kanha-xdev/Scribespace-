import { useParams } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import CommentSection from "@/components/comment-section-simple";
import { Heart, MessageCircle, Share2, Bookmark, UserPlus, Clock, Eye } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

export default function Article() {
  const { id } = useParams();
  
  const { data: article, isLoading } = useQuery({
    queryKey: ["/api/articles", id],
  });

  if (isLoading) {
    return (
      <div className="min-h-screen pt-24 pb-16">
        <div className="max-w-4xl mx-auto container-padding">
          <div className="space-y-6">
            <div className="loading-skeleton h-8 w-3/4" />
            <div className="loading-skeleton h-4 w-1/2" />
            <div className="loading-skeleton h-64 w-full" />
            <div className="space-y-3">
              <div className="loading-skeleton h-4 w-full" />
              <div className="loading-skeleton h-4 w-full" />
              <div className="loading-skeleton h-4 w-3/4" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen pt-24 pb-16 flex items-center justify-center">
        <Card>
          <CardContent className="pt-6">
            <h1 className="text-2xl font-bold text-center">Article not found</h1>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-4xl mx-auto container-padding">
        <article className="glass rounded-3xl overflow-hidden">
          <div className="p-8 md:p-12">
            {/* Article Meta */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center">
                <img 
                  src={article.author?.avatar || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"}
                  alt={article.author?.name}
                  className="w-12 h-12 rounded-full border-2 border-primary/50 mr-4" 
                />
                <div>
                  <p className="font-semibold" data-testid="text-author-name">
                    {article.author?.name}
                  </p>
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <span data-testid="text-publish-date">
                      {formatDistanceToNow(new Date(article.createdAt), { addSuffix: true })}
                    </span>
                    <span>•</span>
                    <div className="flex items-center">
                      <Clock className="w-3 h-3 mr-1" />
                      <span data-testid="text-read-time">{article.readTime} min read</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="hover:bg-white/10"
                  data-testid="button-follow-author"
                >
                  <UserPlus className="w-4 h-4" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="hover:bg-white/10"
                  data-testid="button-bookmark-article"
                >
                  <Bookmark className="w-4 h-4" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="hover:bg-white/10"
                  data-testid="button-share-article"
                >
                  <Share2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
            
            {/* Article Title */}
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6 leading-tight text-shadow" data-testid="text-article-title">
              {article.title}
            </h1>
            
            {/* Article Tags */}
            <div className="flex flex-wrap gap-2 mb-8">
              {article.tags?.map((tag, index) => (
                <Badge 
                  key={index} 
                  variant="outline" 
                  className="bg-primary/20 text-primary border-primary/30"
                  data-testid={`tag-${tag}`}
                >
                  {tag}
                </Badge>
              ))}
            </div>
            
            {/* Featured Image */}
            {article.featuredImage && (
              <img 
                src={article.featuredImage}
                alt={article.title}
                className="w-full rounded-2xl mb-8 shadow-2xl" 
                data-testid="img-featured"
              />
            )}
            
            {/* Article Content */}
            <div className="prose prose-lg prose-invert max-w-none mb-8" data-testid="content-article-body">
              <div className="text-xl leading-relaxed text-muted-foreground mb-6">
                {article.excerpt}
              </div>
              
              <div className="text-lg leading-relaxed text-muted-foreground whitespace-pre-wrap">
                {article.content}
              </div>
            </div>
            
            {/* Article Actions */}
            <Separator className="my-8" />
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-6">
                <Button 
                  variant="ghost" 
                  className="flex items-center space-x-2 text-muted-foreground hover:text-primary"
                  data-testid="button-like-article"
                >
                  <Heart className="w-4 h-4" />
                  <span>{article.likes}</span>
                </Button>
                <Button 
                  variant="ghost" 
                  className="flex items-center space-x-2 text-muted-foreground hover:text-primary"
                  data-testid="button-scroll-to-comments"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>{article.commentCount}</span>
                </Button>
                <Button 
                  variant="ghost" 
                  className="flex items-center space-x-2 text-muted-foreground hover:text-primary"
                  data-testid="button-share"
                >
                  <Share2 className="w-4 h-4" />
                  <span>Share</span>
                </Button>
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <Eye className="w-4 h-4 mr-2" />
                <span data-testid="text-article-views">{article.views} views</span>
              </div>
            </div>
          </div>
        </article>
        
        {/* Comments Section */}
        <CommentSection articleId={id!} />
      </div>
    </div>
  );
}
