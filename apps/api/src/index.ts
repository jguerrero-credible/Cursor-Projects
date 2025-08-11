import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { ApolloServer } from 'apollo-server-express';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { typeDefs } from './schema.js';
import { resolvers } from './resolvers.js';
import { createContext } from './context.js';

const PORT = process.env.PORT ? Number(process.env.PORT) : 4000;
const CORS_ORIGIN = process.env.CORS_ORIGIN || 'http://localhost:3000';

async function start() {
  const app = express();
  app.use(cors({ origin: CORS_ORIGIN, credentials: true }));

  const schema = makeExecutableSchema({ typeDefs, resolvers });
  const server = new ApolloServer({
    schema,
    context: createContext
  });

  await server.start();
  server.applyMiddleware({ app: app as any, path: '/graphql', cors: false });

  app.get('/health', (_req, res) => res.json({ ok: true }));

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`API listening on http://0.0.0.0:${PORT}`);
  });
}

start().catch((err) => {
  console.error('Failed to start server', err);
  process.exit(1);
});