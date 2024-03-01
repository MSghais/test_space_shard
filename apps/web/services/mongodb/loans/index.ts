import { PrismaClient } from "@prisma/client";
import { CreateLoan } from "../../../types";
import {User} from "db_mongo"
const prisma = new PrismaClient();
interface ICreateLoan {
  loan: CreateLoan;
  user?:User
}

// TODO refacto sanitize
export const createLoan = async ({ loan, user }) => {
  try {
    const loans = await prisma.loans.create({
      data: {
        ...loan,
        owner:user?.id,
        // ownerPro
      },
    });
    console.log("loans",loans)
    console.log("loans", loans);

    return loans;
  } catch (e) {
    console.log("get all loans", e);
  }
};

export const getAllLoans = async () => {
  try {
    const loans = await prisma.loans.findMany({
      select:{
        id:true,
        totalBorrowed:true,
        totalSupply:true,
        limitDeposit:true,
        interestPercentage:true,
        name:true,
        collateralRatio:true,
        createdAt:true,
        assetCollateral:{
          select:{
            address:true,
            name:true,
            loansCollateral:true,
            priceInDollar:true
          }
        },
        assetFund: {
          select: {
            address: true,
            name: true,
            loansCollateral: true,
            priceInDollar: true,
          },
        },
      },
    });
    console.log("loans", loans);

    return loans;
  } catch (e) {
    console.log("get all loans", e);
  }
};

export const getLoanById = async (id: string) => {
  try {
    const loanById = await prisma.loans.findUnique({
      where: {
        id: id,
      },
      select:{
        id:true,
        limitDeposit:true,
        interestPercentage:true,
        name:true,
        collateralRatio:true,
        totalBorrowed:true,
        createdAt:true,
        assetCollateral:{
          select:{
            address:true,
            name:true,
            loansCollateral:true,
            priceInDollar:true
          }
        },
        assetFund: {
          select: {
            address: true,
            name: true,
            loansCollateral: true,
            priceInDollar: true,
          },
        },
      },
    });
    console.log("loanById", loanById);
    return loanById;
  } catch (e) {
    console.log("error loanById", e);
  }
};

export const getAllLoansSimple = async () => {
  try {
    const loans = await prisma.loans.findMany();
    console.log("loans", loans);

    return loans;
  } catch (e) {
    console.log("get all loans", e);
  }
};
