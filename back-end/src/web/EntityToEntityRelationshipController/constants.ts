import {
  ID,
  ID_SCHEMA,
  TYPE_SCHEMA,
  NULL_SCHEMA,
  TYPE,
  RELATIONSHIP_OF_ID_SCHEMA,
  RELATIONSHIP_WITH_ID_SCHEMA,
  RELATIONSHIP_OF_ID,
  RELATIONSHIP_WITH_ID,
  NAME_SCHEMA,
  NAME,
} from 'web/_shared/constants';

import { Schema } from 'web/_shared/types';

const SCHEMA__ENTITY_TO_ENTITY_RELATIONSHIP__RESPONSE = {
  type: 'object',
  properties: {
    ...ID_SCHEMA,
    ...TYPE_SCHEMA,
  },
  required: [ID, TYPE],
  additionalProperties: false,
};

export const SCHEMA__ENTITY_TO_ENTITY_RELATIONSHIP__POST: Schema = {
  body: {
    type: 'object',
    properties: {
      ...NAME_SCHEMA,
      ...TYPE_SCHEMA,
      ...RELATIONSHIP_OF_ID_SCHEMA,
      ...RELATIONSHIP_WITH_ID_SCHEMA,
    },
    required: [NAME, TYPE, RELATIONSHIP_OF_ID, RELATIONSHIP_WITH_ID],
    additionalProperties: false,
  },
  response: {
    200: SCHEMA__ENTITY_TO_ENTITY_RELATIONSHIP__RESPONSE,
  },
};

export const SCHEMA__ENTITY__DELETE: Schema = {
  response: {
    200: NULL_SCHEMA,
  },
};
