import { PrismaClient } from '@prisma/client';

export type GraphQLContext = {
  prisma: PrismaClient;
  userId?: string | null;
};

const prisma = new PrismaClient();

export function createContext(): GraphQLContext {
  // TODO: extract user from headers or session
  return { prisma };
}