import type { NextAuthOptions } from 'next-auth';
//import GitHubProvider from 'next-auth/providers/github';
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { db } from '@/lib/db';
import { compare } from 'bcrypt';

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/login',
    newUser: '/register',
  },
  providers: [
    // GitHubProvider({
    //   clientId: process.env.GITHUB_ID as string,
    //   clientSecret: process.env.GITHUB_SECRET as string,
    // }),
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: {
          label: 'Email:',
          type: 'text',
          placeholder: 'your email',
        },
        password: {
          label: 'Password:',
          type: 'password',
          placeholder: 'your password',
        },
      },
      async authorize(credentials) {
        if(!credentials?.email || !credentials?.password) {
          return null;
        }
        
        // Check if email already exist
        const existingUser = await db.user.findUnique({
          where: { email: credentials?.email }
        });
        if(!existingUser) {
          return null;
        }

        // Check password match
        const passwordMatch = await compare(credentials.password, existingUser.password);
        if(!passwordMatch) {
          return null;
        }

        return {
          id: `${existingUser.id}`,
          email: existingUser.email,
          username: existingUser.username,
          
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if(user) {
        return {
          ...token,
          username: user.username
        }
      }
      return token
    },
    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          username: token.username
        }
      }
    },
  }
}