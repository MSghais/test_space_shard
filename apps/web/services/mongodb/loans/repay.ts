import { PrismaClient } from "@prisma/client";
import { Deposit, Loans, User } from "db_mongo";
const prisma = new PrismaClient();

interface IRepayByLoan {
  loan?: Partial<Loans>;
  deposit: Partial<Deposit>;
  user: Partial<User>;
  amountToBorrow: number;
}
export const repayDepositLoan = async ({
  loan,
  deposit,
  user,
  amountToBorrow,
}: IRepayByLoan) => {
  try {
    let depositByUser = await prisma.deposit.findFirst({
      where: {
        AND: [
          {
            ownerId: user?.id,
          },
          {
            id: deposit?.id,
          },
        ],
      },
    });

    if (!depositByUser) {
      return {
        isOk: false,
      };
    }

    if (depositByUser?.totalDeposit < amountToBorrow) {
      return {
        isOk: false,
      };
    }
    depositByUser = await prisma.deposit.update({
      where: {
        id: depositByUser?.id,
      },
      data: {
        totalDeposit: {
          decrement: amountToBorrow,
        },
      },
    });

    let loanUpdate: Loans | undefined;

    if (loan) {
      loanUpdate = await prisma.loans.update({
        where: {
          id: loan?.id,
        },
        data: {
          totalBorrowed: {
            decrement: amountToBorrow,
          },
        },
      });
    }

    console.log("loanUpdate", loanUpdate);
    return {
      loan: loanUpdate,
      deposit: depositByUser,
      isOk: true,
    };
  } catch (e) {
    console.log("get all loans", e);
  }
};
