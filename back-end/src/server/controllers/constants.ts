import { Schema } from './types';

const SCHEMA__ENTITY__RESPONSE = {
  type: 'object',
  properties: {
    id: {
      type: 'number',
    },
    name: {
      type: 'string',
    },
  },
  required: ['id', 'name'],
  additionalProperties: false,
};

export const SCHEMA__ENTITY__POST: Schema = {
  body: {
    type: 'object',
    properties: {
      name: {
        type: 'string',
      },
    },
    required: ['name'],
    additionalProperties: false,
  },
  response: {
    200: SCHEMA__ENTITY__RESPONSE,
  },
};

export const SCHEMA__ENTITY__PATCH: Schema = {
  body: {
    type: 'object',
    properties: {
      name: {
        type: 'string',
      },
    },
    additionalProperties: false,
  },
  response: {
    200: SCHEMA__ENTITY__RESPONSE,
  },
};

export const SCHEMA__ENTITY__GET: Schema = {
  response: {
    200: SCHEMA__ENTITY__RESPONSE,
  },
};

export const SCHEMA__ENTITY__DELETE: Schema = {
  response: {
    200: {
      type: 'null',
    },
  },
};

export const SCHEMA__ENTITY__SEARCH: Schema = {
  querystring: {
    type: 'object',
    properties: {
      name: { type: 'string' },
    },
    additionalProperties: false,
  },
  response: {
    200: {
      type: 'array',
      items: SCHEMA__ENTITY__RESPONSE,
    },
  },
};
