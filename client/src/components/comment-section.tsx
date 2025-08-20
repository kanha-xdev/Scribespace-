import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertCommentSchema } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Heart, Reply, MoreVertical } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { z } from "zod";

const commentFormSchema = insertCommentSchema.extend({
  content: z.string().min(1, "Comment cannot be empty").max(1000, "Comment is too long"),
});

type CommentFormData = z.infer<typeof commentFormSchema>;

interface Comment {
  id: string;
  content: string;
  authorId: string;
  articleId: string;
  parentId?: string;
  likes: number;
  createdAt: string;
  author?: {
    id: string;
    name: string;
    avatar?: string;
  };
}

interface CommentSectionProps {
  articleId: string;
}

export default function CommentSection({ articleId }: CommentSectionProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [replyingTo, setReplyingTo] = useState<string | null>(null);

  const { data: comments, isLoading } = useQuery({
    queryKey: ["/api/articles", articleId, "comments"],
  });

  const form = useForm<CommentFormData>({
    resolver: zodResolver(commentFormSchema),
    defaultValues: {
      content: "",
      authorId: "user-1", // Mock user ID
      articleId: articleId,
      parentId: undefined,
    },
  });

  const createCommentMutation = useMutation({
    mutationFn: async (data: CommentFormData) => {
      const response = await apiRequest("POST", "/api/comments", data);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/articles", articleId, "comments"] });
      queryClient.invalidateQueries({ queryKey: ["/api/articles", articleId] });
      form.reset();
      setReplyingTo(null);
      toast({
        title: "Comment posted!",
        description: "Your comment has been added successfully.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to post comment. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: CommentFormData) => {
    createCommentMutation.mutate({
      ...data,
      parentId: replyingTo || undefined,
    });
  };

  const handleReply = (commentId: string) => {
    setReplyingTo(commentId === replyingTo ? null : commentId);
    if (commentId !== replyingTo) {
      form.setValue("parentId", commentId);
    } else {
      form.setValue("parentId", undefined);
    }
  };

  // Group comments by parent/child relationship
  const topLevelComments = comments?.filter(comment => !comment.parentId) || [];
  const getReplies = (parentId: string) => {
    return comments?.filter(comment => comment.parentId === parentId) || [];
  };

  return (
    <div className="mt-12">
      <Card className="glass rounded-3xl border-border/50">
        <CardHeader>
          <CardTitle className="text-2xl font-serif font-bold" data-testid="title-comments">
            Responses ({comments?.length || 0})
          </CardTitle>
        </CardHeader>
        
        <CardContent>
          {/* Comment Input */}
          <div className="mb-8">
            <div className="flex items-start space-x-3">
              <img 
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
                alt="Your profile" 
                className="w-10 h-10 rounded-full border-2 border-primary/50" 
                data-testid="img-commenter-avatar"
              />
              <div className="flex-1">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
                    <FormField
                      control={form.control}
                      name="content"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Textarea 
                              {...field}
                              placeholder={replyingTo ? "Write a reply..." : "Share your thoughts..."}
                              rows={4}
                              className="bg-secondary/50 rounded-2xl border-border/50 focus:border-primary/50 transition-colors resize-none"
                              data-testid="textarea-comment"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-3 text-sm text-muted-foreground">
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="p-1 hover:text-foreground"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </Button>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="p-1 hover:text-foreground italic"
                        >
                          <em>I</em>
                        </Button>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="p-1 hover:text-foreground"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                          </svg>
                        </Button>
                        {replyingTo && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => setReplyingTo(null)}
                            className="text-xs text-muted-foreground hover:text-foreground"
                          >
                            Cancel reply
                          </Button>
                        )}
                      </div>
                      <Button 
                        type="submit" 
                        className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700"
                        disabled={createCommentMutation.isPending}
                        data-testid="button-submit-comment"
                      >
                        {createCommentMutation.isPending ? "Posting..." : "Respond"}
                      </Button>
                    </div>
                  </form>
                </Form>
              </div>
            </div>
          </div>
          
          {/* Comments List */}
          {isLoading ? (
            <div className="space-y-6">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="flex space-x-3">
                  <div className="loading-skeleton w-10 h-10 rounded-full" />
                  <div className="flex-1 space-y-2">
                    <div className="loading-skeleton h-4 w-32" />
                    <div className="loading-skeleton h-16 w-full" />
                    <div className="loading-skeleton h-4 w-24" />
                  </div>
                </div>
              ))}
            </div>
          ) : comments && comments.length > 0 ? (
            <div className="space-y-6">
              {topLevelComments.map((comment) => (
                <div key={comment.id} className="space-y-4">
                  {/* Main Comment */}
                  <div className="flex items-start space-x-3" data-testid={`comment-${comment.id}`}>
                    <img 
                      src={comment.author?.avatar || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"}
                      alt={comment.author?.name} 
                      className="w-10 h-10 rounded-full border-2 border-chart-2/50" 
                    />
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <p className="font-medium text-foreground" data-testid="text-comment-author">
                          {comment.author?.name}
                        </p>
                        <p className="text-sm text-muted-foreground" data-testid="text-comment-date">
                          {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
                        </p>
                      </div>
                      <p className="text-muted-foreground leading-relaxed mb-3" data-testid="text-comment-content">
                        {comment.content}
                      </p>
                      <div className="flex items-center space-x-4 text-sm">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="p-0 h-auto text-muted-foreground hover:text-primary transition-colors"
                          data-testid="button-like-comment"
                        >
                          <Heart className="w-4 h-4 mr-1" />
                          <span>{comment.likes}</span>
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="p-0 h-auto text-muted-foreground hover:text-primary transition-colors"
                          onClick={() => handleReply(comment.id)}
                          data-testid="button-reply-comment"
                        >
                          <Reply className="w-4 h-4 mr-1" />
                          Reply
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="p-0 h-auto text-muted-foreground hover:text-primary transition-colors"
                          data-testid="button-comment-options"
                        >
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Replies */}
                  {getReplies(comment.id).map((reply) => (
                    <div key={reply.id} className="ml-12 flex items-start space-x-3" data-testid={`reply-${reply.id}`}>
                      <img 
                        src={reply.author?.avatar || "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face"}
                        alt={reply.author?.name} 
                        className="w-8 h-8 rounded-full border-2 border-chart-3/50" 
                      />
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <p className="font-medium text-foreground text-sm">
                            {reply.author?.name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {formatDistanceToNow(new Date(reply.createdAt), { addSuffix: true })}
                          </p>
                        </div>
                        <p className="text-muted-foreground leading-relaxed mb-2 text-sm">
                          {reply.content}
                        </p>
                        <div className="flex items-center space-x-4 text-xs">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="p-0 h-auto text-muted-foreground hover:text-primary transition-colors"
                          >
                            <Heart className="w-3 h-3 mr-1" />
                            <span>{reply.likes}</span>
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="p-0 h-auto text-muted-foreground hover:text-primary transition-colors"
                            onClick={() => handleReply(comment.id)}
                          >
                            Reply
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="glass rounded-2xl p-8 inline-block">
                <svg className="w-16 h-16 text-muted-foreground mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                <h3 className="text-xl font-semibold mb-2">No responses yet</h3>
                <p className="text-muted-foreground">
                  Be the first to share your thoughts on this story.
                </p>
              </div>
            </div>
          )}
          
          {comments && comments.length > 0 && (
            <div className="text-center mt-8">
              <Button 
                variant="ghost" 
                className="text-muted-foreground hover:text-foreground transition-colors"
                data-testid="button-load-more-comments"
              >
                Load more responses
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
