import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../utils/db_utils/client";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const node = req.query.node as string;
    const role = req.query.role as string;
    // console.log(node);
    // console.log(role);

    let nodeData;
    if (role === "PERSON") {
      nodeData = await prisma.person.findUnique({
        where: {
          nickName: node,
        },
        select: {
          name: true,
          nickName: true,
          role: true,
          postSlug: true,
          peopleFollowedByUser: {
            select: {
              name: true,
              nickName: true,
              role: true,
            },
          },
          events: {
            select: {
              name: true,
              nickName: true,
              role: true,
            },
          },
          organizations: {
            select: {
              name: true,
              nickName: true,
              role: true,
            },
          },
        },
      });
    }
    if (role === "EVENT") {
      nodeData = await prisma.event.findUnique({
        where: {
          nickName: node,
        },
        select: {
          name: true,
          nickName: true,
          role: true,
          postSlug: true,
          eventFollowedByEvent: {
            select: {
              name: true,
              nickName: true,
              role: true,
            },
          },
          persons: {
            select: {
              name: true,
              nickName: true,
              role: true,
            },
          },
          organizations: {
            select: {
              name: true,
              nickName: true,
              role: true,
            },
          },
        },
      });
    }
    if (role === "ORGANIZATION") {
      nodeData = await prisma.organization.findUnique({
        where: {
          nickName: node,
        },
        select: {
          name: true,
          nickName: true,
          role: true,
          postSlug: true,
          orgsFollowedByOrg: {
            select: {
              name: true,
              nickName: true,
              role: true,
            },
          },
          persons: {
            select: {
              name: true,
              nickName: true,
              role: true,
            },
          },
          events: {
            select: {
              name: true,
              nickName: true,
              role: true,
            },
          },
        },
      });
    }

    res.status(200).json({ data: nodeData });
  }
};

export default handler;
