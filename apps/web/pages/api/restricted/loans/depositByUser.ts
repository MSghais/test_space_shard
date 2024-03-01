import { NextApiHandler } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]";
import { checkUserExistsByEmail } from "../../../../services/mongodb";
import { ERROR_MESSAGES } from "../../../../constants/error";
import { getAllDepositsByUser } from "../../../../services/mongodb/loans/deposits";

const depositByUserHandler: NextApiHandler = async (req, res) => {
  try {

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

    const deposits = await getAllDepositsByUser({userId:checkUser?.data?.id});
    return res.json({
      data: {
        deposits
      },
      status: 200,
      message: "Deposit exists.",
    });
  } catch (error) {
    console.error("Error during Get loans:", error);
    return res.status(500).json({
      status: 500,
    });
  }
};

export default depositByUserHandler;
