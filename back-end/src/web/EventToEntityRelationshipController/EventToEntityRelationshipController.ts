import { Record } from 'immutable';
import { FastifyInstance } from 'fastify';

import EventToEntityRelationshipService from 'services/EventToEntityRelationshipService';
import Controller from 'web/_shared/Controller';

import { SCHEMA__EVENT_TO_ENTITY_RELATIONSHIP__POST, SCHEMA__ENTITY__DELETE } from './constants';

class EventToEntityRelationshipController extends Controller {
  private readonly _eventToEntityRelationshipService: EventToEntityRelationshipService;

  constructor(eventToEntityRelationshipService: EventToEntityRelationshipService) {
    super();
    this._eventToEntityRelationshipService = eventToEntityRelationshipService;
  }

  registerRoutes(server: FastifyInstance) {
    server.post('/', { schema: SCHEMA__EVENT_TO_ENTITY_RELATIONSHIP__POST }, (request) =>
      //@ts-ignore
      this._eventToEntityRelationshipService.create(Record(request.body)()),
    );

    server.delete('', { schema: SCHEMA__ENTITY__DELETE }, (request, reply) =>
      this._eventToEntityRelationshipService.deleteAll(),
    );
  }
}

export default EventToEntityRelationshipController;
