import { NextApiHandler } from "next";
import { getAllLoans } from "../../../services/mongodb/loans";
import { getAllAssets } from "../../../services/mongodb/loans/assets";

const getAllDatasHandler: NextApiHandler = async (req, res) => {
  try {

    const loans = await getAllLoans()
    console.log("loans handler",loans)
    const assets = await getAllAssets()

    return res.json({
      data: {
        loans:loans,
        assets:assets
      },
      status: 200,
      message: "Datas exists.",
    });
  } catch (error) {
    console.error("Error during Get datas:", error);
    return res.status(500).json({
      status: 500,
    });
  }
};

export default getAllDatasHandler;
