import { NextApiHandler } from "next";
import {
  checkUserExistsByEmail,
} from "../../../services/mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

const getProfileBySession: NextApiHandler = async (req, res) => {
  try {
    const { address } = req.query;

    const sessionServer = await getServerSession(req, res, authOptions);
    console.log("sessionServer", sessionServer);

    if (!sessionServer?.user) {
      return res.status(500).json({
        message: "No session cannot be fetch",
      });
    }
    /** @TODO check expires at */
    let expiresDate = new Date(sessionServer?.expires)
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
    } else {
      return res.json({
        data: checkUser.data,
        status: 200,
        message: "Profile exists.",
      });
    }
  } catch (error) {
    console.error("Error during Get profile by sessioncallback:", error);
    return res.status(500).json({
      status: 500,
    });
  }
};

export default getProfileBySession;
