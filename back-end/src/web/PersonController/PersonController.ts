import { Record } from 'immutable';
import { FastifyInstance } from 'fastify';

import Person from 'domainModels/Person';
import PersonService from 'services/PersonService';
import Controller from 'web/_shared/Controller';

import {
  SCHEMA__PERSON__SEARCH,
  SCHEMA__PERSON__POST,
  SCHEMA__PERSON__GET,
  SCHEMA__PERSON__DELETE,
  SCHEMA__PERSON__PATCH,
} from './constants';

class PersonController extends Controller<Person> {
  private readonly _personService: PersonService;

  constructor(personService: PersonService) {
    super();
    this._personService = personService;
  }

  registerRoutes(server: FastifyInstance) {
    server.post(
      '/',
      { schema: SCHEMA__PERSON__POST },
      //@ts-ignore
      (request) => this._personService.create(Record(request.body)()),
    );

    server.get('/', { schema: SCHEMA__PERSON__SEARCH }, (request) => {
      const { data, ...options } = this.extractPaginationAndSortingFromQueryParams(request);

      return this._personService.filter(data, options);
    });

    server.get('/:id', { schema: SCHEMA__PERSON__GET }, async (request, reply) => {
      //@ts-ignore
      const person = await this._personService.find(request.params.id);

      if (person) {
        return person;
      }

      reply.code(404);
    });

    server.patch('/:id', { schema: SCHEMA__PERSON__PATCH }, async (request, reply) => {
      //@ts-ignore
      const person = await this._personService.update(request.params.id, Record(request.body)());

      if (person) {
        return person;
      }

      reply.code(404);
    });

    server.delete('/:id', { schema: SCHEMA__PERSON__DELETE }, async (request, reply) => {
      //@ts-ignore
      const person = await this._personService.delete(request.params.id);

      if (person) {
        return;
      }

      reply.code(404);
    });
  }
}

export default PersonController;
