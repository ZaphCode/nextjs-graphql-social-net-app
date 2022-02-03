import { Resolver } from "../../types";

export const users: Resolver<null, {}> = async (_, __, { prisma }) => {
  return await prisma.user.findMany();
};

