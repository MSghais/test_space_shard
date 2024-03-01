import { User } from "prisma/generated/clientmg";
import { prisma } from ".";

import { Token, TokenType, Loans } from "@prisma/client";

const DEFAULT_LOANS = [
  // Add your own user to pre-populate the database with
  {
    name: "sDai",
    priceInDollar:1,
    tokenType:TokenType.STABLE_COIN,
    interestPercentage:3,
    collateralRatio:80,
    totalBorrowed:0,
    tokenLimitMint:0,
    limitDeposit:1000,
  },

] as Array<Loans>;

(async () => {
  try {

    const user = { password: "admin", email: "admin@gmail.com" }

    let userDb:User|undefined = await prisma.user.findFirst({
      where: {
        email: user?.email
      }
    })
    if (!userDb) {
      userDb = await prisma.user.create({
        data: {
          name: user?.email,
          email: user?.email,
          passwordHash: user?.password,
          providerId: user?.email,
          providerType: "credentials",

        }
      })
    }


    const sDai = await prisma.token.findFirst({
      where:{
        name:"sDai"
      }
    })
    await Promise.all(
      DEFAULT_LOANS.map(async (loan) => {
        await prisma.loans.create({
          data: {
            name: loan?.name,
            interestPercentage:loan?.interestPercentage,
            collateralRatio:loan?.collateralRatio,
            ownerProfile: {
              connect: {
                id:userDb?.id
              }
            },
            owner:userDb?.id,
            totalBorrowed:loan?.totalBorrowed,
            tokenLimitMint:loan?.tokenLimitMint,
            limitDeposit:loan?.limitDeposit,
            assetCollateral: {
              connect: {
                id:sDai?.id
              }
            },
            assetFund: {
              connect: {
                id:sDai?.id
              }
            },
          },
        });

      })
    );
  } catch (error) {
    console.error(error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
})();
