import fastify from 'fastify';

import db from '@db';
import { Entity } from '@db/models/Entity';

const server = fastify();

server.get('/ping', async (request, reply) => {
  try {
    await db.authenticate();

    const entity = new Entity({
      name: 'test',
    });

    await entity.save();

    const entities = await Entity.findAll();

    return `Connection has been established successfully. ${entities
      .map(({ name }) => name)
      .join(', ')}`;
  } catch (error) {
    return `Unable to connect to the database: ${error}}`;
  }
});

export default server;
