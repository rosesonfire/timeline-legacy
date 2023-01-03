export const ID = 'id';
export const NAME = 'name';

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
