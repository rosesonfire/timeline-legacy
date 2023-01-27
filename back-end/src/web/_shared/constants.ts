export const ID = 'id';
export const NAME = 'name';
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

export const PAGINATION_SCHEMA = {
  [OFFSET]: NUMBER_SCHEMA,
  [PAGE_SIZE]: NUMBER_SCHEMA,
};
