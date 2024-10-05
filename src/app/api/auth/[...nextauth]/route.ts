import NextAuth, { User } from "next-auth";
import { AdapterUser } from "next-auth/adapters";
import CredentialsProvider from "next-auth/providers/credentials";
import { JWT } from "next-auth/jwt";
import { Session } from "next-auth";
import { NextAuthOptions } from "next-auth";

// Definir las credenciales
interface Credentials {
  email: string;
  password: string;
}

interface UserAuthenticate extends User {
  access_token?: string;
  refresh_token?: string; 
}

interface SessionAuthenticate extends Session {
  accessToken?: string; 
  refreshToken?: string;  
}

interface JWTAuthenticate extends JWT {
  accessToken?: string;
    refreshToken?: string;
}

const handler:NextAuthOptions = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "Email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: Credentials | undefined): Promise<UserAuthenticate | null> {
        if (!credentials) return null;

        const res: Response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/login`,
          {
            method: "POST",
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
            headers: { "Content-Type": "application/json" },
          }
        );

        if (!res.ok) {
          // Si la respuesta no es exitosa, retornar null
          return null;
        }

        const data: UserAuthenticate = await res.json();
        console.log(data)
        if (data.access_token && data.refresh_token) {
          return {
            id: data.id,
            name: data.name,
            email: data.email,
            access_token: data.access_token,
            refresh_token: data.refresh_token
          };
        } else {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: { token: JWTAuthenticate, user: UserAuthenticate | AdapterUser}) {
      // Asegurarse de que user es de tipo IAuthUser
      if (user) {
        token.accessToken = (user as UserAuthenticate).access_token;
        token.refreshToken = (user as UserAuthenticate).refresh_token; 
      }
      return token;
    },
    async session({ session, token }:{session: SessionAuthenticate, token: JWT}) {
      session.accessToken = token.accessToken as string;  
      session.refreshToken = token.refreshToken as string;  
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
});

export { handler as GET, handler as POST };
