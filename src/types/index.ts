import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

export interface UserGql {
  id: string
  username: string
  email: string
  role: 'USER' | 'MODERATOR' | 'ADMIN'
  profileImg: string
  active: boolean
  verified: boolean
  createdAt: string
  updatedAt: string
  postCount: number
  followersCount: number
  followingsCount: number
  posts: PostGql[]
  followers: UserGql[]
  followings: UserGql[] 
}

export interface PostGql {
  id: string
  message: string
  profileImg?:string
  createdAt: string
  updatedAt: string
  author: UserGql
  comments: CommentGql[]
  commentsCount: number
  likesCount: number
}

export interface CommentGql {
  id: string
  comment: string
  createdAt: string
  updatedAt: string
  user: UserGql
  post: PostGql
}

export type authUser = UserGql | null

export interface ICtx {
  req: NextApiRequest;
  res: NextApiResponse;
  verifiedUser: {
    id: string;
    email: string;
    username: string;
    role: 'USER' | 'MODERATOR' | 'ADMIN';
  } | null;
  prisma: PrismaClient
}

export type Resolver<TParent, TArgs> = (parent: TParent, args: TArgs, ctx: ICtx, info : any) => any
