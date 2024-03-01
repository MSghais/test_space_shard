import { Account, Profile, User } from "next-auth";
import { PrismaClient, User as UserDB } from "@prisma/client";
import { ethers } from "ethers";
import { encrypt } from "../../../lib/encrypt";
import { AdapterUser } from "next-auth/adapters";

const prisma = new PrismaClient();

export const signOauthGoogle = async (
  user: User | AdapterUser,
  profile: Profile,
  account: Account,
  referal_link?: string,
) => {
  try {
    const { email, name } = profile;
    console.log("email", email);

    let googleUser = {
      name: name,
      email: email,
      wallet: undefined,
      wallets: [],
      providerAccountId: account.providerAccountId,
    };
    console.log("googleUser", googleUser);

    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          {
            email: googleUser?.email,

          }
        ]
      },
    });

    console.log("existingUser", existingUser);

    if (existingUser) {
      return true
    } else {

      const wallet = ethers.Wallet.createRandom();

      let encryptedPk = encrypt(wallet.privateKey);
      let encryptedMnemonic = encrypt(wallet.mnemonic.phrase);

      let walletData = {
        privateKey: encryptedPk,
        publicKey: wallet.address,
        mnemonic: encryptedMnemonic,
        user: existingUser,
        userId: user.id,
        address: wallet?.address,
      };

      let userDb = await prisma.user.create({
        data: {
          name: googleUser?.name,
          email: googleUser.email,
          providerId: account.providerAccountId,
          providerType: account?.provider,
        },
      });

      return true


    }
  } catch (e) {
    console.log("error oauth google", e);
  }
};
