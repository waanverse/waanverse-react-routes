Here’s a `README.md` for your `waanverse-react-routes` library:

````markdown
# Waanverse React Routes

`waanverse-react-routes` is a utility library for managing dynamic route paths in React applications with TypeScript. It allows users to define their own custom routes while providing full TypeScript support, including route name autocompletion and type safety.

## Features

-   **Dynamic Route Names**: Extend route names to suit your application.
-   **Type Safety**: TypeScript ensures that only valid route names are used.
-   **Customizable**: Easily customize the base route configuration by adding your own routes.
-   **Query & Path Params**: Support for route parameters and query string handling.

## Installation

```bash
pnpm add waanverse-react-routes
```
````

Alternatively, you can use `npm` or `yarn`:

```bash
npm install waanverse-react-routes
```

```bash
yarn add waanverse-react-routes
```

## Usage

### 1. **Extend Routes in Your Project**

The first step is to extend the `RouteNameType` to define your own custom routes. This is done via TypeScript's **module augmentation**. Here's how to do it:

#### **Create a custom routes file:**

```ts
import { RouteType, urlpatterns } from "waanverse-react-routes";

// Augment the global namespace to define custom route names
export type CustomRouteName = "Dashboard" | "Deposit";

// Define your custom routes
export const userRoutes: RouteType[] = [
    { name: "Dashboard", path: "/" },
    { name: "Deposit", path: "/deposit" },
    { name: "Transactions", path: "/transactions" },
    { name: "Transaction Details", path: "/transactions/:id" },
    { name: "Login", path: "/login" },
];

// Add the custom routes to the urlpatterns
urlpatterns.push(...userRoutes);
```

#### **What happens here:**

-   The `RouteNameType` is augmented to add your custom route names inside the `declare global` block.
-   The `urlpatterns` array is populated with your routes.

### 2. **Use `getPath` to Generate URLs**

Once you’ve set up your routes, you can use the `getPath` function to generate URLs for the defined routes.

```ts
import { getPath } from "waanverse-react-routes";

// Example usage
const dashboardUrl = getPath("Dashboard"); // "/"
const depositUrl = getPath("Deposit"); // "/deposit"
const transactionDetailsUrl = getPath("Transaction Details", { id: 123 }); // "/transactions/123"
```

#### **Route Parameters and Query Strings**

You can pass route parameters (like `:id`) and query parameters as follows:

```ts
const transactionDetailsUrl = getPath("Transaction Details", { id: 123 }, { ref: "abc" });
// "/transactions/123?ref=abc"
```

### 3. **Type Safety & Autocomplete**

With the module augmentation, TypeScript will now provide **autocomplete** for the route names, and will ensure that invalid route names cannot be used. For example:

```ts
const unknownUrl = getPath("UnknownRoute"); // Error: Argument of type '"UnknownRoute"' is not assignable to parameter of type 'RouteNameType'.
```

This makes your code more robust and easier to work with!

---

## API

### `getPath(name: RouteNameType, params?: Record<string, string | number>, query?: Record<string, string | number>)`

Generates the URL path for a given route name, with optional parameters and query strings.

#### **Parameters:**

-   `name` (RouteNameType): The name of the route (e.g., `"Dashboard"`, `"Login"`, etc.).
-   `params` (optional): An object of parameters to replace in the route path (e.g., `{ id: 123 }`).
-   `query` (optional): An object of query parameters to append to the URL (e.g., `{ ref: "abc" }`).

#### **Returns:**

A string representing the URL path.

### Example:

```ts
const dashboardUrl = getPath("Dashboard"); // "/"
const userProfileUrl = getPath("UserProfile", { id: 456 }); // "/user/456"
```

---

## Extending Routes

To extend the route names for your own application:

1. **Create a global extension of the `RouteNameType`.**
2. **Define the custom routes** in the `urlpatterns` array.

Example:

```ts
// Extend route names
declare global {
    namespace WaanverseRouter {
        export type CustomRouteName = "Dashboard" | "Profile" | "Settings";
    }
}

// Define routes
export const customRoutes: RouteType[] = [
    { name: "Dashboard", path: "/" },
    { name: "Profile", path: "/profile" },
    { name: "Settings", path: "/settings" },
];

urlpatterns.push(...customRoutes);
```

---

## Contributing

If you'd like to contribute to this project, feel free to fork the repository and submit pull requests. Any help is appreciated!

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

```

### Explanation of the `README.md`:

- **Installation Instructions**: How users install the library.
- **Usage**: Describes how users can extend their own routes and use `getPath` to generate URLs.
- **API**: Documentation of the `getPath` function with parameters and return type.
- **Extending Routes**: Explains how users can define their own routes with module augmentation and push them into `urlpatterns`.
- **Contributing and License**: Sections for users who want to contribute to the library.
```
