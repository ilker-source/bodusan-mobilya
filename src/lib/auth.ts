import { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { db } from "./db";
import bcrypt from "bcryptjs";
export const authOptions: NextAuthOptions = {
  session: { strategy: "jwt" },
  providers: [
    CredentialsProvider({
      name: "Admin",
      credentials: {
        email: { label: "E-posta", type: "email" },
        password: { label: "Şifre", type: "password" },
      },
      async authorize(creds) {
        if (!creds?.email || !creds?.password) return null;
        const user = await db.user.findUnique({ where: { email: creds.email } });
        if (!user) return null;
        const ok = await bcrypt.compare(creds.password, user.password);
        if (!ok) return null;
        return { id: user.id, email: user.email, role: user.role };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) (token as unknown as Record<string, unknown>).role = (user as unknown as Record<string, unknown>).role;
      return token;
    },
    async session({ session, token }) {
      if (session.user) (session.user as unknown as Record<string, unknown>).role = (token as unknown as Record<string, unknown>).role;
      return session;
    },
  },
  pages: { signIn: "/admin/giris" },
};
