import { RequestInternal } from "next-auth";
import {
  PrismaClient,
  User ,

} from "@prisma/client";
import { ethers } from "ethers";
const prisma = new PrismaClient();

export async function authorizeCrypto(
    credentials: Record<"publicAddress" | "signedNonce", string> | undefined,
    req: Pick<RequestInternal, "body" | "headers" | "method" | "query">
) {
    if (!credentials) return null;

}