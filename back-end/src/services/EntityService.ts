import { Record } from 'immutable';

import Entity, { IEntityRepository } from 'domainModels/Entity';

import DomainModelService from './DomainModelService';

class EntityService extends DomainModelService<Entity, IEntityRepository> {
  async deleteAll(): Promise<void> {
    const allEntities = await this.filter(Record({})());

    await Promise.all(allEntities.map((entity) => this.delete(entity.id)).toArray());
  }
}

export default EntityService;
