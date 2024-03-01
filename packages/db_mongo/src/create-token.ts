import { prisma } from ".";

import { Token, TokenType } from "@prisma/client";

const DEFAULT_TOKEN = [
  // Add your own user to pre-populate the database with
  {
    name: "sDai",
    priceInDollar:1,
    tokenType:TokenType.STABLE_COIN
  },

] as Array<Token>;

(async () => {
  try {

    const user = { password: "admin", email: "admin@gmail.com" }

    let userDb = await prisma.user.findFirst({
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

    await Promise.all(
      DEFAULT_TOKEN.map(async (token) => {
        await prisma.token.create({
          data: {
            name: token?.name,
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
