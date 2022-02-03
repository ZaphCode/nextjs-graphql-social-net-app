import { gql } from '@apollo/client';
import bcrypt from 'bcrypt'
import { GetServerSidePropsContext } from 'next';
import client from '../lib/apollo_client';
import { IUser } from '../types';

// Promise Handler

export async function handleProm<Type>(
  promise: Promise<Type>
): Promise<[Type | null, any]> {
  try {
    let data = await promise
    return [data, null];
  } catch (error) {
    return [null, error];
  }
}

// Hashing

export const encrypt = async (data: string) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(data, salt);
};

export const comparePass = async (receivedPassword: string, password: string) => {
  return await bcrypt.compare(receivedPassword, password);
};

export const getUser = async (ctx: GetServerSidePropsContext): Promise<IUser> => {
  const query = gql`
    query {
      authUser {
        id
        role
        active
        verified
        username
        email
        profileImg
        createdAt
        updatedAt
      }
    }
  `;
  try {
    const { data } = await client.query({ query, context: ctx.req });
    return data.authUser
  } catch (error: any) {
    return null
  }
};

export function getRandomString (lenght: number): string {
  return Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, lenght);
}