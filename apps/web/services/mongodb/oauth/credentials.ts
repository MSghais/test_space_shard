import { Account, Profile, User } from "next-auth";
import { PrismaClient, User as UserDB } from "@prisma/client";
import { decrypt, encrypt } from "../../../lib/encrypt";
import { AdapterUser } from "next-auth/adapters";

const prisma = new PrismaClient();

export const signInCredentials = async (
  user: User | AdapterUser,
  profile: Profile,
  account: Account,
  credentials:any
) => {
  try {
    let profil: any = profile;
    console.log("profil", profil);
    console.log("account", account);
    console.log("user", user);
    console.log("credentials", credentials);
    const providerAccountId = account?.providerAccountId;

    const existingUser = await prisma.user.findFirst({
      where: {
  
        OR: [
          {
            email: providerAccountId,
          },
          {
            username:providerAccountId
          }
        ],
      },
    });

    if (existingUser) {
      // Compase decrypted password with credentials
      let decryptedPassword= decrypt(existingUser?.passwordHash);
      console.log("decryptedPassword",decryptedPassword)
      console.log("password",credentials?.password)
      if(decryptedPassword != credentials?.password) {
        return false;
      }
      return true;
    }
    if (!existingUser) {
      let encryptedPassword= encrypt(credentials?.password);
      let userDb = await prisma.user.create({
        data: {
          name: providerAccountId,
          email: providerAccountId,
          passwordHash:encryptedPassword,
          providerId: account.providerAccountId,
          providerType: account?.provider,
        },
      });


    }

    return true;
  } catch (e) {
    console.log("error credentials Oauth", e);
  }
};
