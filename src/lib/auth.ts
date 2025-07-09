// src/lib/auth.ts

import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import prisma from "./prisma";
import { Role } from "@prisma/client"; // Pastikan Role di-import jika belum

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),

  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async jwt({ token, user }) {
      // Saat user login, objek 'user' dari database tersedia.
      if (user) {
        token.id = user.id;
        token.role = user.role;
        // ---> TAMBAHKAN BARIS INI <---
        token.username = user.username; // Ambil username dari DB dan masukkan ke token
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as Role;
        // ---> TAMBAHKAN BARIS INI <---
        session.user.username = token.username as string; // Ambil username dari token dan masukkan ke session
      }
      return session;
    },
  },

  pages: {
    signIn: "/sign-in",
    error: "/sign-in",
  },
};
