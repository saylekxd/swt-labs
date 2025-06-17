import * as React from 'react';

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  featured_image_url?: string;
  author_name: string;
  published: boolean;
  created_at: string;
  updated_at: string;
  tags?: string[];
}

export interface BlogPostCreate {
  title: string;
  slug?: string;
  content: string;
  excerpt?: string;
  featured_image_url?: string;
  published?: boolean;
  tags?: string[];
}

export interface BlogPostUpdate {
  title?: string;
  slug?: string;
  content?: string;
  excerpt?: string;
  featured_image_url?: string;
  published?: boolean;
  tags?: string[];
}

// Request types for admin interface
export interface CreateBlogRequest {
  title: string;
  content: string;
  excerpt?: string;
  featured_image?: string;
  status?: 'draft' | 'published';
  tags?: string[];
  published_at?: string | null;
}

export interface UpdateBlogRequest {
  title?: string;
  content?: string;
  excerpt?: string;
  featured_image?: string;
  status?: 'draft' | 'published';
  tags?: string[];
  published_at?: string | null;
}

export interface BlogApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface BlogListResponse {
  success: boolean;
  data: BlogPost[];
  pagination: {
    limit: number;
    offset: number;
    count: number;
  };
}

export interface AIGenerationRequest {
  topic: string;
  keywords?: string[];
  language?: 'en' | 'pl';
  tone?: 'professional' | 'casual' | 'technical';
  length?: 'short' | 'medium' | 'long';
}

export interface GeneratedBlogPost {
  title: string;
  content: string;
  excerpt: string;
  tags: string[];
  slug: string;
}

export interface AIContentRequest {
  content: string;
  improvements?: string[];
}

export interface AITranslationRequest {
  content: string;
  targetLanguage: 'en' | 'pl';
}

export interface BlogFilters {
  published?: boolean;
  tags?: string[];
  search?: string;
  author?: string;
}

export interface BlogPagination {
  limit: number;
  offset: number;
}

export type BlogFormData = BlogPostCreate;

export interface BlogEditorProps {
  initialData?: Partial<BlogPost>;
  onSave: (data: BlogFormData) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
}

export interface BlogCardProps extends React.HTMLAttributes<HTMLDivElement> {
  post: BlogPost;
  onClick?: () => void;
  showExcerpt?: boolean;
  showAuthor?: boolean;
  showTags?: boolean;
}

export interface AdminContextType {
  isAdmin: boolean;
  adminKey?: string;
  login: (key: string) => void;
  logout: () => void;
} 