import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

export interface IUser {
  id: string
  username: string
  email: string
  verified: boolean
  role: 'USER' | 'MODERATOR' | 'ADMIN'
  active: boolean
  profileImg: string
  createdAt: string
  updatedAt: string
}

export interface IPost {
  id: string
  message: string
  profileImg?:string
  createdAt: string
  updatedAt: string
}

export interface IComment {
  id: string
  comment: string
  userId:string
  postId: string
  createdAt: string
  updatedAt: string
}

export type user = IUser | null

export interface ICtx {
  req: NextApiRequest;
  res: NextApiResponse;
  verifiedUser: {
    id: string;
    email: string;
    username: string;
    role: string;
  } | null;
  prisma: PrismaClient
}

export type Resolver<TParent, TArgs> = (parent: TParent, args: TArgs, ctx: ICtx, info : any) => any
