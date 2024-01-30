import { AuthOptions, getServerSession } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { db } from "@/db/script";

const options: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "your-cool-email",
        },
        password: {
          label: "Password:",
          type: "password",
          placeholder: "your-awesome-password",
        },
      },
      async authorize(credentials) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };

        const user = await db.user.findFirst({
          where: {
            email,
            password,
          },
        });

        if (!user) {
          return null;
        }

        return {
          id: user.id.toString(),
          email: user.email,
          name: user.username ?? null,
          password: user.password ?? null,
        };
      },
    }),
  ],
  session: {},
  callbacks: {},
};

export default options;

export const getAuthSession = () => getServerSession(options);
