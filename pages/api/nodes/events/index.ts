import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../utils/db_utils/client";
import { Prisma } from "@prisma/client";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const events = await prisma.event.findMany({
      where: {
        role: "EVENT",
      },
      select: {
        name: true,
        nickName: true,
        role: true,
      },
    });
    // console.log(events);

    res.status(200).json({ data: events });
  }
  if (req.method === "POST") {
    const data = req.body;

    const nodeData: Prisma.EventCreateInput = {
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
      organizations: {
        connect: data.orgs.map((data: string) => {
          return { nickName: data };
        }),
      },
    };

    const result = await prisma?.event.create({
      data: nodeData,
    });
    res.status(200).json({ data: result });
  }

  if (req.method === "PUT") {
    const data = req.body;

    const nodeData: Prisma.EventCreateInput = {
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
      organizations: {
        connect: data.orgs.map((data: string) => {
          return { nickName: data };
        }),
      },
    };

    const result = await prisma?.event.update({
      where: {
        nickName: data.nickName,
      },
      data: nodeData,
    });
    res.status(200).json({ data: result });
  }
};

export default handler;
