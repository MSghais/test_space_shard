import { Account, Profile, User } from "next-auth";
import { PrismaClient, User as UserDB } from "@prisma/client";
import { ethers } from "ethers";
import { encrypt } from "../../../lib/encrypt";
import { AdapterUser } from "next-auth/adapters";

const prisma = new PrismaClient();

export const signOauthDiscord = async (
  user: User | AdapterUser,
  profile: Profile,
  account: Account
) => {
  try {
    let profil: any = profile;

    const { email, name, image, username, id } = profil;
    console.log("email", email);

    let discordUser = {
      // ...profile?.data,
      name: name,
      email: email,
      image: image,
      username: username,
      id: id,
      // twitterId: profile.sub.toString(),
      twitterId: account?.userId?.toString(),
      wallet: undefined,
      wallets: [],
    };
    // const userTwitter = User
    console.log("discordUser", discordUser);
    //   const emailTwitter = getCurrentUser.includes.
    if (!email) {
      const wallet = ethers.Wallet.createRandom();

      let encryptedPk = encrypt(wallet.privateKey);
      let encryptedMnemonic = encrypt(wallet.mnemonic.phrase);

      let walletData = {
        privateKey: encryptedPk,
        publicKey: wallet.address,
        mnemonic: encryptedMnemonic,
        //   user: existingUser,
        userId: user.id,
        address: wallet?.address,
      };
      let userDb = await prisma.user.create({
        data: {
          name: discordUser?.name,
          email: discordUser.email,
          providerId: discordUser?.id,
          providerType: "discord",
        },
      });

      return true;
    }

    const existingUser = await prisma.user.findFirst({
      where: {
        email: discordUser.email,
      },
    });

    console.log("existingUser", existingUser);

    if (existingUser) {
      console.log("user exists, try to link others social and handle");
      return true;
    } else {

      let userDb = await prisma.user.create({
        data: {
          name: discordUser?.name,
          email: discordUser.email,
          providerId: discordUser?.id,
          providerType: "discord",
        },
      });
    }
    return true;
  } catch (e) {
    console.log("error twitter Oauth", e);
  }
};
