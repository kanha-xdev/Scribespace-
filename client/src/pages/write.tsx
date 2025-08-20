import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { insertArticleSchema } from "@/lib/schemas";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import Breadcrumb from "@/components/breadcrumb";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import RichTextEditor from "@/components/rich-text-editor";
import { Save, Eye, Send, Plus, X } from "lucide-react";
import { z } from "zod";

const writeFormSchema = insertArticleSchema.extend({
  tags: z.array(z.string()).optional(),
});

type WriteFormData = z.infer<typeof writeFormSchema>;

const categories = [
  "Writing", "Design", "Technology", "Lifestyle", "Business", 
  "Travel", "Photography", "Wellness", "Creativity", "Productivity"
];

export default function Write() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [newTag, setNewTag] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [wordCount, setWordCount] = useState(0);

  const form = useForm<WriteFormData>({
    resolver: zodResolver(writeFormSchema),
    defaultValues: {
      title: "",
      content: "",
      excerpt: "",
      category: "",
      featuredImage: "",
      published: false,
      tags: [],
    },
  });

  const publishMutation = useMutation({
    mutationFn: async (data: WriteFormData) => {
      const response = await apiRequest("POST", "/api/articles", data);
      return response.json();
    },
    onSuccess: (article) => {
      queryClient.invalidateQueries({ queryKey: ["/api/articles"] });
      toast({
        title: "Article published!",
        description: "Your article has been published successfully.",
      });
      setLocation(`/article/${article.id}`);
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to publish article. Please try again.",
        variant: "destructive",
      });
    },
  });

  const saveDraftMutation = useMutation({
    mutationFn: async (data: WriteFormData) => {
      const response = await apiRequest("POST", "/api/articles", { ...data, isPublished: false });
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Draft saved!",
        description: "Your draft has been saved successfully.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to save draft. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: WriteFormData) => {
    const processedData = {
      ...data,
      tags,
      readTime: Math.ceil(wordCount / 200), // Estimate reading time
      isPublished: true,
    };
    publishMutation.mutate(processedData);
  };

  const onSaveDraft = () => {
    const data = form.getValues();
    const processedData = {
      ...data,
      tags,
      readTime: Math.ceil(wordCount / 200),
      isPublished: false,
    };
    saveDraftMutation.mutate(processedData);
  };

  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleContentChange = (content: string) => {
    form.setValue("content", content);
    const words = content.split(/\s+/).filter(word => word.length > 0);
    setWordCount(words.length);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 pt-20 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumb />
        <div className="text-center mb-8 lg:mb-12">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight mb-4 text-white" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, sans-serif' }}>
            Create Your Story
          </h1>
          <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto">
            Share your thoughts, ideas, and stories with the QuillSpace community
          </p>
        </div>

        {/* Author Info Card */}
        <Card className="bg-slate-800/50 border-slate-700/50 rounded-xl shadow-xl mb-6">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 flex items-center justify-center text-white font-bold text-lg sm:text-xl flex-shrink-0">
                {(() => {
                  const name = localStorage.getItem("userName") || "User";
                  return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
                })()}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-lg sm:text-xl font-semibold text-white truncate">
                  {localStorage.getItem("userName") || "User"}
                </h3>
                <p className="text-sm text-slate-400 truncate">
                  {localStorage.getItem("userEmail") || "user@example.com"}
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  Writing as author
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700/50 rounded-xl shadow-2xl">
          <CardHeader className="pb-4">
            <div className="flex flex-col space-y-4">
              <CardTitle className="text-xl sm:text-2xl font-light tracking-tight text-white" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, sans-serif' }}>Write Article</CardTitle>
              
              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
                <Button 
                  type="button"
                  variant="outline" 
                  onClick={onSaveDraft}
                  disabled={saveDraftMutation.isPending}
                  className="w-full sm:w-auto border-slate-600 text-slate-300 hover:bg-slate-700 bg-slate-900/50 rounded-full px-6 py-2.5 font-medium transition-all duration-200"
                  data-testid="button-save-draft"
                >
                  <Save className="w-4 h-4 mr-2 flex-shrink-0" />
                  {saveDraftMutation.isPending ? "Saving..." : "Save Draft"}
                </Button>
                <Button 
                  type="button"
                  variant="outline"
                  className="w-full sm:w-auto border-slate-600 text-slate-300 hover:bg-slate-700 bg-slate-900/50 rounded-full px-6 py-2.5 font-medium transition-all duration-200"
                  data-testid="button-preview"
                >
                  <Eye className="w-4 h-4 mr-2 flex-shrink-0" />
                  Preview
                </Button>
              </div>
            </div>
          </CardHeader>
          
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {/* Title */}
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Enter your article title..."
                          className="w-full bg-transparent text-2xl sm:text-3xl font-serif font-bold text-white placeholder-slate-400 border-none p-0 focus-visible:ring-0"
                          data-testid="input-article-title"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Excerpt */}
                <FormField
                  control={form.control}
                  name="excerpt"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-300">Excerpt</FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          placeholder="Write a brief excerpt that summarizes your article..."
                          className="bg-slate-900/50 border-slate-600 text-white placeholder-slate-400 min-h-20"
                          rows={3}
                          data-testid="textarea-excerpt"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Category and Featured Image */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-300">Category</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="bg-slate-900/50 border-slate-600 text-white" data-testid="select-category">
                              <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-slate-800 border-slate-700">
                            {categories.map((category) => (
                              <SelectItem key={category} value={category} className="text-white hover:bg-slate-700">
                                {category}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="featuredImage"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-300">Featured Image URL</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            value={field.value || ''}
                            placeholder="https://example.com/image.jpg"
                            className="bg-slate-900/50 border-slate-600 text-white placeholder-slate-400"
                            data-testid="input-featured-image"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Tags */}
                <div className="space-y-3">
                  <FormLabel className="text-slate-300">Tags</FormLabel>
                  <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-2">
                    <Input
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      placeholder="Add a tag..."
                      className="bg-slate-900/50 border-slate-600 text-white placeholder-slate-400 flex-1"
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                      data-testid="input-new-tag"
                    />
                    <Button 
                      type="button" 
                      variant="outline" 
                      size="sm" 
                      onClick={addTag}
                      className="border-slate-600 text-slate-300 hover:bg-slate-700 w-full sm:w-auto rounded-full px-4 py-2 font-medium transition-all duration-200"
                      data-testid="button-add-tag"
                    >
                      <Plus className="w-4 h-4 mr-1 sm:mr-0" />
                      <span className="sm:hidden">Add Tag</span>
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag, index) => (
                      <Badge 
                        key={index} 
                        variant="secondary" 
                        className="flex items-center space-x-1 bg-slate-700 text-slate-200 border-slate-600 px-2 py-1"
                        data-testid={`tag-${tag}`}
                      >
                        <span className="text-sm">{tag}</span>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="h-auto p-0 ml-1 text-slate-400 hover:text-red-400"
                          onClick={() => removeTag(tag)}
                          data-testid={`button-remove-tag-${tag}`}
                        >
                          <X className="w-3 h-3" />
                        </Button>
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Content Editor */}
                <FormField
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Content</FormLabel>
                      <FormControl>
                        <RichTextEditor
                          value={field.value}
                          onChange={handleContentChange}
                          placeholder="Tell your story..."
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Word Count and Actions */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pt-6 border-t border-slate-700 space-y-4 sm:space-y-0">
                  <div className="text-sm text-slate-400 order-2 sm:order-1">
                    <span data-testid="text-word-count">{wordCount} words</span> • 
                    <span data-testid="text-estimated-read-time"> {Math.ceil(wordCount / 200)} min read</span>
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white font-medium py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl order-1 sm:order-2"
                    disabled={publishMutation.isPending}
                    data-testid="button-publish"
                  >
                    <Send className="w-4 h-4 mr-2 flex-shrink-0" />
                    {publishMutation.isPending ? "Publishing..." : "Publish Article"}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
