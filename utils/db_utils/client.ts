import { PrismaClient } from "@prisma/client";

// export const prisma = new PrismaClient({ log: ["query", "error", "info"] });

declare global {
  var prisma: PrismaClient | undefined;
}

let prisma: PrismaClient;

if (process.env.NEXT_ENV === "production") {
  prisma = new PrismaClient({ log: ["query", "error", "info"] });
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient({ log: ["query", "error", "info"] });
  }
  prisma = global.prisma;
}

export default prisma;
