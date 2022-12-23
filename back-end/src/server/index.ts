import fastify from 'fastify';

import db from '../db';

const server = fastify();

server.get('/ping', async (request, reply) => {
  try {
    await db.authenticate();

    return 'Connection has been established successfully.';
  } catch (error) {
    return 'Unable to connect to the database:';
  }
});

export default server;
