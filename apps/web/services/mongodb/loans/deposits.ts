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
      },
      select:{
        id:true,
        totalDeposit:true,
        loanDeposit:{
          select:{
            interestPercentage:true,
            id:true,
          }
        }
      }
    })
    return depositsByUser;
  } catch (e) {
    console.log("get all loans", e);
  }
};

export const getDepositById = async (id: string) => {
  try {
    const loanById = await prisma.deposit.findUnique({
      where: {
        id: id,
      },
       select:{
        id:true,
        totalDeposit:true,
        loanDeposit:{
          select:{
            interestPercentage:true,
            id:true,
          }
        }
      }
    });
    console.log("loanById", loanById);
    return loanById;
  } catch (e) {
    console.log("error loanById", e);
  }
};