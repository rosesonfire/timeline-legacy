import fastify from 'fastify';
import { Record } from 'immutable';

import EntityService from 'services/EntityService';

class Server {
  private readonly _entityService: EntityService;

  constructor(entityService: EntityService) {
    this._entityService = entityService;
  }

  createNewServer() {
    const server = fastify();

    server.get('/ping', async (request, reply) => {
      await this._entityService.create(Record({ name: 'test' })());

      const entities = await this._entityService.filter(Record({ name: 'test' })());

      return entities.toJSON();
    });

    return server;
  }
}

export default Server;
