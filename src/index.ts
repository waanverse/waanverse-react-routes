// Base type for route configuration
export interface RouteConfig<K extends string> {
    name: K;
    path: string;
}

// Utility class to manage route definitions with type safety
export class RouterBuilder<RouteNames extends string = never> {
    private routes: Array<RouteConfig<RouteNames | string>> = [];

    // Method to add a new route with type safety
    addRoute<K extends string>(route: RouteConfig<K>): RouterBuilder<RouteNames | K> {
        this.routes.push(route as RouteConfig<RouteNames | K>);
        return this as RouterBuilder<RouteNames | K>;
    }

    // Finalize route configuration
    build(): RouteConfig<RouteNames>[] {
        return this.routes as RouteConfig<RouteNames>[];
    }

    // Utility function for path parameter replacement
    private replaceParams(path: string, params?: Record<string, string | number>) {
        if (!params) return path;
        return path.replace(/:([a-zA-Z_]+)/g, (_, key) => {
            if (params[key] !== undefined) {
                return String(params[key]);
            }
            throw new Error(`Missing required param: ${key}`);
        });
    }

    // Utility function for adding query parameters
    private addQueryParams(path: string, query?: Record<string, string | number>) {
        if (!query || Object.keys(query).length === 0) return path;
        const queryString = new URLSearchParams(query as Record<string, string>).toString();
        return `${path}?${queryString}`;
    }

    // Generic path getter with type safety
    getPath<K extends RouteNames>(name: K, params?: Record<string, string | number>, query?: Record<string, string | number>): string {
        const route = this.routes.find((route) => route.name === name);
        if (!route) throw new Error(`Route "${name}" not found`);

        const finalPath = this.replaceParams(route.path, params);
        return this.addQueryParams(finalPath, query);
    }
}
