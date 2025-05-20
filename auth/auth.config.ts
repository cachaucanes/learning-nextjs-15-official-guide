import type { NextAuthConfig } from "next-auth";

const publicRoutes = ["/", "/login", "/about", "/contact"];
const protectedRoutes = [
  "/dashboard",
  "/dashboard/settings",
  "/dashboard/profile",
  "/admin",
];

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const { pathname } = nextUrl;
      const isLoggedIn = !!auth?.user;

      const isProtected = protectedRoutes.some((route) =>
        pathname.startsWith(route)
      );

      if (isProtected && !isLoggedIn) {
        return false; // bloqueamos y el middleware redirige a login
      }

      const isPublic = publicRoutes.includes(pathname);

      if (isPublic && isLoggedIn) {
        const isNonLoginPublicRoute = pathname !== "/login";
        if (isNonLoginPublicRoute) return true;
        return Response.redirect(new URL("/dashboard", nextUrl));
      }

      return true;
    },
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;
