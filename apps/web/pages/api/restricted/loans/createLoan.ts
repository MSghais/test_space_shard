import { NextApiHandler } from "next";
import { createLoan, getAllLoans } from "../../../../services/mongodb/loans";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]";
import { checkUserExistsByEmail } from "../../../../services/mongodb";
import { ERROR_MESSAGES } from "../../../../constants/error";

const createLoansHandler: NextApiHandler = async (req, res) => {
  try {
    const { amountToDeposit, assetId, interestPercentage, loan } = req.body;

    if (!amountToDeposit) {
      return res.status(500).json({
        message: ERROR_MESSAGES.NO_AMOUNT_TO_BORROW,
      });
    }

    if (typeof amountToDeposit != "undefined") {
      return res.status(500).json({
        message: ERROR_MESSAGES.NO_AMOUNT_TO_BORROW,
      });
    }

    const sessionServer = await getServerSession(req, res, authOptions);
    console.log("sessionServer", sessionServer);

    if (!sessionServer?.user) {
      return res.status(500).json({
        message: "No session cannot be fetch",
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

    const loans = await createLoan({ loan: loan });

    return res.json({
      data: loans,
      status: 200,
      message: "Loans exists.",
    });
  } catch (error) {
    console.error("Error during Get loans:", error);
    return res.status(500).json({
      status: 500,
    });
  }
};

export default createLoansHandler;
