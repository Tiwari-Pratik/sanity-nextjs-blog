import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../utils/db_utils/client";
import { Prisma } from "@prisma/client";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const organizations = await prisma.organization.findMany({
      where: {
        role: "ORGANIZATION",
      },
      select: {
        name: true,
        nickName: true,
        role: true,
      },
    });
    // console.log(organizations);

    res.status(200).json({ data: organizations });
  }
  if (req.method === "POST") {
    const data = req.body;

    const nodeData: Prisma.OrganizationCreateInput = {
      name: data.name,
      role: data.role,
      postSlug: data.postSlug,
      nickName: data.nickName,
      persons: {
        connect: data.people.map((data: string) => {
          return { nickName: data };
        }),
      },
      events: {
        connect: data.events.map((data: string) => {
          return { nickName: data };
        }),
      },
      orgsFollowedByOrg: {
        connect: data.orgs.map((data: string) => {
          return { nickName: data };
        }),
      },
    };

    const result = await prisma?.organization.create({
      data: nodeData,
    });
    res.status(200).json({ data: result });
  }
};

export default handler;
