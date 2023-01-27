import { FastifyInstance, FastifyRequest } from 'fastify';

abstract class Controller {
  abstract registerRoutes(server: FastifyInstance): void;

  protected extractPaginationFromQueryParams = (request: FastifyRequest) => {
    const { offset, pageSize, ...rest } = request.query as {
      offset?: number;
      pageSize?: number;
    };

    return {
      pagination: { offset, pageSize },
      rest,
    };
  };
}

export default Controller;
