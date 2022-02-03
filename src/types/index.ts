import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

export type IUser = {
  id: string
  username: string
  email: string
  verified: boolean
  role: 'USER' | 'MODERATOR' | 'ADMIN'
  active: boolean
  profileImg: string
  createdAt: string
  updatedAt: string
} | null

export interface ICtx {
  req: NextApiRequest;
  res: NextApiResponse;
  verifiedUser: {
    id: String;
    email: String;
    username: String;
    role: String;
  } | null;
  prisma: PrismaClient
}

export type Resolver<TParent, TArgs> = (parent: TParent, args: TArgs, ctx: ICtx, info : any) => any
