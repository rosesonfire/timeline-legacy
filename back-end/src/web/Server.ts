import fastify, { FastifyInstance } from 'fastify';

import EntityService from 'services/EntityService';
import PersonService from 'services/PersonService';
import EventService from 'services/EventService';
import EntityToEntityRelationshipService from 'services/EntityToEntityRelationshipService';
import EventToEntityRelationshipService from 'services/EventToEntityRelationshipService';

import { IController } from './_shared/Controller';
import EntityController from './EntityController';
import PersonController from './PersonController';
import EventController from './EventController';
import EntityToEntityRelationshipController from './EntityToEntityRelationshipController';
import EventToEntityRelationshipController from './EventToEntityRelationshipController';

class Server {
  private __server: FastifyInstance;

  constructor(
    entityService: EntityService,
    personService: PersonService,
    eventService: EventService,
    entityToEntityRelationshipService: EntityToEntityRelationshipService,
    eventToEntityRelationshipService: EventToEntityRelationshipService,
  ) {
    this.__server = fastify();

    this.setMiddlewares();

    const controllers: [string, IController][] = [
      ['/entity', new EntityController(entityService)],
      ['/person', new PersonController(personService)],
      ['/event', new EventController(eventService)],
      [
        '/entityToEntityRelationship',
        new EntityToEntityRelationshipController(entityToEntityRelationshipService),
      ],
      [
        '/eventToEntityRelationship',
        new EventToEntityRelationshipController(eventToEntityRelationshipService),
      ],
    ];

    controllers.forEach(([path, controller]) => {
      this.__registerRoutes(path, controller);
    });
  }

  setMiddlewares() {
    this.__server.addHook<{ toJS?: Function }>(
      'preSerialization',
      (request, reply, payload, done) => {
        done(null, payload?.toJS?.());
      },
    );

    this.__server.setErrorHandler((error, request, reply) => {
      if (error) {
        console.error(error);
      }
    });
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

  private __registerRoutes(path: string, controller: IController) {
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
