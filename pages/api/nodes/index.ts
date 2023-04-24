import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../utils/db_utils/client";
import { Prisma } from "@prisma/client";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const events = await prisma.event.findMany();

    res.status(200).json({ data: events });
  }
  if (req.method === "POST") {
    const data = req.body;

    const nodeData: Prisma.PersonCreateInput = {
      name: data.name,
      role: data.role,
      postSlug: data.postSlug,
      nickName: data.nickName,
      peopleFollowedByUser: {
        connect: data.peopleFollowedByUser.map((data: string) => {
          return { nickName: data };
        }),
      },
    };

    const result = await prisma?.person.create({
      data: nodeData,
    });
    res.status(200).json({ data: result });
  }
};

export default handler;
