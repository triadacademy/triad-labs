import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Mock auth — accept any email/password combo for demo
        if (!credentials?.email || !credentials?.password) return null;

        const mockUsers: Record<string, { id: string; name: string; email: string; role: string }> = {
          "yash@triadlabs.com": { id: "u1", name: "Yash Grover", email: "yash@triadlabs.com", role: "student" },
          "admin@triadlabs.com": { id: "u2", name: "Admin User", email: "admin@triadlabs.com", role: "admin" },
          "priya@example.com": { id: "u3", name: "Priya Sharma", email: "priya@example.com", role: "instructor" },
        };

        const user = mockUsers[credentials.email as string];
        if (user && credentials.password === "password") {
          return user;
        }

        // Allow any email/password for demo
        return {
          id: `u-${Date.now()}`,
          name: (credentials.email as string).split("@")[0],
          email: credentials.email as string,
          role: "student",
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as { role?: string }).role ?? "student";
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as { role?: string }).role = token.role as string;
        (session.user as { id?: string }).id = token.id as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
});
