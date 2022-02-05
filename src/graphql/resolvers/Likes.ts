import { ApolloError } from "apollo-server-micro";
import { Resolver } from "../../types";

export const likePost: Resolver<null, { id: string }> = async (
  _,
  { id },
  { verifiedUser, prisma }
) => {
  if (!verifiedUser) throw new ApolloError("User not logged in", "AUTH_ERROR");

  if (!await prisma.post.findUnique({where: {id}}))
    throw new ApolloError("Post not found", "LIKE_ERROR")

  if (
    await prisma.like.findFirst({
      where: { userId: verifiedUser.id, postId: id },
    })
  )
    throw new ApolloError("You already liked that post", "FOLLOW_ERROR");

  const like = await prisma.like.create({
    data: {
      userId: verifiedUser.id,
      postId: id,
    },
  });

  return `Success like post ${id}`;
};

export const unlikePost: Resolver<null, { id: string }> = async (
    _,
    { id },
    { verifiedUser, prisma }
  ) => {
    if (!verifiedUser) throw new ApolloError("User not logged in", "AUTH_ERROR");
  
    if (await prisma.post.findUnique({where: {id}}))
      throw new ApolloError("Post not found", "LIKE_ERROR")
    
    const like = await prisma.like.findFirst({where: { userId: verifiedUser.id, postId: id }})
    
    if (!like) throw new ApolloError('You never liked that post', 'LIKE_ERROR')
    
    await prisma.like.delete({where: {id: like.id}})
  
    return `Success unlike post ${id}`;
};