import { RouteShorthandOptions } from 'fastify';

export type Schema = Exclude<RouteShorthandOptions['schema'], undefined>;
