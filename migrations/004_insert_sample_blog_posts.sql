-- Migration: 004_insert_sample_blog_posts.sql
-- Description: Insert sample blog posts for testing and demonstration
-- Created: 2024

-- Insert sample blog posts
INSERT INTO blog_posts (title, slug, content, excerpt, featured_image_url, author_name, published, tags) VALUES

-- Published posts
(
    'Getting Started with React and TypeScript',
    'getting-started-with-react-typescript',
    '# Getting Started with React and TypeScript

React and TypeScript make a powerful combination for building modern web applications. TypeScript adds static type checking to JavaScript, which helps catch errors early and improves code maintainability.

## Why Use TypeScript with React?

1. **Better Developer Experience**: IntelliSense, autocomplete, and refactoring tools work much better
2. **Catch Errors Early**: Type checking helps identify issues before runtime
3. **Self-Documenting Code**: Types serve as inline documentation
4. **Easier Refactoring**: Confident code changes with type safety

## Setting Up Your Project

```bash
npx create-react-app my-app --template typescript
cd my-app
npm start
```

## Basic Component Example

```typescript
interface Props {
  name: string;
  age?: number;
}

const UserCard: React.FC<Props> = ({ name, age }) => {
  return (
    <div className="user-card">
      <h2>{name}</h2>
      {age && <p>Age: {age}</p>}
    </div>
  );
};
```

## Conclusion

TypeScript with React provides excellent developer experience and helps build more reliable applications. Start small and gradually add more types as you become comfortable.',
    'Learn how to combine React with TypeScript for better developer experience and type safety. Complete guide with examples and best practices.',
    'https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?w=800&h=400&fit=crop',
    'Admin',
    true,
    ARRAY['react', 'typescript', 'javascript', 'frontend', 'tutorial']
),

(
    'Modern CSS Techniques for Better UI Design',
    'modern-css-techniques-ui-design',
    '# Modern CSS Techniques for Better UI Design

CSS has evolved significantly in recent years. Modern techniques like CSS Grid, Flexbox, and custom properties have revolutionized how we approach web design.

## CSS Grid vs Flexbox

### When to Use CSS Grid
- Two-dimensional layouts
- Complex grid systems
- Card layouts

### When to Use Flexbox
- One-dimensional layouts
- Navigation bars
- Centering content

## CSS Custom Properties (Variables)

```css
:root {
  --primary-color: #3b82f6;
  --secondary-color: #8b5cf6;
  --border-radius: 8px;
}

.button {
  background: var(--primary-color);
  border-radius: var(--border-radius);
}
```

## Container Queries

The future of responsive design:

```css
@container (min-width: 400px) {
  .card {
    display: flex;
  }
}
```

## Conclusion

These modern CSS techniques enable us to create more maintainable and responsive designs with less code.',
    'Explore modern CSS techniques including Grid, Flexbox, custom properties, and container queries for better web design.',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop',
    'Admin',
    true,
    ARRAY['css', 'design', 'frontend', 'responsive', 'modern']
),

(
    'Building Scalable APIs with Node.js and Express',
    'building-scalable-apis-nodejs-express',
    '# Building Scalable APIs with Node.js and Express

Creating scalable APIs requires careful planning and implementation of best practices. This guide covers essential patterns for building robust Node.js APIs.

## Project Structure

```
src/
├── controllers/
├── middleware/
├── models/
├── routes/
├── services/
├── utils/
└── index.js
```

## Essential Middleware

### Error Handling
```javascript
const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    success: false,
    error: err.message,
    ...(process.env.NODE_ENV === "development" && { stack: err.stack })
  });
};
```

### Rate Limiting
```javascript
const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
```

## Database Optimization

- Use connection pooling
- Implement proper indexing
- Use pagination for large datasets
- Cache frequently accessed data

## Security Best Practices

1. **Validate Input**: Always validate and sanitize user input
2. **Use HTTPS**: Encrypt data in transit
3. **JWT Tokens**: For stateless authentication
4. **CORS**: Configure properly for cross-origin requests

## Monitoring and Logging

Implement comprehensive logging and monitoring to track API performance and issues.',
    'Learn how to build scalable and maintainable APIs using Node.js and Express with best practices and real-world examples.',
    'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=400&fit=crop',
    'Admin',
    true,
    ARRAY['nodejs', 'express', 'api', 'backend', 'scalability']
),

