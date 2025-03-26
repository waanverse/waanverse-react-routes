// Base types (Initially empty)
export type BaseRouteName = never; // No default routes

export interface RouteType {
    name: BaseRouteName;
    path: string;
}

// Empty urlpatterns array (Users will define their own)
export const urlpatterns: RouteType[] = [];

// Utility functions
const replaceParams = (path: string, params?: Record<string, string | number>) => {
    if (!params) return path;
    return path.replace(/:([a-zA-Z_]+)/g, (_, key) => {
        if (params[key] !== undefined) {
            return String(params[key]);
        }
        throw new Error(`Missing required param: ${key}`);
    });
};

const addQueryParams = (path: string, query?: Record<string, string | number>) => {
    if (!query || Object.keys(query).length === 0) return path;
    const queryString = new URLSearchParams(query as Record<string, string>).toString();
    return `${path}?${queryString}`;
};

// Generic getPath function
export const getPath = <T extends RouteNameType>(name: T, params?: Record<string, string | number>, query?: Record<string, string | number>): string => {
    const route = urlpatterns.find((route) => route.name === name);
    if (!route) throw new Error(`Route "${name}" not found`);
    const finalPath = replaceParams(route.path, params);
    return addQueryParams(finalPath, query);
};

// Allow extending via module augmentation
declare global {
    namespace WaanverseRouter {
        export type CustomRouteName = BaseRouteName;
    }
}

// Export type for user extensions
export type RouteNameType = WaanverseRouter.CustomRouteName;
