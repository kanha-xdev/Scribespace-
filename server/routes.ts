import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertArticleSchema, insertCommentSchema, insertUserSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Articles
  app.get("/api/articles", async (req, res) => {
    try {
      const limit = parseInt(req.query.limit as string) || 10;
      const offset = parseInt(req.query.offset as string) || 0;
      const category = req.query.category as string;
      
      const articles = await storage.getArticles(limit, offset, category);
      
      // Populate author information
      const articlesWithAuthors = await Promise.all(
        articles.map(async (article) => {
          const author = await storage.getUser(article.authorId);
          return { ...article, author };
        })
      );
      
      res.json(articlesWithAuthors);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch articles" });
    }
  });

  app.get("/api/articles/featured", async (req, res) => {
    try {
      const articles = await storage.getFeaturedArticles();
      
      const articlesWithAuthors = await Promise.all(
        articles.map(async (article) => {
          const author = await storage.getUser(article.authorId);
          return { ...article, author };
        })
      );
      
      res.json(articlesWithAuthors);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch featured articles" });
    }
  });

  app.get("/api/articles/:id", async (req, res) => {
    try {
      const article = await storage.getArticle(req.params.id);
      if (!article) {
        return res.status(404).json({ message: "Article not found" });
      }
      
      const author = await storage.getUser(article.authorId);
      res.json({ ...article, author });
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch article" });
    }
  });

  app.post("/api/articles", async (req, res) => {
    try {
      const validatedData = insertArticleSchema.parse(req.body);
      const article = await storage.createArticle(validatedData);
      res.status(201).json(article);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid article data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create article" });
    }
  });

  app.put("/api/articles/:id", async (req, res) => {
    try {
      const updates = req.body;
      const article = await storage.updateArticle(req.params.id, updates);
      if (!article) {
        return res.status(404).json({ message: "Article not found" });
      }
      res.json(article);
    } catch (error) {
      res.status(500).json({ message: "Failed to update article" });
    }
  });

  app.delete("/api/articles/:id", async (req, res) => {
    try {
      const deleted = await storage.deleteArticle(req.params.id);
      if (!deleted) {
        return res.status(404).json({ message: "Article not found" });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Failed to delete article" });
    }
  });

  // Comments
  app.get("/api/articles/:id/comments", async (req, res) => {
    try {
      const comments = await storage.getCommentsByArticle(req.params.id);
      
      const commentsWithAuthors = await Promise.all(
        comments.map(async (comment) => {
          const author = await storage.getUser(comment.authorId);
          return { ...comment, author };
        })
      );
      
      res.json(commentsWithAuthors);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch comments" });
    }
  });

  app.post("/api/comments", async (req, res) => {
    try {
      const validatedData = insertCommentSchema.parse(req.body);
      const comment = await storage.createComment(validatedData);
      res.status(201).json(comment);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid comment data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create comment" });
    }
  });

  // Users
  app.get("/api/users/:id", async (req, res) => {
    try {
      const user = await storage.getUser(req.params.id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      
      // Don't return password
      const { password, ...userWithoutPassword } = user;
      res.json(userWithoutPassword);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  app.get("/api/users/:id/articles", async (req, res) => {
    try {
      const articles = await storage.getArticlesByAuthor(req.params.id);
      res.json(articles);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch user articles" });
    }
  });

  app.post("/api/users", async (req, res) => {
    try {
      const validatedData = insertUserSchema.parse(req.body);
      const user = await storage.createUser(validatedData);
      
      // Don't return password
      const { password, ...userWithoutPassword } = user;
      res.status(201).json(userWithoutPassword);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid user data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create user" });
    }
  });

  // Search
  app.get("/api/search", async (req, res) => {
    try {
      const query = req.query.q as string;
      if (!query) {
        return res.status(400).json({ message: "Search query is required" });
      }
      
      const articles = await storage.searchArticles(query);
      
      const articlesWithAuthors = await Promise.all(
        articles.map(async (article) => {
          const author = await storage.getUser(article.authorId);
          return { ...article, author };
        })
      );
      
      res.json(articlesWithAuthors);
    } catch (error) {
      res.status(500).json({ message: "Search failed" });
    }
  });

  // Likes
  app.post("/api/articles/:id/like", async (req, res) => {
    try {
      const userId = req.body.userId;
      if (!userId) {
        return res.status(400).json({ message: "User ID is required" });
      }
      
      const like = await storage.likeArticle(userId, req.params.id);
      res.status(201).json(like);
    } catch (error) {
      res.status(500).json({ message: "Failed to like article" });
    }
  });

  app.delete("/api/articles/:id/like", async (req, res) => {
    try {
      const userId = req.body.userId;
      if (!userId) {
        return res.status(400).json({ message: "User ID is required" });
      }
      
      const unliked = await storage.unlikeArticle(userId, req.params.id);
      if (!unliked) {
        return res.status(404).json({ message: "Like not found" });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Failed to unlike article" });
    }
  });

  // Bookmarks
  app.post("/api/articles/:id/bookmark", async (req, res) => {
    try {
      const userId = req.body.userId;
      if (!userId) {
        return res.status(400).json({ message: "User ID is required" });
      }
      
      const bookmark = await storage.bookmarkArticle(userId, req.params.id);
      res.status(201).json(bookmark);
    } catch (error) {
      res.status(500).json({ message: "Failed to bookmark article" });
    }
  });

  app.delete("/api/articles/:id/bookmark", async (req, res) => {
    try {
      const userId = req.body.userId;
      if (!userId) {
        return res.status(400).json({ message: "User ID is required" });
      }
      
      const unbookmarked = await storage.unbookmarkArticle(userId, req.params.id);
      if (!unbookmarked) {
        return res.status(404).json({ message: "Bookmark not found" });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Failed to unbookmark article" });
    }
  });

  app.get("/api/users/:id/bookmarks", async (req, res) => {
    try {
      const bookmarks = await storage.getBookmarks(req.params.id);
      
      const bookmarksWithAuthors = await Promise.all(
        bookmarks.map(async (article) => {
          const author = await storage.getUser(article.authorId);
          return { ...article, author };
        })
      );
      
      res.json(bookmarksWithAuthors);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch bookmarks" });
    }
  });

  // Follow
  app.post("/api/users/:id/follow", async (req, res) => {
    try {
      const followerId = req.body.followerId;
      if (!followerId) {
        return res.status(400).json({ message: "Follower ID is required" });
      }
      
      const follow = await storage.followUser(followerId, req.params.id);
      res.status(201).json(follow);
    } catch (error) {
      res.status(500).json({ message: "Failed to follow user" });
    }
  });

  app.delete("/api/users/:id/follow", async (req, res) => {
    try {
      const followerId = req.body.followerId;
      if (!followerId) {
        return res.status(400).json({ message: "Follower ID is required" });
      }
      
      const unfollowed = await storage.unfollowUser(followerId, req.params.id);
      if (!unfollowed) {
        return res.status(404).json({ message: "Follow relationship not found" });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Failed to unfollow user" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
