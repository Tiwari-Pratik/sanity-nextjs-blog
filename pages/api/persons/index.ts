import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../utils/db_utils/client";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const persons = await prisma?.person.findMany();

    res.status(200).json({ data: persons });
  }

  if (req.method === "POST") {
    const data = req.body;

    const result = await prisma?.person.create({
      data: {
        name: data.name,
        postSlug: data.postSlug,
        nickName: data.nickName,
        peopleFollowedByUser: {
          connect: data.peopleFollowedByUser.map((data: string) => {
            return { nickName: data };
          }),
        },
      },
    });
    res.status(200).json({ data: result });
  }
};

export default handler;
