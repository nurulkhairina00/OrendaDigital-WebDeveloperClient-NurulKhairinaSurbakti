import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";
import { compare } from "bcryptjs";

export const authOptions = {
  session: {
    jwt: true,
    maxAge: 12 * 60 * 60,
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        const user_data = await axios({
          method: "POST",
          url: `${process.env.API_PATH}:${process.env.API_PORT}/api/login`,
          data: {
            email: credentials.email,
          },
        });

        if (!user_data) {
          throw new Error("Email not registered");
        }

        const user = user_data.data;
        // const isValid = await compare(credentials.password, user.user_password);
        // if (!isValid) {
        //   throw new Error("Password does not match");
        // }

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          token: user.token,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const { accessToken, ...rest } = user;
        token.accessToken = accessToken;
        token.user = rest;
      }

      return token;
    },

    async session({ session, token }) {
      session.user = {
        ...session.user,
        ...token.user,
      };
      session.accessToken = token.accessToken;

      return session;
    },
  },
};

export default NextAuth(authOptions);
