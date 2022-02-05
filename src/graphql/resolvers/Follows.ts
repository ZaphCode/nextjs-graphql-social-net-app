import { ApolloError } from "apollo-server-micro";
import { Resolver } from "../../types";

interface IArgsFollow { userToFollowId: string }
export const follow: Resolver<null, IArgsFollow> = async (
  _,
  { userToFollowId },
  { verifiedUser, prisma }
) => {
  if (!verifiedUser) throw new ApolloError("User not logged in", "AUTH_ERROR");

  console.log('Follower ID:', verifiedUser.id)
  console.log('Followed ID:', userToFollowId)

  if (verifiedUser.id === userToFollowId) 
    throw new ApolloError("You can't follow yourself", "WTF_BRO_ERROR");

  if (!await prisma.user.findUnique({where: {id: userToFollowId}}))
    throw new ApolloError("User to follow not found", "FOLLOW_ERROR")

  if (
    await prisma.follow.findFirst({
      where: { followerId: verifiedUser.id, followedId: userToFollowId },
    })
  )
    throw new ApolloError("You already follow that user", "FOLLOW_ERROR");

  const follow = await prisma.follow.create({
    data: {
      followerId: verifiedUser.id,
      followedId: userToFollowId,
    },
  });

  return "Success Follow";
};

interface IArgsUnfollow { userToUnfollowId: string }
export const unfollow: Resolver<null, IArgsUnfollow> = async (
  _,
  { userToUnfollowId },
  { verifiedUser, prisma }
) => {
  if (!verifiedUser) throw new ApolloError("User not logged in", "AUTH_ERROR");

  if (!await prisma.user.findUnique({where: {id: userToUnfollowId}}))
    throw new ApolloError("User to follow not found", "FOLLOW_ERROR")

  const follow = await prisma.follow.findFirst({
    where: { followerId: verifiedUser.id, followedId: userToUnfollowId },
  });

  if (!follow)
    throw new ApolloError("You are not following that user", "FOLLOW_ERROR");

  await prisma.follow.delete({ where: { id: follow.id } });

  return "Success Unfollow";
};
