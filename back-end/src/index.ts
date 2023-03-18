import { entityService, personService, eventService, entityToEntityRelationshipService } from 'ioc';

import Server from './web/Server';

const server = new Server(
  entityService,
  personService,
  eventService,
  entityToEntityRelationshipService,
);

server.listen({ host: '0.0.0.0', port: 8080 });
