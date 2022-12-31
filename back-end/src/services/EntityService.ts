import { List, RecordOf } from 'immutable';

import Entity, { IEntityRepository } from 'domainModels/Entity';

import DomainModelService from './DomainModelService';

class EntityService extends DomainModelService<Entity, IEntityRepository> {
  filter(domainModel: RecordOf<Partial<Entity>>): Promise<List<RecordOf<Entity>>> {
    return this._db.filter(domainModel);
  }
}

export default EntityService;
