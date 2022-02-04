import { ApolloError } from "apollo-server-micro";
import { IUser, Resolver } from "../../types";

export const users: Resolver<null, {}> = async (_, __, { prisma }) => {
  return await prisma.user.findMany();
};

export const user: Resolver<null, {id: string}> = async (_, {id}, { prisma }) => {
  const user = await prisma.user.findUnique({where: {id}})
  if (!user) throw new ApolloError('No user Found', 'SEARCH_ERROR')
  return user
};

//* UserType Resolvers (Relations)

export const postRelation: Resolver<IUser, {}> = async (parent, __, { prisma }) => {
  const user =  await prisma.user.findUnique({where: {id: parent.id}, include: {posts: true}});
  return user?.posts
};

export const postCount: Resolver<IUser, {}> = async (parent, __, { prisma }) => {
  const user =  await prisma.user.findUnique({where: {id: parent.id}, include: {posts: true}});
  return user?.posts.length
};

