import { Account, Profile, User } from "next-auth";
import { PrismaClient, User as UserDB } from "@prisma/client";
import { ethers } from "ethers";
import { encrypt } from "../../../lib/encrypt";
import { AdapterUser } from "next-auth/adapters";

const prisma = new PrismaClient();

export const signInEthereum = async (
  user: User | AdapterUser,
  profile: Profile,
  account: Account
) => {
  try {
    let profil: any = profile;
    console.log("profil", profil);
    console.log("account", account);
    console.log("user", user);
    const providerAccountId = account?.providerAccountId;

    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          {
            email: providerAccountId,
          },
       
        ],
      },
    });

    if (existingUser) {
      return true;
    }
    if (!existingUser) {
      let userDb = await prisma.user.create({
        data: {
          name: providerAccountId,
          email: providerAccountId,
          providerId: account.providerAccountId,
          providerType: account?.provider,
        },
      });

    
      
    }

    return true;
  } catch (e) {
    console.log("error ethereum Oauth", e);
  }
};
