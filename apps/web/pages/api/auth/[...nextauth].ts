import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import DiscordProvider from "next-auth/providers/discord";
import CredentialsProvider from "next-auth/providers/credentials";
import { signOauthGoogle } from "../../../services/mongodb/oauth/google";
import { signOauthDiscord } from "../../../services/mongodb/oauth/discord";
import { NextApiRequest, NextApiResponse } from "next";
import { signInEthereum } from "../../../services/mongodb/oauth/ethereum";
import { signInCredentials } from "../../../services/mongodb/oauth/credentials";

const CALLBACKS = {

  async jwt({ token, account }) {
    console.log("token",token) 
    console.log("account",account) 
    // Persist the OAuth access_token and or the user id to the token right after signin
    if (account && account?.provider == "crypto") {
      token.accessToken = account?.access_token
    }

    if (account && account?.provider == "credentials") {
      token.accessToken = account?.access_token
    }
   
    return token
  },
  // TODO verify session with sign
  async session({ session, token, user }: { session: any; token: any, user:any }) {
    console.log("session",session) 
    console.log("user",user) 
    console.log("token",token) 

    // TODO check session ethereum

    if(!token?.name) {
      session.address = token.sub;
      session.user.email = token.sub; // TODO check if ok
      session.user.name = token.sub;
      session.user.image = "/WUW_pepe_banner.png";
    }

    if(!session?.email) {
      session.address = token.sub;
      session.user.email = token.sub; // TODO check if ok
      session.user.name = token.sub;

    }

    return session;
  },
  async signIn({ user, account, profile, credentials }) {
    console.log("user", user);
    console.log("account", account);
    console.log("profile", profile);
    console.log("credentials", credentials);
    let profil: any = profile;
    let result: boolean;
    if (account.provider == "google") {
      result = await signOauthGoogle(user, profile, account);
    }
    else if (account.provider == "discord") {
      result = await signOauthDiscord(user, profile, account);
    } else if (account.provider == "crypto") {
      return signInEthereum(user, profile, account);
    } else if (account.provider == "credentials") {
      return signInCredentials(user, profile, account, credentials);
    }
 
    return result;
  },
};

export const PROVIDERS_OAUTH = [
  DiscordProvider({
    clientId: process.env.DISCORD_CLIENT_ID,
    clientSecret: process.env.DISCORD_CLIENT_SECRET,
  }),
  GoogleProvider({
    clientId: process.env.GOOGLE_CLIENT_ID ?? "",
    clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
  }),
  CredentialsProvider({
    // id: "credentials",
    name: "Credentials",
    credentials: {
      email: { label: "Email", type: "text" },
      username: { label: "Username", type: "text" },
      password: { label: "Password", type: "password" },
   
    },
    async authorize(credentials, req) {
      try {
        console.log('authorize')
        console.log("auth credentials",credentials)
        return {
          id:credentials?.email
        };
      } catch (e) {
        return null;
      }
    },
  }),

];
export default async function auth(req: NextApiRequest, res: NextApiResponse) {

  const isDefaultSigninPage =
    req.method === "GET" && req.query.nextauth.includes("signin");

  // Hide Sign-In with Ethereum from default sign page
  if (isDefaultSigninPage) {
    PROVIDERS_OAUTH.pop();
  }

  return await NextAuth(req, res, {
    // https://next-auth.js.org/configuration/providers/oauth
    providers: PROVIDERS_OAUTH,
    session: {
      strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: CALLBACKS,
  });
}

export const authOptions: NextAuthOptions = {
  providers: PROVIDERS_OAUTH,
  callbacks:CALLBACKS,
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV == "production" ? false : true,
  session: {
    strategy: "jwt",
  },
};

