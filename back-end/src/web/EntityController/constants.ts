import {
  ID,
  ID_SCHEMA,
  NAME,
  NAME_SCHEMA,
  NULL_SCHEMA,
  PAGINATION_SCHEMA,
} from 'web/_shared/constants';

import { Schema } from 'web/_shared/types';

const SCHEMA__ENTITY__RESPONSE = {
  type: 'object',
  properties: {
    ...ID_SCHEMA,
    ...NAME_SCHEMA,
  },
  required: [ID, NAME],
  additionalProperties: false,
};

export const SCHEMA__ENTITY__POST: Schema = {
  body: {
    type: 'object',
    properties: NAME_SCHEMA,
    required: [NAME],
    additionalProperties: false,
  },
  response: {
    200: SCHEMA__ENTITY__RESPONSE,
  },
};

export const SCHEMA__ENTITY__PATCH: Schema = {
  body: {
    type: 'object',
    properties: NAME_SCHEMA,
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
    200: NULL_SCHEMA,
  },
};

export const SCHEMA__ENTITY__SEARCH: Schema = {
  querystring: {
    type: 'object',
    properties: {
      ...NAME_SCHEMA,
      ...PAGINATION_SCHEMA,
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
