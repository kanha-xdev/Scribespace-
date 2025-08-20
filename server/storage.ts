import { type User, type InsertUser, type Article, type InsertArticle, type Comment, type InsertComment, type Follow, type Bookmark, type Like } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // User methods
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: string, updates: Partial<User>): Promise<User | undefined>;
  
  // Article methods
  getArticle(id: string): Promise<Article | undefined>;
  getArticles(limit?: number, offset?: number, category?: string): Promise<Article[]>;
  getArticlesByAuthor(authorId: string): Promise<Article[]>;
  getFeaturedArticles(): Promise<Article[]>;
  createArticle(article: InsertArticle): Promise<Article>;
  updateArticle(id: string, updates: Partial<Article>): Promise<Article | undefined>;
  deleteArticle(id: string): Promise<boolean>;
  
  // Comment methods
  getCommentsByArticle(articleId: string): Promise<Comment[]>;
  createComment(comment: InsertComment): Promise<Comment>;
  
  // Follow methods
  followUser(followerId: string, followingId: string): Promise<Follow>;
  unfollowUser(followerId: string, followingId: string): Promise<boolean>;
  getFollowers(userId: string): Promise<User[]>;
  getFollowing(userId: string): Promise<User[]>;
  
  // Bookmark methods
  bookmarkArticle(userId: string, articleId: string): Promise<Bookmark>;
  unbookmarkArticle(userId: string, articleId: string): Promise<boolean>;
  getBookmarks(userId: string): Promise<Article[]>;
  
  // Like methods
  likeArticle(userId: string, articleId: string): Promise<Like>;
  unlikeArticle(userId: string, articleId: string): Promise<boolean>;
  likeComment(userId: string, commentId: string): Promise<Like>;
  unlikeComment(userId: string, commentId: string): Promise<boolean>;
  
  // Search methods
  searchArticles(query: string): Promise<Article[]>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User> = new Map();
  private articles: Map<string, Article> = new Map();
  private comments: Map<string, Comment> = new Map();
  private follows: Map<string, Follow> = new Map();
  private bookmarks: Map<string, Bookmark> = new Map();
  private likes: Map<string, Like> = new Map();

  constructor() {
    this.seedData();
  }

  private seedData() {
    // Create sample users
    const sampleUsers: User[] = [
      {
        id: "user-1",
        username: "sarahchen",
        email: "sarah@example.com",
        password: "hashed_password",
        name: "Sarah Chen",
        bio: "Mindful writer & digital wellness advocate",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b9c96c0d?w=150&h=150&fit=crop&crop=face",
        isVerified: true,
        followerCount: 2400,
        followingCount: 847,
        createdAt: new Date(),
      },
      {
        id: "user-2",
        username: "marcusrodriguez",
        email: "marcus@example.com",
        password: "hashed_password",
        name: "Marcus Rodriguez",
        bio: "Building a Sustainable Creative Practice",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
        isVerified: true,
        followerCount: 1800,
        followingCount: 423,
        createdAt: new Date(),
      },
    ];

    sampleUsers.forEach(user => this.users.set(user.id, user));

    // Create sample articles
    const sampleArticles: Article[] = [
      {
        id: "article-1",
        title: "The Art of Mindful Writing: Finding Your Voice in the Digital Age",
        content: `In today's fast-paced digital world, the art of mindful writing has become more important than ever. As we navigate through countless distractions and information overload, finding moments of clarity and authentic expression through writing can serve as both a creative outlet and a form of meditation.

Writing mindfully isn't just about putting words on paper; it's about creating a deeper connection with our thoughts, emotions, and the stories we want to tell. It requires us to slow down, breathe, and truly listen to our inner voice.

When we approach writing with mindfulness, we begin to notice the subtle rhythms of our language, the weight of our words, and the spaces between our thoughts. This awareness transforms not only how we write, but what we choose to write about.`,
        excerpt: "In a world saturated with content, discovering your authentic voice as a writer has become both more challenging and more essential than ever...",
        authorId: "user-1",
        category: "Writing",
        tags: ["writing", "mindfulness", "creativity"],
        readTime: 8,
        likes: 247,
        views: 1234,
        commentCount: 18,
        isPublished: true,
        featuredImage: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800&h=500&fit=crop",
        createdAt: new Date("2024-12-15"),
        updatedAt: new Date("2024-12-15"),
      },
      {
        id: "article-2",
        title: "Building a Sustainable Creative Practice in Remote Work Era",
        content: `The shift to remote work has fundamentally changed how creatives approach their craft. Here's how to build habits that actually stick and create meaningful work from anywhere.`,
        excerpt: "The shift to remote work has fundamentally changed how creatives approach their craft. Here's how to build habits that actually stick...",
        authorId: "user-2",
        category: "Productivity",
        tags: ["productivity", "remote work", "creativity"],
        readTime: 12,
        likes: 189,
        views: 892,
        commentCount: 24,
        isPublished: true,
        featuredImage: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&h=500&fit=crop",
        createdAt: new Date("2024-12-14"),
        updatedAt: new Date("2024-12-14"),
      },
    ];

    sampleArticles.forEach(article => this.articles.set(article.id, article));
  }

  // User methods
  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.username === username);
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.email === email);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = {
      ...insertUser,
      id,
      bio: insertUser.bio || null,
      avatar: insertUser.avatar || null,
      isVerified: false,
      followerCount: 0,
      followingCount: 0,
      createdAt: new Date(),
    };
    this.users.set(id, user);
    return user;
  }

  async updateUser(id: string, updates: Partial<User>): Promise<User | undefined> {
    const user = this.users.get(id);
    if (!user) return undefined;
    const updatedUser = { ...user, ...updates };
    this.users.set(id, updatedUser);
    return updatedUser;
  }

  // Article methods
  async getArticle(id: string): Promise<Article | undefined> {
    const article = this.articles.get(id);
    if (article) {
      // Increment view count
      article.views = (article.views || 0) + 1;
      this.articles.set(id, article);
    }
    return article;
  }

  async getArticles(limit = 10, offset = 0, category?: string): Promise<Article[]> {
    let articles = Array.from(this.articles.values())
      .filter(article => article.isPublished)
      .sort((a, b) => new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime());
    
    if (category) {
      articles = articles.filter(article => article.category.toLowerCase() === category.toLowerCase());
    }
    
    return articles.slice(offset, offset + limit);
  }

  async getArticlesByAuthor(authorId: string): Promise<Article[]> {
    return Array.from(this.articles.values())
      .filter(article => article.authorId === authorId && article.isPublished)
      .sort((a, b) => new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime());
  }

  async getFeaturedArticles(): Promise<Article[]> {
    return Array.from(this.articles.values())
      .filter(article => article.isPublished)
      .sort((a, b) => (b.likes || 0) - (a.likes || 0))
      .slice(0, 6);
  }

  async createArticle(insertArticle: InsertArticle): Promise<Article> {
    const id = randomUUID();
    const article: Article = {
      ...insertArticle,
      id,
      tags: insertArticle.tags || null,
      featuredImage: insertArticle.featuredImage || null,
      isPublished: insertArticle.isPublished || false,
      likes: 0,
      views: 0,
      commentCount: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.articles.set(id, article);
    return article;
  }

  async updateArticle(id: string, updates: Partial<Article>): Promise<Article | undefined> {
    const article = this.articles.get(id);
    if (!article) return undefined;
    const updatedArticle = { ...article, ...updates, updatedAt: new Date() };
    this.articles.set(id, updatedArticle);
    return updatedArticle;
  }

  async deleteArticle(id: string): Promise<boolean> {
    return this.articles.delete(id);
  }

  // Comment methods
  async getCommentsByArticle(articleId: string): Promise<Comment[]> {
    return Array.from(this.comments.values())
      .filter(comment => comment.articleId === articleId)
      .sort((a, b) => new Date(a.createdAt!).getTime() - new Date(b.createdAt!).getTime());
  }

  async createComment(insertComment: InsertComment): Promise<Comment> {
    const id = randomUUID();
    const comment: Comment = {
      ...insertComment,
      id,
      parentId: insertComment.parentId || null,
      likes: 0,
      createdAt: new Date(),
    };
    this.comments.set(id, comment);
    
    // Update article comment count
    const article = this.articles.get(insertComment.articleId);
    if (article) {
      article.commentCount = (article.commentCount || 0) + 1;
      this.articles.set(article.id, article);
    }
    
    return comment;
  }

  // Follow methods
  async followUser(followerId: string, followingId: string): Promise<Follow> {
    const id = randomUUID();
    const follow: Follow = {
      id,
      followerId,
      followingId,
      createdAt: new Date(),
    };
    this.follows.set(id, follow);
    
    // Update follower/following counts
    const follower = this.users.get(followerId);
    const following = this.users.get(followingId);
    if (follower) {
      follower.followingCount = (follower.followingCount ?? 0) + 1;
      this.users.set(followerId, follower);
    }
    if (following) {
      following.followerCount = (following.followerCount ?? 0) + 1;
      this.users.set(followingId, following);
    }
    
    return follow;
  }

  async unfollowUser(followerId: string, followingId: string): Promise<boolean> {
    const follow = Array.from(this.follows.values())
      .find(f => f.followerId === followerId && f.followingId === followingId);
    
    if (!follow) return false;
    
    this.follows.delete(follow.id);
    
    // Update follower/following counts
    const follower = this.users.get(followerId);
    const following = this.users.get(followingId);
    if (follower && follower.followingCount !== null && follower.followingCount > 0) {
      follower.followingCount = follower.followingCount - 1;
      this.users.set(followerId, follower);
    }
    if (following && following.followerCount !== null && following.followerCount > 0) {
      following.followerCount = following.followerCount - 1;
      this.users.set(followingId, following);
    }
    
    return true;
  }

  async getFollowers(userId: string): Promise<User[]> {
    const followerIds = Array.from(this.follows.values())
      .filter(follow => follow.followingId === userId)
      .map(follow => follow.followerId);
    
    return followerIds.map(id => this.users.get(id)).filter(Boolean) as User[];
  }

  async getFollowing(userId: string): Promise<User[]> {
    const followingIds = Array.from(this.follows.values())
      .filter(follow => follow.followerId === userId)
      .map(follow => follow.followingId);
    
    return followingIds.map(id => this.users.get(id)).filter(Boolean) as User[];
  }

  // Bookmark methods
  async bookmarkArticle(userId: string, articleId: string): Promise<Bookmark> {
    const id = randomUUID();
    const bookmark: Bookmark = {
      id,
      userId,
      articleId,
      createdAt: new Date(),
    };
    this.bookmarks.set(id, bookmark);
    return bookmark;
  }

  async unbookmarkArticle(userId: string, articleId: string): Promise<boolean> {
    const bookmark = Array.from(this.bookmarks.values())
      .find(b => b.userId === userId && b.articleId === articleId);
    
    if (!bookmark) return false;
    return this.bookmarks.delete(bookmark.id);
  }

  async getBookmarks(userId: string): Promise<Article[]> {
    const bookmarkedArticleIds = Array.from(this.bookmarks.values())
      .filter(bookmark => bookmark.userId === userId)
      .map(bookmark => bookmark.articleId);
    
    return bookmarkedArticleIds.map(id => this.articles.get(id)).filter(Boolean) as Article[];
  }

  // Like methods
  async likeArticle(userId: string, articleId: string): Promise<Like> {
    const id = randomUUID();
    const like: Like = {
      id,
      userId,
      articleId,
      commentId: null,
      createdAt: new Date(),
    };
    this.likes.set(id, like);
    
    // Update article like count
    const article = this.articles.get(articleId);
    if (article) {
      article.likes = (article.likes || 0) + 1;
      this.articles.set(articleId, article);
    }
    
    return like;
  }

  async unlikeArticle(userId: string, articleId: string): Promise<boolean> {
    const like = Array.from(this.likes.values())
      .find(l => l.userId === userId && l.articleId === articleId);
    
    if (!like) return false;
    
    this.likes.delete(like.id);
    
    // Update article like count
    const article = this.articles.get(articleId);
    if (article && article.likes && article.likes > 0) {
      article.likes = article.likes - 1;
      this.articles.set(articleId, article);
    }
    
    return true;
  }

  async likeComment(userId: string, commentId: string): Promise<Like> {
    const id = randomUUID();
    const like: Like = {
      id,
      userId,
      articleId: null,
      commentId,
      createdAt: new Date(),
    };
    this.likes.set(id, like);
    
    // Update comment like count
    const comment = this.comments.get(commentId);
    if (comment) {
      comment.likes = (comment.likes || 0) + 1;
      this.comments.set(commentId, comment);
    }
    
    return like;
  }

  async unlikeComment(userId: string, commentId: string): Promise<boolean> {
    const like = Array.from(this.likes.values())
      .find(l => l.userId === userId && l.commentId === commentId);
    
    if (!like) return false;
    
    this.likes.delete(like.id);
    
    // Update comment like count
    const comment = this.comments.get(commentId);
    if (comment && comment.likes && comment.likes > 0) {
      comment.likes = comment.likes - 1;
      this.comments.set(commentId, comment);
    }
    
    return true;
  }

  // Search methods
  async searchArticles(query: string): Promise<Article[]> {
    const searchTerm = query.toLowerCase();
    return Array.from(this.articles.values())
      .filter(article => 
        article.isPublished && (
          article.title.toLowerCase().includes(searchTerm) ||
          article.content.toLowerCase().includes(searchTerm) ||
          article.excerpt.toLowerCase().includes(searchTerm) ||
          article.tags?.some(tag => tag.toLowerCase().includes(searchTerm))
        )
      )
      .sort((a, b) => new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime());
  }
}

export const storage = new MemStorage();
