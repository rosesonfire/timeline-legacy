import { List, RecordOf } from 'immutable';

import { DM, IRepository } from './types';

interface Entity extends DM {
  name: string;
}

export interface IEntityRepository extends IRepository<Entity> {
  filter(entityDM: RecordOf<Partial<Entity>>): Promise<List<RecordOf<Entity>>>;
}

export default Entity;
