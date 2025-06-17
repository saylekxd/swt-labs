import {
  BlogPost,
  BlogPostCreate,
  BlogPostUpdate,
  BlogApiResponse,
  BlogListResponse,
  AIGenerationRequest,
  GeneratedBlogPost,
  AIContentRequest,
  AITranslationRequest,
  BlogPagination
} from '../types/blog';

const API_BASE = process.env.NODE_ENV === 'development' 
  ? 'http://localhost:5001/api' 
  : '/api';

class BlogApiError extends Error {
  constructor(message: string, public status?: number) {
    super(message);
    this.name = 'BlogApiError';
  }
}

// Helper function to handle API responses
async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
    throw new BlogApiError(
      errorData.error || `HTTP ${response.status}: ${response.statusText}`,
      response.status
    );
  }
  
  return response.json();
}

// Helper function to get admin session key from localStorage
function getAdminKey(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('blogAdminKey');
}

// Helper function to build URLs with admin key
function buildUrl(endpoint: string, includeAdminKey = false): string {
  const url = new URL(`${API_BASE}${endpoint}`, window.location.origin);
  
  if (includeAdminKey) {
    const adminKey = getAdminKey();
    if (adminKey) {
      url.searchParams.set('key', adminKey);
    }
  }
  
  return url.toString();
}

// Public Blog API Functions

/**
 * Fetch published blog posts (public)
 */
export async function fetchBlogPosts(pagination?: BlogPagination): Promise<BlogListResponse> {
  const url = new URL(`${API_BASE}/blog`);
  
  if (pagination) {
    if (pagination.limit) url.searchParams.set('limit', pagination.limit.toString());
    if (pagination.offset) url.searchParams.set('offset', pagination.offset.toString());
  }
  
  const response = await fetch(url.toString());
  return handleResponse<BlogListResponse>(response);
}

/**
 * Fetch a single blog post by slug (public)
 */
export async function fetchBlogPost(slug: string): Promise<BlogApiResponse<BlogPost>> {
  const response = await fetch(`${API_BASE}/blog/${slug}`);
  return handleResponse<BlogApiResponse<BlogPost>>(response);
}

// Admin Blog API Functions

/**
 * Fetch all blog posts (admin only)
 */
export async function fetchAllBlogPosts(pagination?: BlogPagination): Promise<BlogListResponse> {
  const url = buildUrl('/blog/admin/posts', true);
  const urlObj = new URL(url);
  
  if (pagination) {
    if (pagination.limit) urlObj.searchParams.set('limit', pagination.limit.toString());
    if (pagination.offset) urlObj.searchParams.set('offset', pagination.offset.toString());
  }
  
  const response = await fetch(urlObj.toString());
  return handleResponse<BlogListResponse>(response);
}

/**
 * Fetch all blog posts for admin (admin only)
 */
export async function getAdminBlogPosts(): Promise<BlogApiResponse<BlogPost[]>> {
  const url = buildUrl('/blog/admin/posts', true);
  
  const response = await fetch(url);
  
  return handleResponse<BlogApiResponse<BlogPost[]>>(response);
}

/**
 * Create a new blog post (admin only)
 */
export async function createBlogPost(data: BlogPostCreate): Promise<BlogApiResponse<BlogPost>> {
  const url = buildUrl('/blog/admin/create', true);
  
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  
  return handleResponse<BlogApiResponse<BlogPost>>(response);
}

/**
 * Update an existing blog post (admin only)
 */
export async function updateBlogPost(id: string, data: BlogPostUpdate): Promise<BlogApiResponse<BlogPost>> {
  const url = buildUrl(`/blog/admin/${id}`, true);
  
  const response = await fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  
  return handleResponse<BlogApiResponse<BlogPost>>(response);
}

/**
 * Delete a blog post (admin only)
 */
export async function deleteBlogPost(id: string): Promise<BlogApiResponse<void>> {
  const url = buildUrl(`/blog/admin/${id}`, true);
  
  const response = await fetch(url, {
    method: 'DELETE',
  });
  
  return handleResponse<BlogApiResponse<void>>(response);
}

// AI-Powered API Functions (admin only)

/**
 * Generate a blog post from a topic using AI (admin only)
 */
export async function generateBlogPost(request: AIGenerationRequest): Promise<BlogApiResponse<GeneratedBlogPost>> {
  const url = buildUrl('/blog/ai/generate', true);
  
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(request),
  });
  
  return handleResponse<BlogApiResponse<GeneratedBlogPost>>(response);
}

/**
 * Improve existing blog content using AI (admin only)
 */
export async function improveBlogContent(request: AIContentRequest): Promise<BlogApiResponse<{ original: string; improved: string }>> {
  const url = buildUrl('/blog/ai/improve', true);
  
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(request),
  });
  
  return handleResponse<BlogApiResponse<{ original: string; improved: string }>>(response);
}

/**
 * Generate a title from content using AI (admin only)
 */
export async function generateBlogTitle(content: string): Promise<BlogApiResponse<{ title: string }>> {
  const url = buildUrl('/blog/ai/title', true);
  
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ content }),
  });
  
  return handleResponse<BlogApiResponse<{ title: string }>>(response);
}

/**
 * Generate an excerpt from content using AI (admin only)
 */
export async function generateBlogExcerpt(content: string): Promise<BlogApiResponse<{ excerpt: string }>> {
  const url = buildUrl('/blog/ai/excerpt', true);
  
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ content }),
  });
  
  return handleResponse<BlogApiResponse<{ excerpt: string }>>(response);
}

/**
 * Generate tags from content using AI (admin only)
 */
export async function generateBlogTags(content: string): Promise<BlogApiResponse<{ tags: string[] }>> {
  const url = buildUrl('/blog/ai/tags', true);
  
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ content }),
  });
  
  return handleResponse<BlogApiResponse<{ tags: string[] }>>(response);
}

/**
 * Translate blog content using AI (admin only)
 */
export async function translateBlogContent(request: AITranslationRequest): Promise<BlogApiResponse<{ original: string; translated: string; targetLanguage: string }>> {
  const url = buildUrl('/blog/ai/translate', true);
  
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(request),
  });
  
  return handleResponse<BlogApiResponse<{ original: string; translated: string; targetLanguage: string }>>(response);
}

// Admin Authentication Helper

/**
 * Check if user has admin access
 */
export function isAdmin(): boolean {
  return !!getAdminKey();
}

/**
 * Set admin key and store in localStorage
 */
export function setAdminKey(key: string): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem('blogAdminKey', key);
  }
}

/**
 * Remove admin key from localStorage
 */
export function clearAdminKey(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('blogAdminKey');
  }
}

/**
 * Extract admin key from current URL and store it
 */
export function checkAndStoreAdminKey(): boolean {
  if (typeof window === 'undefined') return false;
  
  const urlParams = new URLSearchParams(window.location.search);
  const key = urlParams.get('key');
  
  if (key) {
    setAdminKey(key);
    // Clean up URL by removing the key parameter
    urlParams.delete('key');
    const newUrl = `${window.location.pathname}${urlParams.toString() ? '?' + urlParams.toString() : ''}`;
    window.history.replaceState({}, '', newUrl);
    return true;
  }
  
  return !!getAdminKey();
} 