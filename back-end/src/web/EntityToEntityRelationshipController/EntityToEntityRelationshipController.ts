import { Record } from 'immutable';
import { FastifyInstance } from 'fastify';

import EntityToEntityRelationshipService from 'services/EntityToEntityRelationshipService';
import Controller from 'web/_shared/Controller';

import { SCHEMA__ENTITY_TO_ENTITY_RELATIONSHIP__POST, SCHEMA__ENTITY__DELETE } from './constants';

class EntityToEntityRelationshipController extends Controller {
  private readonly _entityToEntityRelationshipService: EntityToEntityRelationshipService;

  constructor(entityToEntityRelationshipService: EntityToEntityRelationshipService) {
    super();
    this._entityToEntityRelationshipService = entityToEntityRelationshipService;
  }

  registerRoutes(server: FastifyInstance) {
    server.post('/', { schema: SCHEMA__ENTITY_TO_ENTITY_RELATIONSHIP__POST }, (request) => {
      // const entityToEntityRelationship: RecordOf<EntityToEntityRelationship> =
      //   Record<EntityToEntityRelationship>({
      //     id:
      //   })();

      //@ts-ignore
      return this._entityToEntityRelationshipService.create(Record(request.body)());
    });

    server.delete('', { schema: SCHEMA__ENTITY__DELETE }, (request, reply) =>
      this._entityToEntityRelationshipService.deleteAll(),
    );
  }
}

export default EntityToEntityRelationshipController;
