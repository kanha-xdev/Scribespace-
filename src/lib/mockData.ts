// Mock data for frontend-only deployment
export const mockArticles = [
  {
    id: "article-1",
    title: "The Art of Mindful Writing",
    excerpt: "Discover how mindfulness can transform your writing process and help you create more meaningful content.",
    content: `# The Art of Mindful Writing

Writing is not just about putting words on paper; it's about channeling your thoughts, emotions, and experiences into something meaningful. Mindful writing takes this a step further by incorporating awareness and intention into every aspect of the creative process.

## What is Mindful Writing?

Mindful writing is the practice of bringing complete attention to the present moment while writing. It involves:

- **Awareness of thoughts** - Observing your thoughts without judgment
- **Focused attention** - Staying present with each word and sentence
- **Emotional awareness** - Recognizing and processing emotions as they arise
- **Intentional expression** - Writing with purpose and clarity

## Benefits of Mindful Writing

1. **Improved creativity** - When we're fully present, creative insights flow more naturally
2. **Reduced writer's block** - Mindfulness helps overcome mental barriers
3. **Enhanced self-awareness** - Writing becomes a tool for personal discovery
4. **Better emotional regulation** - Processing emotions through writing

## How to Practice Mindful Writing

Start with these simple techniques:

### 1. Begin with breath awareness
Take a few deep breaths before writing to center yourself.

### 2. Set an intention
Ask yourself: What do I want to express or explore?

### 3. Write without judgment
Allow words to flow without editing or criticizing.

### 4. Stay present
When your mind wanders, gently return attention to your writing.

## Conclusion

Mindful writing transforms the act of writing from a mechanical process into a meditative practice. It helps us connect more deeply with our thoughts and emotions, resulting in more authentic and meaningful content.

Try incorporating these techniques into your writing practice and notice how your relationship with writing evolves.`,
    author: "Sarah Johnson",
    authorId: "user-1",
    createdAt: "2024-01-15T10:30:00Z",
    updatedAt: "2024-01-15T10:30:00Z",
    category: "Writing",
    tags: ["mindfulness", "creativity", "writing-tips"],
    featuredImage: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800&h=400&fit=crop",
    readTime: 8,
    likes: 42,
    isLiked: false,
    isBookmarked: false,
    published: true
  },
  {
    id: "article-2", 
    title: "Building Modern Web Applications",
    excerpt: "A comprehensive guide to creating responsive, accessible web applications using modern frameworks and tools.",
    content: `# Building Modern Web Applications

The landscape of web development has evolved dramatically over the past few years. Modern web applications require thoughtful architecture, responsive design, and careful attention to user experience.

## Key Principles

### 1. Component-Based Architecture
Modern applications are built using reusable components that encapsulate functionality and styling.

### 2. Responsive Design
Applications must work seamlessly across all device sizes and screen resolutions.

### 3. Accessibility First
Building inclusive applications that work for users with disabilities.

### 4. Performance Optimization
Ensuring fast load times and smooth interactions.

## Technology Stack

### Frontend
- **React** - Component-based UI library
- **TypeScript** - Type safety and better developer experience
- **Tailwind CSS** - Utility-first CSS framework

### Backend
- **Node.js** - JavaScript runtime
- **Express** - Web application framework
- **PostgreSQL** - Relational database

### Tools
- **Vite** - Fast build tool
- **ESLint** - Code quality
- **Prettier** - Code formatting

## Best Practices

1. **Code Organization** - Keep components small and focused
2. **State Management** - Use appropriate state management solutions
3. **Error Handling** - Implement comprehensive error boundaries
4. **Testing** - Write unit and integration tests
5. **Documentation** - Maintain clear project documentation

Building modern web applications requires balancing many concerns, but following these principles will help you create applications that are maintainable, scalable, and user-friendly.`,
    author: "Alex Chen",
    authorId: "user-2", 
    createdAt: "2024-01-12T14:20:00Z",
    updatedAt: "2024-01-12T14:20:00Z",
    category: "Technology",
    tags: ["web-development", "react", "frontend"],
    featuredImage: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=400&fit=crop",
    readTime: 12,
    likes: 67,
    isLiked: true,
    isBookmarked: true,
    published: true
  },
  {
    id: "article-3",
    title: "The Future of Remote Work",
    excerpt: "Exploring how remote work is reshaping the modern workplace and what it means for the future of productivity.",
    content: `# The Future of Remote Work

Remote work has transitioned from a luxury to a necessity for many organizations worldwide. This shift has brought about unprecedented changes in how we collaborate, communicate, and maintain work-life balance.

## The Remote Revolution

### Before 2020
- Remote work was considered a perk
- Limited to certain industries
- Often met with skepticism

### Post-2020 Reality
- Became essential for business continuity
- Proven effective across industries
- Changed employee expectations permanently

## Benefits of Remote Work

### For Employees
- **Flexibility** - Better work-life balance
- **No commute** - More time for personal activities
- **Comfort** - Working from familiar environments
- **Reduced costs** - Lower transportation and clothing expenses

### For Employers
- **Wider talent pool** - Hire from anywhere
- **Reduced overhead** - Lower office costs
- **Increased productivity** - Many report higher output
- **Employee satisfaction** - Higher retention rates

## Challenges and Solutions

### Communication
**Challenge**: Reduced face-to-face interaction
**Solution**: Regular video calls and structured communication protocols

### Collaboration
**Challenge**: Coordinating across time zones
**Solution**: Asynchronous work practices and shared documentation

### Company Culture
**Challenge**: Maintaining team cohesion
**Solution**: Virtual team building and clear company values

### Work-Life Balance
**Challenge**: Difficulty disconnecting from work
**Solution**: Clear boundaries and dedicated workspaces

## Tools for Success

- **Communication**: Slack, Microsoft Teams, Discord
- **Video Conferencing**: Zoom, Google Meet, Microsoft Teams
- **Project Management**: Asana, Trello, Notion
- **File Sharing**: Google Drive, Dropbox, GitHub
- **Time Tracking**: RescueTime, Toggl, Clockwise

## The Future Outlook

Remote work is here to stay, but the future likely holds a hybrid model:

1. **Flexible schedules** - Employees choose when and where to work
2. **Purpose-driven office visits** - Coming together for specific activities
3. **Investment in remote infrastructure** - Better tools and processes
4. **New management styles** - Focus on outcomes rather than hours

## Conclusion

The future of work is flexible, digital, and human-centered. Organizations that embrace this shift and invest in their remote work capabilities will thrive in the new economy.

Success in remote work requires intentionality, the right tools, and a culture that prioritizes communication and results over presence.`,
    author: "Maria Rodriguez",
    authorId: "user-3",
    createdAt: "2024-01-10T09:15:00Z", 
    updatedAt: "2024-01-10T09:15:00Z",
    category: "Business",
    tags: ["remote-work", "productivity", "workplace"],
    featuredImage: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&h=400&fit=crop",
    readTime: 6,
    likes: 34,
    isLiked: false,
    isBookmarked: false,
    published: true
  }
];

export const mockUsers = [
  {
    id: "user-1",
    name: "Sarah Johnson",
    email: "sarah@example.com",
    bio: "Freelance writer and mindfulness enthusiast. Passionate about helping others discover the power of mindful writing.",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b798?w=150&h=150&fit=crop&crop=face",
    following: 128,
    followers: 542,
    articlesCount: 23
  },
  {
    id: "user-2",
    name: "Alex Chen",
    email: "alex@example.com", 
    bio: "Full-stack developer and tech enthusiast. Building the future of web applications.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    following: 89,
    followers: 312,
    articlesCount: 18
  },
  {
    id: "user-3",
    name: "Maria Rodriguez",
    email: "maria@example.com",
    bio: "Business strategist and remote work advocate. Helping companies navigate the future of work.",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    following: 156,
    followers: 423,
    articlesCount: 31
  }
];

export const mockCategories = [
  "Writing",
  "Technology", 
  "Business",
  "Design",
  "Marketing",
  "Personal Development",
  "Health & Wellness",
  "Travel",
  "Food & Cooking",
  "Science"
];

// Mock API simulator
export const mockApiDelay = () => new Promise(resolve => 
  setTimeout(resolve, Math.random() * 500 + 200)
);