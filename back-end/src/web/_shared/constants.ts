export const ID = 'id';
export const RELATIONSHIP_OF_ID = 'relationshipOfId';
export const RELATIONSHIP_WITH_ID = 'relationshipWithId';
export const NAME = 'name';
export const TYPE = 'type';
export const OFFSET = 'offset';
export const PAGE_SIZE = 'pageSize';

export const STRING_SCHEMA = {
  type: 'string',
};

export const NUMBER_SCHEMA = {
  type: 'number',
};

export const NULL_SCHEMA = {
  type: 'null',
};

export const ID_SCHEMA = {
  [ID]: NUMBER_SCHEMA,
};

export const NAME_SCHEMA = {
  [NAME]: STRING_SCHEMA,
};

export const TYPE_SCHEMA = {
  [TYPE]: STRING_SCHEMA,
};

export const PAGINATION_SCHEMA = {
  [OFFSET]: NUMBER_SCHEMA,
  [PAGE_SIZE]: NUMBER_SCHEMA,
};

export const RELATIONSHIP_OF_ID_SCHEMA = {
  [RELATIONSHIP_OF_ID]: NUMBER_SCHEMA,
};

export const RELATIONSHIP_WITH_ID_SCHEMA = {
  [RELATIONSHIP_WITH_ID]: NUMBER_SCHEMA,
};
