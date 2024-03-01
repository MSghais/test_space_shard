import { PrismaClient, } from "@prisma/client";
const prisma = new PrismaClient();

interface IDepositByUser {
  userId:string
}
export const getAllDepositsByUser = async ({ userId }: IDepositByUser) => {
  try {


    const depositsByUser = await prisma.deposit.findMany({
      where: {
        ownerId: userId
      }
    })
    return depositsByUser;
  } catch (e) {
    console.log("get all loans", e);
  }
};
