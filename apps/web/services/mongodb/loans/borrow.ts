import { PrismaClient, } from "@prisma/client";
import { Deposit, Loans, User, } from "db_mongo";
const prisma = new PrismaClient();

interface IBorrowByLoan {
  loan: Partial<Loans>;
  user: Partial<User>;
  amountToBorrow: number;
}
export const borrowByLoan = async ({ loan, user, amountToBorrow }: IBorrowByLoan) => {
  try {

    console.log("loan",loan)

    // TODO check amount loan amount remain < amountToBorrow
    // Collateral ratio
    let depositByUser = await prisma.deposit.findFirst({
      where: {
        AND: [
          {
            ownerId: user?.id
          },
          // {
          //   loanId: loan?.id,
          // },
        ],
      },
    });

    if (!depositByUser) {
      depositByUser = await prisma.deposit.create({
        data: {
          totalDeposit: amountToBorrow,
          owner: user?.id,
          ownerProfile: {
            connect: {
              id: user?.id
            }
          },
          loanDeposit:{
            connect:{
              id:loan?.id,
            }
          }
        }
      })
    } else {

      depositByUser = await prisma.deposit.update({
        where: {
          id: depositByUser?.id,
        },
        data: {
          totalDeposit: {
            increment: amountToBorrow
          }
        }
      })
    }
    let loanUpdate = await prisma.loans.update({
      where: {
        id: loan.id
      },
      data: {
        totalBorrowed: {
          increment: amountToBorrow
        }
      }
    });
    console.log("loanUpdate", loanUpdate);
    return {
      loan: loanUpdate,
      deposit: depositByUser,
    };
  } catch (e) {
    console.log("get all loans", e);
  }
};
