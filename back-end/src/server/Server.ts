import fastify, { FastifyInstance } from 'fastify';
import Controller from 'server/controllers/Controller';

import EntityService from 'services/EntityService';

import EntityController from './controllers/EntityController';

class Server {
  private _server: FastifyInstance;

  constructor(entityService: EntityService) {
    this._server = fastify();

    this.setMiddlewares();

    const entityController = new EntityController(entityService);

    this._registerRoutes('/entity', entityController);
  }

  setMiddlewares() {
    this._server.addHook<{ toJSON?: Function }>(
      'preSerialization',
      (request, reply, payload, done) => {
        done(null, payload?.toJSON?.());
      },
    );
  }

  listen({ host, port }: { host: string; port: number }) {
    this._server.listen({ host, port }, (err, address) => {
      if (err) {
        console.error(err);

        process.exit(1);
      }

      console.log(`Server listening at ${address}`);
    });
  }

  private _registerRoutes(path: string, controller: Controller) {
    this._server.register(
      (instance, opts, done) => {
        controller.registerRoutes(instance);

        done();
      },
      { prefix: path },
    );
  }
}

export default Server;
