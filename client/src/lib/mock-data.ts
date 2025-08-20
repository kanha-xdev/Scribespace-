// This file is intentionally minimal as per guidelines to avoid generating mock data
// It serves as a placeholder for any future data utilities that might be needed

export const EMPTY_STATE_MESSAGES = {
  noArticles: "No articles found",
  noComments: "No responses yet",
  noResults: "No results found",
  loading: "Loading...",
} as const;

export const API_ENDPOINTS = {
  articles: "/api/articles",
  comments: "/api/comments",
  users: "/api/users",
  search: "/api/search",
} as const;

export const PAGINATION_DEFAULTS = {
  limit: 10,
  offset: 0,
} as const;