(
    'Database Design Patterns for Modern Applications',
    'database-design-patterns-modern-applications',
    '# Database Design Patterns for Modern Applications

Effective database design is crucial for application performance and scalability. This article explores common patterns and best practices.

## Normalization vs Denormalization

### When to Normalize
- Reduce data redundancy
- Maintain data integrity
- Save storage space

### When to Denormalize
- Improve read performance
- Reduce complex joins
- Handle high-traffic scenarios

## Common Design Patterns

### Repository Pattern
```javascript
class UserRepository {
  async findById(id) {
    return await db.users.findByPk(id);
  }
  
  async create(userData) {
    return await db.users.create(userData);
  }
}
```

### Unit of Work Pattern
Manages transactions across multiple repositories.

### Active Record Pattern
Models contain both data and behavior.

## Performance Optimization

1. **Indexing Strategy**: Index frequently queried columns
2. **Query Optimization**: Avoid N+1 queries
3. **Connection Pooling**: Reuse database connections
4. **Caching**: Implement Redis for frequently accessed data

## Migration Strategies

- Version control your schema changes
- Use reversible migrations
- Test migrations on staging first
- Plan for zero-downtime deployments

## Conclusion

Good database design patterns form the foundation of scalable applications. Choose patterns that fit your specific use case and performance requirements.',
    'Explore essential database design patterns for modern applications including normalization, repository pattern, and performance optimization techniques.',
    'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=800&h=400&fit=crop',
    'Admin',
    true,
    ARRAY['database', 'design-patterns', 'performance', 'sql', 'optimization']
),

-- Draft posts
(
    'Advanced React Patterns and Hooks',
    'advanced-react-patterns-hooks',
    '# Advanced React Patterns and Hooks

This article covers advanced React patterns that can help you write more maintainable and performant applications.

## Custom Hooks

Custom hooks allow you to extract component logic into reusable functions:

```typescript
function useCounter(initialValue = 0) {
  const [count, setCount] = useState(initialValue);
  
  const increment = useCallback(() => setCount(c => c + 1), []);
  const decrement = useCallback(() => setCount(c => c - 1), []);
  const reset = useCallback(() => setCount(initialValue), [initialValue]);
  
  return { count, increment, decrement, reset };
}
```

## Compound Components Pattern

```typescript
const Tabs = ({ children, defaultTab = 0 }) => {
  const [activeTab, setActiveTab] = useState(defaultTab);
  
  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      {children}
    </TabsContext.Provider>
  );
};

Tabs.List = TabsList;
Tabs.Tab = Tab;
Tabs.Panels = TabsPanels;
Tabs.Panel = TabPanel;
```

This is a work in progress...',
    'Deep dive into advanced React patterns including custom hooks, compound components, render props, and performance optimization techniques.',
    'https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?w=800&h=400&fit=crop',
    'Admin',
    false,
    ARRAY['react', 'advanced', 'hooks', 'patterns', 'performance']
),

(
    'Microservices Architecture Best Practices',
    'microservices-architecture-best-practices',
    '# Microservices Architecture Best Practices

Microservices architecture has become increasingly popular for building scalable applications. However, it comes with its own set of challenges.

## When to Use Microservices

- Large development teams
- Different technology requirements
- Independent deployment needs
- Specific scaling requirements

## Service Communication

### Synchronous Communication
- REST APIs
- GraphQL
- gRPC

### Asynchronous Communication
- Message queues
- Event streaming
- Pub/Sub patterns

## Data Management

Each microservice should own its data:

```
┌─────────────┐  ┌─────────────┐  ┌─────────────┐
│   Service A │  │   Service B │  │   Service C │
│             │  │             │  │             │
│   ┌─────┐   │  │   ┌─────┐   │  │   ┌─────┐   │
│   │ DB  │   │  │   │ DB  │   │  │   │ DB  │   │
│   └─────┘   │  │   └─────┘   │  │   └─────┘   │
└─────────────┘  └─────────────┘  └─────────────┘
```

This article is still being written...',
    'Learn microservices architecture best practices including service communication, data management, and deployment strategies.',
    'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=400&fit=crop',
    'Admin',
    false,
    ARRAY['microservices', 'architecture', 'scalability', 'backend', 'design']
);

-- Insert sample categories
INSERT INTO blog_categories (name, slug) VALUES
('Frontend Development', 'frontend-development'),
('Backend Development', 'backend-development'),
('Database Design', 'database-design'),
('Architecture', 'architecture'),
('Tutorials', 'tutorials'),
('Best Practices', 'best-practices');

-- Link posts to categories
INSERT INTO blog_post_categories (post_id, category_id)
SELECT p.id, c.id
FROM blog_posts p, blog_categories c
WHERE 
  (p.slug = 'getting-started-with-react-typescript' AND c.slug IN ('frontend-development', 'tutorials')) OR
  (p.slug = 'modern-css-techniques-ui-design' AND c.slug IN ('frontend-development', 'best-practices')) OR
  (p.slug = 'building-scalable-apis-nodejs-express' AND c.slug IN ('backend-development', 'best-practices')) OR
  (p.slug = 'database-design-patterns-modern-applications' AND c.slug IN ('database-design', 'best-practices')) OR
  (p.slug = 'advanced-react-patterns-hooks' AND c.slug IN ('frontend-development', 'tutorials')) OR
  (p.slug = 'microservices-architecture-best-practices' AND c.slug IN ('architecture', 'backend-development')); 