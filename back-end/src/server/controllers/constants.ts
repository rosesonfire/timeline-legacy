import { Schema } from './types';

export const SCHEMA__ENTITY__POST__BODY: Schema = {
  body: {
    type: 'object',
    properties: {
      name: { type: 'string' },
    },
    required: ['name'],
    additionalProperties: false,
  },
};

export const SCHEMA__ENTITY__GET__QS: Schema = {
  querystring: {
    type: 'object',
    properties: {
      name: { type: 'string' },
    },
    additionalProperties: false,
  },
};
