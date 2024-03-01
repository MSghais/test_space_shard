import { PrismaClient, Token } from "@prisma/client";

const prisma = new PrismaClient();

export const getAllAssets = async () => {

  try {

    const assets = await prisma.token.findMany({})

    return assets

  }catch(e) {
    console.log("get all assets",e)
  }
}
