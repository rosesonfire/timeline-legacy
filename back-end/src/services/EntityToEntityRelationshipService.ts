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
    const allEntitytoEntityRelationships = await this.filter(Record({})());

    await Promise.all(
      allEntitytoEntityRelationships
        .map((entitytoEntityRelationship) => this.delete(entitytoEntityRelationship.id))
        .toArray(),
    );
  }
}

export default EntityToEntityRelationshipService;
