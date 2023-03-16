import { Record } from 'immutable';

import EntityToEntityRelationship, {
  IEntityToEntityRelationshipRepository,
} from 'domainModels/EntityToEntityRelationship';

import DomainModelService from './DomainModelService';

class EntityToEntityRelationshipService extends DomainModelService<
  EntityToEntityRelationship,
  IEntityToEntityRelationshipRepository
> {
  async deleteAll(): Promise<void> {
    const allEntities = await this.filter(Record({})());

    await Promise.all(allEntities.map((entity) => this.delete(entity.id)).toArray());
  }
}

export default EntityToEntityRelationshipService;
