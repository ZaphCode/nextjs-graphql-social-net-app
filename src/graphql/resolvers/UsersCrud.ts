import { User } from "@prisma/client";
import { ApolloError } from "apollo-server-micro";
import { Resolver } from "../../types";

export const users: Resolver<null, {}> = async (_, __, { prisma }) => {
  return await prisma.user.findMany();
};

export const user: Resolver<null, { id: string }> = async (
  _,
  { id },
  { prisma }
) => {
  const user = await prisma.user.findUnique({ where: { id } });
  if (!user) throw new ApolloError("No user Found", "SEARCH_ERROR");
  return user;
};

//* UserType Resolvers (Relations)

export const postsRelation: Resolver<User, {}> = async (
  parent,
  __,
  { prisma }
) => {
  const user = await prisma.user.findUnique({
    where: { id: parent.id },
    include: { posts: true },
  });
  return user?.posts;
};

export const postCount: Resolver<User, {}> = async (
  parent,
  __,
  { prisma }
) => {
  const user = await prisma.user.findUnique({
    where: { id: parent.id },
    include: { posts: true },
  });
  return user?.posts.length;
};

export const followersRelation: Resolver<User, {}> = async (
  parent,
  __,
  { prisma }
) => {
  const follows = await prisma.follow.findMany({
    where: { followedId: parent.id },
  });

  let followers: User[] = [];

  for (let index = 0; index < follows.length; index++) {
    let follow = follows[index];
    let follower = await prisma.user.findUnique({where: {id: follow.followerId}})
    followers.push(follower as User)
  }

  return followers;
};

export const followingsRelation: Resolver<User, {}> = async (
  parent,
  __,
  { prisma }
) => {
  const follows = await prisma.follow.findMany({
    where: { followerId: parent.id },
  });
  
  let followings: User[] = [];

  for (let i = 0; i < follows.length; i++) {
    let following = await prisma.user.findUnique({where: {id: follows[i].followedId}})
    followings.push(following as User)
  }

  return followings;
};

export const followersCount: Resolver<User, {}> = async (
  parent,
  __,
  { prisma }
) => {
  const follows = await prisma.follow.findMany({
    where: { followedId: parent.id },
  });

  return follows.length;
};

export const followingsCount: Resolver<User, {}> = async (
  parent,
  __,
  { prisma }
) => {
  const follows = await prisma.follow.findMany({
    where: { followerId: parent.id },
  });

  return follows.length;
};