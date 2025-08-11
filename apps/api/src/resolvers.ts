import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const resolvers = {
  Query: {
    ping: () => 'pong',
    boards: async () => {
      return prisma.board.findMany({
        include: { members: { include: { user: true } } }
      });
    },
    tasks: async (_: unknown, args: { boardId: string }) => {
      return prisma.task.findMany({ where: { boardId: args.boardId } });
    }
  },
  Mutation: {
    createBoard: async (
      _: unknown,
      args: { name: string; description?: string | null }
    ) => {
      return prisma.board.create({
        data: {
          name: args.name,
          description: args.description ?? null
        }
      });
    },
    createTask: async (
      _: unknown,
      args: { boardId: string; title: string; description?: string | null }
    ) => {
      return prisma.task.create({
        data: {
          boardId: args.boardId,
          title: args.title,
          description: args.description ?? null,
          status: 'TODO',
          priority: 'MEDIUM'
        }
      });
    },
    setTaskStatus: async (_: unknown, args: { taskId: string; status: string }) => {
      return prisma.task.update({
        where: { id: args.taskId },
        data: { status: args.status }
      });
    }
  },
  BoardMember: {
    user: (parent: { userId: string }) => prisma.user.findUnique({ where: { id: parent.userId } })
  }
};