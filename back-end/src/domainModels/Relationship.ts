import { RecordOf } from 'immutable';

import { DM, IRepository } from './types';

interface Relationship<O extends DM, W extends DM, T extends string> extends DM {
  type: T;
  relationshipOfId: number;
  relationshipWithId: number;
  relationshipOf?: RecordOf<O>;
  relationshipWith?: RecordOf<W>;
}

export interface IRelationshipRepository<
  O extends DM,
  W extends DM,
  T extends string,
  R extends Relationship<O, W, T>,
> extends IRepository<R> {}

export default Relationship;
