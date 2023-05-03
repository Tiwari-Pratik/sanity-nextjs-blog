import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../utils/db_utils/client";
import { Prisma } from "@prisma/client";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const persons = await prisma.person.findMany({
      where: {
        role: "PERSON",
      },
      select: {
        name: true,
        nickName: true,
        role: true,
      },
    });
    // console.log(persons);

    res.status(200).json({ data: persons });
  }
  if (req.method === "POST") {
    const data = req.body;

    const nodeData: Prisma.PersonCreateInput = {
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

    const result = await prisma?.person.create({
      data: nodeData,
    });
    res.status(200).json({ data: result });
  }

  if (req.method === "PUT") {
    const data = req.body;

    const nodeData: Prisma.PersonUpdateInput = {
      name: data.name,
      role: data.role,
      postSlug: data.postSlug,
      nickName: data.nickName,
      persons: {
        disconnect: data.disconnectPeople.map((data: string) => {
          return { nickName: data };
        }),
        connect: data.connectPeople.map((data: string) => {
          return { nickName: data };
        }),
      },
      events: {
        disconnect: data.disconnectEvents.map((data: string) => {
          return { nickName: data };
        }),
        connect: data.connectEvents.map((data: string) => {
          return { nickName: data };
        }),
      },
      organizations: {
        disconnect: data.disconnectOrgs.map((data: string) => {
          return { nickName: data };
        }),
        connect: data.connectOrgs.map((data: string) => {
          return { nickName: data };
        }),
      },
    };

    const result = await prisma?.person.update({
      where: {
        nickName: data.nickName,
      },
      data: nodeData,
    });
    res.status(200).json({ data: result });
  }
};

export default handler;
