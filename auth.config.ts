import type { NextAuthConfig } from 'next-auth';
import FacebookProvider from "next-auth/providers/facebook"
import GitHubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"

export const authConfig = {
  pages: {
    signOut: '',
    signIn: '/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');

      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        console.log(new URL('/dashboard', nextUrl))
        return Response.redirect(new URL('/dashboard', nextUrl));
      }
      return true;
    },
    // adapter: 'For DB Storage'
  },
  providers: [
    GoogleProvider({
      clientId: process.env.OAUTH_GOOGLE_ID,
      clientSecret: process.env.OAUTH_GOOGLE_SECRET
    }),
    GitHubProvider({
      clientId: process.env.OAUTH_GITHUB_ID,
      clientSecret: process.env.OAUTH_GITHUB_SECRET
    }),
    FacebookProvider({
      clientId: process.env.OAUTH_FACEBOOK_ID,
      clientSecret: process.env.OAUTH_FACEBOOK_SECRET
    }),
  ],
} satisfies NextAuthConfig;
