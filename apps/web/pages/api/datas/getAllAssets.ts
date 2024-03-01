import { NextApiHandler } from "next";
import { getAllLoans } from "../../../services/mongodb/loans";

const getAllAssetsHandler: NextApiHandler = async (req, res) => {
  try {

    const loans = await getAllLoans()

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

export default getAllAssetsHandler;
