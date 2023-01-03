import { entityService, personService } from 'ioc';

import Server from './web/Server';

const server = new Server(entityService, personService);

server.listen({ host: '0.0.0.0', port: 8080 });
