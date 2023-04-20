import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../utils/db_utils/client";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const events = await prisma.event.findMany();

    res.status(200).json({ data: events });
  }
};

export default handler;
