import jwt from "jsonwebtoken";
import { ICtx } from "../types";
import { JWT_SECRET } from "../util/config";
import { prisma } from "./prisma_client";

export default function context(ctx: any): ICtx {

  const token = ctx.req.cookies.JWT;
  if (token) {
    try {
      const decode: any = jwt.verify(token.split(" ")[1], JWT_SECRET);
      return { ...ctx, verifiedUser: decode.user, prisma };
    } catch (error) {
      console.log("---- JWT ERROR ----", error);
      return { ...ctx, verifiedUser: null, prisma };
    }
  } else {
    // console.log("no token found");
    return { ...ctx, verifiedUser: null, prisma };
  }
}
