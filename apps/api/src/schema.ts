import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  enum Role { ADMIN EDITOR VIEWER }
  enum Status { TODO IN_PROGRESS DONE BLOCKED }
  enum Priority { LOW MEDIUM HIGH URGENT }

  type User {
    id: ID!
    email: String!
    name: String
    role: Role!
  }

  type BoardMember {
    id: ID!
    role: Role!
    user: User!
  }

  type Board {
    id: ID!
    name: String!
    description: String
    members: [BoardMember!]!
  }

  type Task {
    id: ID!
    title: String!
    description: String
    status: Status!
    priority: Priority!
    dueDate: String
    parentId: ID
    boardId: ID!
  }

  type Query {
    ping: String!
    boards: [Board!]!
    tasks(boardId: ID!): [Task!]!
  }

  type Mutation {
    createBoard(name: String!, description: String): Board!
    createTask(boardId: ID!, title: String!, description: String): Task!
    setTaskStatus(taskId: ID!, status: Status!): Task!
  }
`;