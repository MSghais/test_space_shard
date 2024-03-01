import { NextApiHandler } from "next";
import { getAllLoans, getLoanById } from "../../../../services/mongodb/loans";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]";
import { checkUserExistsByEmail } from "../../../../services/mongodb";
import { borrowByLoan } from "../../../../services/mongodb/loans/borrow";
import { ERROR_MESSAGES } from "../../../../constants/error";
import { repayDepositLoan } from "../../../../services/mongodb/loans/repay";
import { getDepositById } from "../../../../services/mongodb/loans/deposits";

const repayDebtHandler: NextApiHandler = async (req, res) => {
  try {
    const { loanId, amount, depositId } = req.body;

    // if (!loanId) {
    //   return res.status(500).json({
    //     message: ERROR_MESSAGES.NO_LOAN_SELECTED,
    //   });
    // }

    console.log("depositId",depositId)

    if (!depositId) {
      return res.status(500).json({
        message: ERROR_MESSAGES.NO_DEPOSIT_ID,
      });
    }


    if (!amount) {
      return res.status(500).json({
        message: ERROR_MESSAGES.NO_AMOUNT_TO_BORROW,
      });
    }

    if (typeof amount == "undefined") {
      return res.status(500).json({
        message: ERROR_MESSAGES.NO_AMOUNT_TO_BORROW,
      });
    }

    const sessionServer = await getServerSession(req, res, authOptions);
    console.log("sessionServer", sessionServer);

    if (!sessionServer?.user) {
      return res.status(500).json({
        message: ERROR_MESSAGES.NO_SESSION,
      });
    }
    /** @TODO check expires at */
    let expiresDate = new Date(sessionServer?.expires);
    if (expiresDate.getTime() < new Date().getTime()) {
      return res.status(500).json({
        message: "Session expires. Please reconnect you.",
      });
    }

    /** @TODO check expires at */
    const checkUser = await checkUserExistsByEmail(sessionServer?.user?.email);
    console.log("checkUser", checkUser);

    if (!checkUser?.exist && !checkUser?.data) {
      return res.status(500).json({
        status: 500,
        message: "Error user don't exist",
      });
    }
    let depositIdStr = depositId as string;
    console.log("depositIdStr",depositIdStr)

    const depositToUpdate = await getDepositById(depositIdStr);
    console.log("depositToUpdate",depositToUpdate)

    let id = depositToUpdate?.loanDeposit?.id as string;
    const loanToUpdate = await getLoanById(id);
    const {deposit, loan}= await repayDepositLoan({ loan: loanToUpdate, deposit:depositToUpdate, user: checkUser?.data, amountToBorrow:amount });
    return res.json({
      data: {
        loan,
        deposit
      },
      status: 200,
      message: "Repay done.",
    });
  } catch (error) {
    console.error("Error during repay loans:", error);
    return res.status(500).json({
      status: 500,
    });
  }
};

export default repayDebtHandler;
