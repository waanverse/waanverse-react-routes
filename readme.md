# Waanverse React Routes

`waanverse-react-routes` is a lightweight, type-safe routing utility for React applications with TypeScript. It provides a flexible way to define and manage dynamic routes with full TypeScript support, including route name autocompletion and comprehensive type safety.

## Features

- **Type-Safe Route Definitions**: Create routes with complete TypeScript type checking
- **Dynamic Route Configuration**: Easily add and manage routes with a fluent interface
- **Parameter Handling**: Support for both path and query parameters
- **Intuitive API**: Simple method for generating URLs with built-in error checking

## Installation

```bash
pnpm add waanverse-react-routes
```

Alternatively, use npm or yarn:

```bash
npm install waanverse-react-routes
yarn add waanverse-react-routes
```

## Usage

### 1. Create Your Router

```typescript
import { RouterBuilder } from 'waanverse-react-routes';

// Create a router and define your routes
const router = new RouterBuilder()
    .addRoute({ name: 'home', path: '/' })
    .addRoute({ name: 'users', path: '/users' })
    .addRoute({ name: 'userProfile', path: '/users/:userId' })
    .addRoute({ name: 'userPosts', path: '/users/:userId/posts' });
```

### 2. Generate URLs with Type Safety

```typescript
// Generate simple paths
const homePath = router.getPath('home');
// Output: "/"

// Generate paths with route parameters
const userProfilePath = router.getPath('userProfile', { userId: '123' });
// Output: "/users/123"

// Generate paths with route and query parameters
const userPostsPath = router.getPath('userPosts', 
    { userId: '456' },  // Route parameters
    { page: '1', sort: 'recent' }  // Query parameters
);
// Output: "/users/456/posts?page=1&sort=recent"
```

### 3. Error Handling

The router provides robust error handling:

```typescript
// Throws an error if the route is not defined
router.getPath('nonexistentRoute'); 
// Error: Route "nonexistentRoute" not found

// Throws an error if required path parameters are missing
router.getPath('userProfile'); 
// Error: Missing required param: userId
```

## API Reference

### `RouterBuilder`

#### Methods

- `addRoute(route: RouteConfig<K>)`: Add a new route to the router
  - `name`: A unique identifier for the route
  - `path`: The URL path, which can include parameters (e.g., `/users/:userId`)

- `getPath(name, params?, query?)`: Generate a URL for a specific route
  - `name`: The route name
  - `params` (optional): An object of path parameters
  - `query` (optional): An object of query parameters

### Route Configuration

```typescript
interface RouteConfig<K extends string> {
    name: K;       // Unique route identifier
    path: string;  // URL path, can include parameters
}
```

## TypeScript Support

The library provides full TypeScript support:

- Autocomplete for route names
- Type checking for route parameters
- Compile-time errors for invalid route usage

```typescript
// TypeScript will provide autocompletion and type checking
const path = router.getPath('userProfile', { userId: '123' });
```

## Best Practices

- Keep route names consistent and descriptive
- Use lowercase for route names
- Include all necessary parameters in route definitions
- Leverage TypeScript's type checking

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

[Your License Here]