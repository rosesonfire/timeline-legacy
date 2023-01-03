import fastify, { FastifyInstance } from 'fastify';

import EntityService from 'services/EntityService';
import PersonService from 'services/PersonService';

import Controller from './_shared/Controller';
import EntityController from './EntityController';
import PersonController from './PersonController';

class Server {
  private __server: FastifyInstance;

  constructor(entityService: EntityService, personService: PersonService) {
    this.__server = fastify();

    this.setMiddlewares();

    const controllers: [string, Controller][] = [
      ['/entity', new EntityController(entityService)],
      ['/person', new PersonController(personService)],
    ];

    controllers.forEach(([path, controller]) => {
      this.__registerRoutes(path, controller);
    });
  }

  setMiddlewares() {
    this.__server.addHook<{ toJSON?: Function }>(
      'preSerialization',
      (request, reply, payload, done) => {
        done(null, payload?.toJSON?.());
      },
    );
  }

  listen({ host, port }: { host: string; port: number }) {
    this.__server.listen({ host, port }, (err, address) => {
      if (err) {
        console.error(err);

        process.exit(1);
      }

      console.log(`Server listening at ${address}`);
    });
  }

  private __registerRoutes(path: string, controller: Controller) {
    this.__server.register(
      (instance, opts, done) => {
        controller.registerRoutes(instance);

        done();
      },
      { prefix: path },
    );
  }
}

export default Server;
