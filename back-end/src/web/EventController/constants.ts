import {
  ENDED_AT_SCHEMA,
  ID,
  ID_SCHEMA,
  NAME,
  NAME_SCHEMA,
  NULL_SCHEMA,
  PAGINATION_SCHEMA,
  STARTED_AT,
  STARTED_AT_SCHEMA,
} from 'web/_shared/constants';

import { Schema } from 'web/_shared/types';

const SCHEMA__EVENT__RESPONSE = {
  type: 'object',
  properties: {
    ...ID_SCHEMA,
    ...NAME_SCHEMA,
    ...STARTED_AT_SCHEMA,
    ...ENDED_AT_SCHEMA,
  },
  required: [ID, NAME, STARTED_AT],
  additionalProperties: false,
};

export const SCHEMA__EVENT__POST: Schema = {
  body: {
    type: 'object',
    properties: {
      ...NAME_SCHEMA,
      ...STARTED_AT_SCHEMA,
      ...ENDED_AT_SCHEMA,
    },
    required: [NAME, STARTED_AT],
    additionalProperties: false,
  },
  response: {
    200: SCHEMA__EVENT__RESPONSE,
  },
};

export const SCHEMA__EVENT__PATCH: Schema = {
  body: {
    type: 'object',
    properties: NAME_SCHEMA,
    additionalProperties: false,
  },
  response: {
    200: SCHEMA__EVENT__RESPONSE,
  },
};

export const SCHEMA__EVENT__GET: Schema = {
  response: {
    200: SCHEMA__EVENT__RESPONSE,
  },
};

export const SCHEMA__EVENT__DELETE: Schema = {
  response: {
    200: NULL_SCHEMA,
  },
};

export const SCHEMA__EVENT__SEARCH: Schema = {
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
      items: SCHEMA__EVENT__RESPONSE,
    },
  },
};
