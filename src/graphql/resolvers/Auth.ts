import { Resolver } from "../../types";
import { ApolloError } from "apollo-server-micro";
import { serialize } from "cookie";
import jwt from 'jsonwebtoken'
import { JWT_SECRET } from "../../util/config";
import { comparePass, encrypt } from "../../util/functions";


export const authUser: Resolver<null, {}> = async (_, __, {verifiedUser, prisma}) => {
  if (!verifiedUser) throw new ApolloError('No user found', 'AUTH_ERROR')
  const user = await prisma.user.findUnique({where: {
    id: verifiedUser.id as string
  }})
  return user
}

type LoginArgs = {input: {email: string, password: string}}
export const login: Resolver<null, LoginArgs> = async (_, {input}, { res, prisma }) => {
  const user = await prisma.user.findUnique({where: {
    email: input.email
  }})
  if (!user) 
    throw new ApolloError('User not found', 'AUTH_ERROR')
  if (!await comparePass(input.password, user.password))
    throw new ApolloError('Invalid Password', 'AUTH_ERROR')
  const {id, email, username} = user
  const token = jwt.sign({ user: {id, email, username} }, JWT_SECRET, {
    expiresIn: "1d",
  });
  const serialized = serialize("JWT", `Bearer ${token}`, {
    httpOnly: true,
    sameSite: "strict",
    maxAge: 60 * 60 * 24,
    path: "/",
  });
  res.setHeader('Set-Cookie', serialized)
  return "Successful login";
}

type RegArgs = {input: {email: string, password: string, username: string}}
export const register: Resolver<null, RegArgs> = async (_, {input}, { res, prisma }) => {

  const user_with_that_email = await prisma.user.findUnique({where: {
    email: input.email
  }})

  if (user_with_that_email)
    throw new ApolloError('That email already exists', 'REGISTER_ERROR')

  const user_with_that_username = await prisma.user.findUnique({where: {
    username: input.username
  }})
  
    if (user_with_that_username)
      throw new ApolloError('That username already exists', 'REGISTER_ERROR')
  
  const user = await prisma.user.create({data: {
    email: input.email,
    password: await encrypt(input.password),
    username: input.username,
  }})

  const {id, email, username} = user

  const token = jwt.sign({ user: {id, email, username} }, JWT_SECRET, {
    expiresIn: "1d",
  });
  
  const serialized = serialize("JWT", `Bearer ${token}`, {
    httpOnly: true,
    sameSite: "strict",
    maxAge: 60 * 60 * 24,
    path: "/",
  });

  res.setHeader('Set-Cookie', serialized)

  return "Successful registration";

}

export const logout: Resolver<null, {}> = (_, __, {res}) => {

  const serialized = serialize("JWT", 'a', {
    httpOnly: true,
    sameSite: "strict",
    maxAge: -1,
    path: "/",
  });

  res.setHeader('Set-Cookie', serialized)

  return 'Logout Successful'
}