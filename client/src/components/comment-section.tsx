import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Heart, Reply } from "lucide-react";
import type { Comment, InsertComment } from "@shared/schema";

interface CommentSectionProps {
  articleId: string;
}

export default function CommentSection({ articleId }: CommentSectionProps) {
  const [newComment, setNewComment] = useState("");
  const [comments] = useState<Comment[]>([
    {
      id: "1",
      content: "Great article! Really insightful perspective on this topic.",
      authorId: "user1",
      articleId: articleId,
      parentId: null,
      likes: 5,
      createdAt: new Date("2024-01-15")
    },
    {
      id: "2", 
      content: "Thanks for sharing this. I found the section about mindful writing particularly helpful.",
      authorId: "user2", 
      articleId: articleId,
      parentId: null,
      likes: 3,
      createdAt: new Date("2024-01-14")
    }
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      console.log("New comment:", newComment);
      setNewComment("");
    }
  };

  return (
    <Card className="bg-slate-800/50 border-slate-700">
      <CardHeader>
        <CardTitle className="text-white">Comments ({comments.length})</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <Textarea
            placeholder="Share your thoughts..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="bg-slate-900/50 border-slate-600 text-white placeholder:text-slate-400"
            rows={3}
          />
          <Button 
            type="submit" 
            disabled={!newComment.trim()}
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
          >
            Post Comment
          </Button>
        </form>

        <div className="space-y-4">
          {comments.map((comment) => (
            <div key={comment.id} className="bg-slate-900/30 rounded-lg p-4">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h4 className="text-white font-medium">User {comment.authorId}</h4>
                  <p className="text-slate-400 text-sm">{comment.createdAt.toLocaleDateString()}</p>
                </div>
              </div>
              
              <p className="text-slate-300 mb-3">{comment.content}</p>
              
              <div className="flex items-center gap-4">
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="text-slate-400 hover:text-purple-400"
                >
                  <Heart className="w-4 h-4 mr-1" />
                  {comment.likes}
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="text-slate-400 hover:text-purple-400"
                >
                  <Reply className="w-4 h-4 mr-1" />
                  Reply
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}