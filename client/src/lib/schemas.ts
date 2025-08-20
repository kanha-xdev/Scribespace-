import { z } from "zod";

// Frontend-only schemas (replaces @shared/schema for deployment)
export const insertArticleSchema = z.object({
  title: z.string().min(1, "Title is required").max(200, "Title too long"),
  content: z.string().min(1, "Content is required"),
  excerpt: z.string().min(1, "Excerpt is required").max(500, "Excerpt too long"),
  category: z.string().min(1, "Category is required"),
  featuredImage: z.string().url().optional(),
  published: z.boolean().default(false),
});

export const insertUserSchema = z.object({
  name: z.string().min(1, "Name is required").max(100, "Name too long"),
  email: z.string().email("Invalid email format"),
  bio: z.string().max(500, "Bio too long").optional(),
  avatar: z.string().url().optional(),
});

export const insertCommentSchema = z.object({
  content: z.string().min(1, "Comment is required").max(1000, "Comment too long"),
  articleId: z.string(),
  parentId: z.string().optional(),
});

export const loginSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const registerSchema = z.object({
  name: z.string().min(1, "Name is required").max(100, "Name too long"),
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

// Type definitions for the application
export interface Article {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  author: string;
  authorId: string;
  createdAt: string;
  updatedAt: string;
  category: string;
  tags: string[];
  featuredImage?: string;
  readTime: number;
  likes: number;
  views?: number;
  isLiked: boolean;
  isBookmarked: boolean;
  published: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  bio?: string;
  avatar?: string;
  following: number;
  followers: number;
  articlesCount: number;
}

export interface Comment {
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

// Inferred types from schemas
export type InsertArticle = z.infer<typeof insertArticleSchema>;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type InsertComment = z.infer<typeof insertCommentSchema>;
export type LoginData = z.infer<typeof loginSchema>;
export type RegisterData = z.infer<typeof registerSchema>;