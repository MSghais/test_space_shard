// import { PrismaClient } from "@prisma/client";
import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined; // This must be a `var` and not a `let / const`
}

// let prisma: PrismaClient;
export const prisma =
  global.prisma ||
  new PrismaClient({
    log: ["query"],
  });
export const client = global.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") global.prisma = prisma;

export * from "@prisma/client";

