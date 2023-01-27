import { List, Record, RecordOf } from 'immutable';

import Entity, { IEntityRepository } from 'domainModels/Entity';
import { Pagination } from 'domainModels/types';

import DomainModelService from './DomainModelService';

class EntityService extends DomainModelService<Entity, IEntityRepository> {
  filter(
    domainModel: RecordOf<Partial<Entity>>,
    pagination?: RecordOf<Pagination>,
  ): Promise<List<RecordOf<Entity>>> {
    return this._db.filter(domainModel, pagination);
  }

  async deleteAll(): Promise<void> {
    const allEntities = await this.filter(Record({})());

    await Promise.all(allEntities.map((entity) => this.delete(entity.id)).toArray());
  }
}

export default EntityService;
