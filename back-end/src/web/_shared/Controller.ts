import { FastifyInstance } from 'fastify';

abstract class Controller {
  abstract registerRoutes(server: FastifyInstance): void;
}

export default Controller;
