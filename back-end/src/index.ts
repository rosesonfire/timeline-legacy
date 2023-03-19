import {
  entityService,
  personService,
  eventService,
  entityToEntityRelationshipService,
  eventToEntityRelationshipService,
} from 'ioc';

import Server from './web/Server';

const server = new Server(
  entityService,
  personService,
  eventService,
  entityToEntityRelationshipService,
  eventToEntityRelationshipService,
);

server.listen({ host: '0.0.0.0', port: 8080 });
