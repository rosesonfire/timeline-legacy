import { Record } from 'immutable';
import { FastifyInstance } from 'fastify';

import EntityService from 'services/EntityService';
import Controller from 'web/_shared/Controller';

import {
  SCHEMA__ENTITY__SEARCH,
  SCHEMA__ENTITY__POST,
  SCHEMA__ENTITY__GET,
  SCHEMA__ENTITY__DELETE,
  SCHEMA__ENTITY__PATCH,
} from './constants';

class EntityController extends Controller {
  private readonly _entityService: EntityService;

  constructor(entityService: EntityService) {
    super();
    this._entityService = entityService;
  }

  registerRoutes(server: FastifyInstance) {
    server.post(
      '/',
      { schema: SCHEMA__ENTITY__POST },
      //@ts-ignore
      (request) => this._entityService.create(Record(request.body)()),
    );

    server.get('/', { schema: SCHEMA__ENTITY__SEARCH }, (request) => {
      const { pagination, rest } = this.extractPaginationFromQueryParams(request);

      //@ts-ignore
      return this._entityService.filter(Record(rest)(), Record(pagination)());
    });

    server.get('/:id', { schema: SCHEMA__ENTITY__GET }, async (request, reply) => {
      //@ts-ignore
      const entity = await this._entityService.find(request.params.id);

      if (entity) {
        return entity;
      }

      reply.code(404);
    });

    server.patch('/:id', { schema: SCHEMA__ENTITY__PATCH }, async (request, reply) => {
      //@ts-ignore
      const entity = await this._entityService.update(request.params.id, Record(request.body)());

      if (entity) {
        return entity;
      }

      reply.code(404);
    });

    server.delete('', { schema: SCHEMA__ENTITY__DELETE }, (request, reply) =>
      this._entityService.deleteAll(),
    );

    server.delete('/:id', { schema: SCHEMA__ENTITY__DELETE }, async (request, reply) => {
      //@ts-ignore
      const entity = await this._entityService.delete(request.params.id);

      if (entity) {
        return;
      }

      reply.code(404);
    });
  }
}

export default EntityController;
