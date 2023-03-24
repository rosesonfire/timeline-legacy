import { Record } from 'immutable';
import { FastifyInstance } from 'fastify';

import Event from 'domainModels/Event';
import EventService from 'services/EventService';
import Controller from 'web/_shared/Controller';

import {
  SCHEMA__EVENT__SEARCH,
  SCHEMA__EVENT__POST,
  SCHEMA__EVENT__GET,
  SCHEMA__EVENT__DELETE,
  SCHEMA__EVENT__PATCH,
} from './constants';

class EventController extends Controller<Event> {
  private readonly _eventService: EventService;

  constructor(eventService: EventService) {
    super();
    this._eventService = eventService;
  }

  registerRoutes(server: FastifyInstance) {
    server.post(
      '/',
      { schema: SCHEMA__EVENT__POST },
      //@ts-ignore
      (request) => this._eventService.create(Record(request.body)()),
    );

    server.get('/', { schema: SCHEMA__EVENT__SEARCH }, (request) => {
      const { data, ...options } = this.extractPaginationAndSortingFromQueryParams(request);

      return this._eventService.filter(data, options);
    });

    server.get('/:id', { schema: SCHEMA__EVENT__GET }, async (request, reply) => {
      //@ts-ignore
      const event = await this._eventService.find(request.params.id);

      if (event) {
        return event;
      }

      reply.code(404);
    });

    server.patch('/:id', { schema: SCHEMA__EVENT__PATCH }, async (request, reply) => {
      //@ts-ignore
      const event = await this._eventService.update(request.params.id, Record(request.body)());

      if (event) {
        return event;
      }

      reply.code(404);
    });

    server.delete('', { schema: SCHEMA__EVENT__DELETE }, (request, reply) =>
      this._eventService.deleteAll(),
    );

    server.delete('/:id', { schema: SCHEMA__EVENT__DELETE }, async (request, reply) => {
      //@ts-ignore
      const event = await this._eventService.delete(request.params.id);

      if (event) {
        return;
      }

      reply.code(404);
    });
  }
}

export default EventController;
