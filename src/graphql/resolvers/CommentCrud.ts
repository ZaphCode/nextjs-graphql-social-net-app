import { ApolloError } from "apollo-server-micro";
import { IComment, Resolver } from "../../types";

interface IArgsCC {postId: string, comment: string }
export const createComment: Resolver<null, IArgsCC> = async (
  _,
  { postId, comment },
  { verifiedUser, prisma }
) => {
  if (!verifiedUser) throw new ApolloError("User must login", "AUTH_ERROR");

  const newComment = await prisma.comment.create({
    data: {
      comment,
      userId: verifiedUser.id,
      postId,
    },
    include: {
      user: true,
      post: true,
    },
  });

  console.log(newComment);

  return newComment;
};

export const deleteComment: Resolver<null, {id: string}> = async (
    _,
    { id },
    { verifiedUser, prisma }
  ) => {
    if (!verifiedUser) throw new ApolloError("User not logged in", "AUTH_ERROR");
  
    const commentFound = await prisma.comment.findUnique({
      where: { id },
      include: { user: true },
    });
  
    if (!commentFound) throw new ApolloError("No comment found", "DELETE_ERROR");
  
    if (commentFound.user.id === verifiedUser.id || verifiedUser.role === "ADMIN")
      return await prisma.comment.delete({ where: { id } });
    else 
      throw new ApolloError("Unauthorized", "AUTH_ERROR");
};


//* CommentType Resolvers (Relations)
export const userRelation: Resolver<IComment, {}> = async (parent, _, { prisma }) => {
  const comment = await prisma.comment.findUnique({
    where: { id: parent.id },
    include: {
      user: true,
    },
  });

  return comment?.user;
};
