export const DEFAULT_PAGE_SIZE = 10;
export const DEFAULT_ORDER = 'DESC';

export const ID = 'id';
export const RELATIONSHIP_OF_ID = 'relationshipOfId';
export const RELATIONSHIP_WITH_ID = 'relationshipWithId';
export const NAME = 'name';
export const TYPE = 'type';
export const OFFSET = 'offset';
export const PAGE_SIZE = 'pageSize';
export const STARTED_AT = 'startedAt';
export const ENDED_AT = 'endedAt';
export const SORT_BY = 'sortBy';
export const ORDER = 'order';
export const ASC = 'ASC';
export const DESC = 'DESC';

export const STRING_SCHEMA = {
  type: 'string',
};

export const ENUM_SCHEMA = (options: string[]) => ({
  type: 'string',
  enum: options,
});

export const NUMBER_SCHEMA = {
  type: 'number',
};

export const NULL_SCHEMA = {
  type: 'null',
};

export const DATE_TIME_SCHEMA = {
  type: 'string',
  format: 'date-time',
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

export const ORDER_SCHEMA = ENUM_SCHEMA([ASC, DESC]);

export const SORTING_SCHEMA = (options: string[]) => ({
  [SORT_BY]: ENUM_SCHEMA(options),
  [ORDER]: ORDER_SCHEMA,
});

export const RELATIONSHIP_OF_ID_SCHEMA = {
  [RELATIONSHIP_OF_ID]: NUMBER_SCHEMA,
};

export const RELATIONSHIP_WITH_ID_SCHEMA = {
  [RELATIONSHIP_WITH_ID]: NUMBER_SCHEMA,
};

export const RELATED_ENTITIES_SCHEMA = {
  type: 'array',
  items: {
    type: 'object',
    properties: {
      ...ID_SCHEMA,
      ...NAME_SCHEMA,
    },
    required: [ID, NAME],
    additionalProperties: false,
  },
};

export const STARTED_AT_SCHEMA = {
  [STARTED_AT]: DATE_TIME_SCHEMA,
};

export const ENDED_AT_SCHEMA = {
  [STARTED_AT]: DATE_TIME_SCHEMA,
};
