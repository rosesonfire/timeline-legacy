import { ID, ID_SCHEMA, NAME, NAME_SCHEMA, NULL_SCHEMA } from 'web/_shared/constants';

import { Schema } from 'web/_shared/types';

export const GENDER = 'gender';

export const GENDER_SCHEMA = {
  [GENDER]: {
    type: 'string',
    enum: ['male', 'female'],
  },
};

export const NAME_AND_GENDER_SCHEMA = {
  ...NAME_SCHEMA,
  ...GENDER_SCHEMA,
};

const SCHEMA__PERSON__RESPONSE = {
  type: 'object',
  properties: {
    ...ID_SCHEMA,
    ...NAME_AND_GENDER_SCHEMA,
  },
  required: [ID, NAME, GENDER],
  additionalProperties: false,
};

export const SCHEMA__PERSON__POST: Schema = {
  body: {
    type: 'object',
    properties: NAME_AND_GENDER_SCHEMA,
    required: [NAME, GENDER],
    additionalProperties: false,
  },
  response: {
    200: SCHEMA__PERSON__RESPONSE,
  },
};

export const SCHEMA__PERSON__PATCH: Schema = {
  body: {
    type: 'object',
    properties: NAME_AND_GENDER_SCHEMA,
    additionalProperties: false,
  },
  response: {
    200: SCHEMA__PERSON__RESPONSE,
  },
};

export const SCHEMA__PERSON__GET: Schema = {
  response: {
    200: SCHEMA__PERSON__RESPONSE,
  },
};

export const SCHEMA__PERSON__DELETE: Schema = {
  response: {
    200: NULL_SCHEMA,
  },
};

export const SCHEMA__PERSON__SEARCH: Schema = {
  querystring: {
    type: 'object',
    properties: NAME_AND_GENDER_SCHEMA,
    additionalProperties: false,
  },
  response: {
    200: {
      type: 'array',
      items: SCHEMA__PERSON__RESPONSE,
    },
  },
};
