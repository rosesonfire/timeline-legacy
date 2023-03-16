import { List, RecordOf } from 'immutable';

import { DM, IRepository } from './types';

interface Entity extends DM {
  relatedEntities1?: List<RecordOf<Entity>>;
  relatedEntities2?: List<RecordOf<Entity>>;
}

export interface IEntityRepository<T extends Entity = Entity> extends IRepository<T> {}

export default Entity;
