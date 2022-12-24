import { entityService } from 'ioc';

import Server from './server/Server';

const server = new Server(entityService);

server.listen({ host: '0.0.0.0', port: 8080 });
