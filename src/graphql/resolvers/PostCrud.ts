import { ApolloError } from "apollo-server-micro";
import { IPost, Resolver } from "../../types";

interface IArgsCP { message: string }
export const createPost: Resolver<null, IArgsCP> = async (
  _,
  { message },
  { verifiedUser, prisma }
) => {
  if (!verifiedUser) throw new ApolloError("User not logged in", "AUTH_ERROR");

  const post = await prisma.post.create({
    data: {
      message,
      authorId: verifiedUser.id,
    },
  });
  return post;
};

export const deletePost: Resolver<null, { id: string }> = async (
  _,
  { id },
  { verifiedUser, prisma }
) => {
  if (!verifiedUser) throw new ApolloError("User not logged in", "AUTH_ERROR");

  const postFound = await prisma.post.findUnique({
    where: { id },
    include: { author: true },
  });

  if (!postFound) throw new ApolloError("No post Found", "DELETE_ERROR");

  if (postFound.author.id === verifiedUser.id || verifiedUser.role === "ADMIN")
    return await prisma.post.delete({ where: { id } });
  else 
    throw new ApolloError("Unauthorized", "AUTH_ERROR");
};

//* PostType Resolvers (Relations)

export const authorRelation: Resolver<IPost, {}> = async (parent, _, { prisma }) => {
  const post = await prisma.post.findUnique({
    where: { id: parent.id },
    include: { author: true },
  });
  return post?.author;
};

export const commentsRelation: Resolver<IPost, {}> = async (parent, _, { prisma }) => {
  const post = await prisma.post.findUnique({
    where: { id: parent.id },
    include: { comments: true },
  });
  return post?.comments;
};


