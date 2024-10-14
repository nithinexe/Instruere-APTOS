// middleware.ts
import { authMiddleware } from "@clerk/nextjs";

// Apply Clerk's middleware to secure routes
export default authMiddleware({
  // Here you can define which routes the middleware should be applied to
  publicRoutes: ["/", "/upload", "/minning"],  // Adjust based on your needs
});

// This matcher will ensure the middleware is applied to all routes
export const config = {
  matcher: [
    "/((?!_next/image|_next/static|favicon.ico).*)", // Exclude some system routes from Clerk middleware
  ],
};
