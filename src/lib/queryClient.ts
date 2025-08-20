import { QueryClient, QueryFunction } from "@tanstack/react-query";
import { mockArticles, mockUsers, mockApiDelay } from "./mockData";

// Mock API for frontend-only deployment
const mockApi = async (url: string, method: string = "GET", data?: any): Promise<any> => {
  await mockApiDelay(); // Simulate network delay
  
  const urlPath = url.replace(/^\//, ''); // Remove leading slash
  
  // Articles endpoints
  if (urlPath === 'api/articles/featured') {
    return mockArticles.slice(0, 3);
  }
  
  if (urlPath === 'api/articles') {
    return mockArticles;
  }
  
  if (urlPath.startsWith('api/articles/') && method === 'GET') {
    const id = urlPath.split('/').pop();
    const article = mockArticles.find(a => a.id === id);
    if (!article) throw new Error('Article not found');
    return article;
  }
  
  if (urlPath === 'api/articles' && method === 'POST') {
    const newArticle = {
      id: `article-${Date.now()}`,
      ...data,
      author: "You",
      authorId: "user-current",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      likes: 0,
      isLiked: false,
      isBookmarked: false,
      published: true,
      readTime: Math.ceil((data.content?.split(' ').length || 0) / 200) || 1
    };
    return newArticle;
  }
  
  // Auth endpoints
  if (urlPath.includes('api/auth')) {
    return { 
      success: true, 
      user: { 
        ...mockUsers[0],
        name: localStorage.getItem("userName") || "Demo User",
        email: localStorage.getItem("userEmail") || "demo@example.com"
      } 
    };
  }
  
  // Users endpoints
  if (urlPath === 'api/users/me') {
    return {
      ...mockUsers[0],
      name: localStorage.getItem("userName") || "Demo User", 
      email: localStorage.getItem("userEmail") || "demo@example.com"
    };
  }
  
  throw new Error(`Mock API: Endpoint not found: ${urlPath}`);
};

export async function apiRequest(
  method: string,
  url: string,
  data?: unknown | undefined,
): Promise<Response> {
  const mockResponse = await mockApi(url, method, data);
  
  // Create a mock Response object
  return new Response(JSON.stringify(mockResponse), {
    status: 200,
    statusText: 'OK',
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

type UnauthorizedBehavior = "returnNull" | "throw";
export const getQueryFn: <T>(options: {
  on401: UnauthorizedBehavior;
}) => QueryFunction<T> =
  ({ on401: unauthorizedBehavior }) =>
  async ({ queryKey }) => {
    try {
      return await mockApi(queryKey.join("/"));
    } catch (error) {
      if (unauthorizedBehavior === "returnNull" && (error as Error).message.includes('401')) {
        return null;
      }
      throw error;
    }
  };

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: getQueryFn({ on401: "throw" }),
      refetchInterval: false,
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5, // 5 minutes for demo
      retry: false,
    },
    mutations: {
      retry: false,
    },
  },
});
