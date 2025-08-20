import { useParams } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { UserPlus, MessageCircle, Share2, MapPin, Calendar, CheckCircle } from "lucide-react";
import ArticleCard from "@/components/article-card";
import { formatDistanceToNow } from "date-fns";

export default function Profile() {
  const { id } = useParams();
  
  const { data: user, isLoading: userLoading } = useQuery({
    queryKey: ["/api/users", id],
  });

  const { data: articles, isLoading: articlesLoading } = useQuery({
    queryKey: ["/api/users", id, "articles"],
  });

  if (userLoading) {
    return (
      <div className="min-h-screen pt-24 pb-16">
        <div className="max-w-6xl mx-auto container-padding">
          <div className="space-y-6">
            <div className="loading-skeleton h-32 w-32 rounded-full mx-auto" />
            <div className="loading-skeleton h-8 w-64 mx-auto" />
            <div className="loading-skeleton h-4 w-96 mx-auto" />
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen pt-24 pb-16 flex items-center justify-center">
        <Card>
          <CardContent className="pt-6">
            <h1 className="text-2xl font-bold text-center">User not found</h1>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-6xl mx-auto container-padding">
        {/* Profile Header */}
        <div className="glass rounded-3xl p-8 mb-8">
          <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
            {/* Profile Image */}
            <div className="relative">
              <img 
                src={user.avatar || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"}
                alt={user.name}
                className="w-32 h-32 rounded-full border-4 border-primary/50 shadow-2xl" 
                data-testid="img-profile-avatar"
              />
              {user.isVerified && (
                <div className="absolute -bottom-2 -right-2 bg-green-500 w-8 h-8 rounded-full border-4 border-background flex items-center justify-center">
                  <CheckCircle className="w-4 h-4 text-white" />
                </div>
              )}
            </div>
            
            {/* Profile Info */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl font-serif font-bold mb-2" data-testid="text-user-name">
                {user.name}
              </h1>
              <p className="text-xl text-muted-foreground mb-4" data-testid="text-user-bio">
                {user.bio}
              </p>
              
              {/* Profile Stats */}
              <div className="flex flex-wrap justify-center md:justify-start gap-6 mb-6">
                <div className="text-center">
                  <p className="text-2xl font-bold text-primary" data-testid="text-follower-count">
                    {user.followerCount?.toLocaleString()}
                  </p>
                  <p className="text-sm text-muted-foreground">Followers</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-chart-2" data-testid="text-following-count">
                    {user.followingCount?.toLocaleString()}
                  </p>
                  <p className="text-sm text-muted-foreground">Following</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-chart-3" data-testid="text-article-count">
                    {articles?.length || 0}
                  </p>
                  <p className="text-sm text-muted-foreground">Articles</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-chart-4" data-testid="text-member-since">
                    {formatDistanceToNow(new Date(user.createdAt!), { addSuffix: true })}
                  </p>
                  <p className="text-sm text-muted-foreground">Member Since</p>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex flex-wrap justify-center md:justify-start gap-3">
                <Button 
                  className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700"
                  data-testid="button-follow-user"
                >
                  <UserPlus className="w-4 h-4 mr-2" />
                  Follow
                </Button>
                <Button 
                  variant="outline" 
                  className="border-border hover:bg-accent"
                  data-testid="button-message-user"
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Message
                </Button>
                <Button 
                  variant="outline" 
                  className="border-border hover:bg-accent"
                  data-testid="button-share-profile"
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Profile Content */}
        <div className="glass rounded-3xl p-8">
          {/* Tab Navigation */}
          <div className="flex flex-wrap border-b border-border/50 mb-8">
            <button 
              className="px-6 py-3 text-primary border-b-2 border-primary font-medium"
              data-testid="tab-articles"
            >
              Articles
            </button>
            <button 
              className="px-6 py-3 text-muted-foreground hover:text-foreground transition-colors"
              data-testid="tab-bookmarks"
            >
              Bookmarks
            </button>
            <button 
              className="px-6 py-3 text-muted-foreground hover:text-foreground transition-colors"
              data-testid="tab-about"
            >
              About
            </button>
          </div>
          
          {/* User Articles */}
          {articlesLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="space-y-3">
                  <div className="loading-skeleton h-32 w-full" />
                  <div className="loading-skeleton h-4 w-3/4" />
                  <div className="loading-skeleton h-4 w-1/2" />
                </div>
              ))}
            </div>
          ) : articles && articles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg">No articles published yet</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
