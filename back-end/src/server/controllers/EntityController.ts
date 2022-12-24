import { Record } from 'immutable';
import { FastifyInstance } from 'fastify';

import EntityService from 'services/EntityService';

import Controller from './Controller';
import { SCHEMA__ENTITY__GET__QS, SCHEMA__ENTITY__POST__BODY } from './constants';

class EntityController extends Controller {
  private readonly _entityService: EntityService;

  constructor(entityService: EntityService) {
    super();
    this._entityService = entityService;
  }

  registerRoutes(server: FastifyInstance) {
    server.post(
      '/',
      { schema: SCHEMA__ENTITY__POST__BODY },
      //@ts-ignore
      (request, reply) => this._entityService.create(Record(request.body)()),
    );

    server.get('/', { schema: SCHEMA__ENTITY__GET__QS }, async (request, reply) =>
      //@ts-ignore
      this._entityService.filter(Record(request.query)()),
    );
  }
}

export default EntityController;
