import { NextApiRequest, NextApiResponse } from "next";
import OAuth from "oauth";

import crypto from "crypto";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]";
import { checkUserExistsByEmail } from "../../../../services/mongodb";
import { NextResponse } from "next/server";

const updateProfileHandler=   async (req: NextApiRequest, res: NextApiResponse) => {
  try {


    const {}= req.body
    const sessionServer = await getServerSession(req, res, authOptions);
    console.log("sessionServer", sessionServer);
    if (!sessionServer?.user) {
      return res.status(500).json({
        message: "No session user, please connect you",
      });
    }
    /** @TODO check expires at */
    let expiresDate = new Date(sessionServer?.expires);
    if (expiresDate.getTime() < new Date().getTime()) {
      return res.status(500).json({
        message: "Session expires. Please reconnect you.",
      });
    }

    const checkUser = await checkUserExistsByEmail(sessionServer?.user?.email);

    if (!checkUser) {
      return res.status(500).json({
        message: "Profile don't exist",
      });
    }





  } catch (error) {
    console.error(error);
    res.status(500).send("Error getting request token from Twitter.");
  }
};

export default updateProfileHandler