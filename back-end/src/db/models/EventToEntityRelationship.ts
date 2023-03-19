import { BelongsTo, Column, ForeignKey, Model } from 'sequelize-typescript';
import { List, Record, RecordOf } from 'immutable';

import db from 'db';
import Repository from 'db/_shared/Repository';
import TMTable from 'db/_shared/TMTable';
import { MapDBModelToDomainModelConfig } from 'db/_shared/types';
import { getFilterLogic } from 'db/_shared/helpers';

import EventToEntityRelationshipDomainModel, {
  IEventToEntityRelationshipRepository,
} from 'domainModels/EventToEntityRelationship';
import { Pagination } from 'domainModels/types';

import { Event, EventRepository } from './Event';
import { Entity, EntityRepository } from './Entity';

interface EventToEntityRelationshipModelAttrs
  extends Omit<EventToEntityRelationshipDomainModel, 'relationshipOf' | 'relationshipWith'> {}

interface EventToEntityRelationshipModelCreationAttrs
  extends Omit<EventToEntityRelationshipModelAttrs, 'id'> {}

@TMTable({
  modelName: 'event_to_entity_relationship',
})
export class EventToEntityRelationship extends Model<
  EventToEntityRelationshipModelAttrs,
  EventToEntityRelationshipModelCreationAttrs
> {
  @Column
  name!: string;

  @Column
  type!: string;

  @ForeignKey(() => Event)
  @Column
  relationshipOfId!: number;

  @ForeignKey(() => Entity)
  @Column
  relationshipWithId!: number;

  @BelongsTo(() => Event, 'relationshipOfId')
  relationshipOf?: Event;

  @BelongsTo(() => Entity, 'relationshipWithId')
  relationshipWith?: Entity;
}

export class EventToEntityRelationshipRepository
  extends Repository<
    EventToEntityRelationshipDomainModel,
    EventToEntityRelationshipModelAttrs,
    EventToEntityRelationshipModelCreationAttrs,
    EventToEntityRelationship
  >
  implements IEventToEntityRelationshipRepository
{
  private __eventRepository: EventRepository;
  private __entityRepository: EntityRepository;

  constructor(eventRepository: EventRepository, entityRepository: EntityRepository) {
    const respository = db.getRepository(EventToEntityRelationship);

    super(respository);

    this.__eventRepository = eventRepository;
    this.__entityRepository = entityRepository;
  }

  async filter(
    eventToEntityRelationshipDomainModel: RecordOf<Partial<EventToEntityRelationshipDomainModel>>,
    pagination?: RecordOf<Pagination>,
  ) {
    const { name } = eventToEntityRelationshipDomainModel.toJSON();

    const eventToEntityRelationshipDBObjects = await this._respository.findAll(
      getFilterLogic({
        name,
        pagination,
      }),
    );

    return List(
      eventToEntityRelationshipDBObjects.map((eventToEntityRelationshipDBObject) =>
        this.mapDBModelToDomainModel(eventToEntityRelationshipDBObject),
      ),
    );
  }

  protected mapDomainModelCreationAttributes(
    eventToEntityRelationshipDM: RecordOf<Omit<EventToEntityRelationshipDomainModel, 'id'>>,
  ) {
    return eventToEntityRelationshipDM.toJSON();
  }

  protected mapDomainModelToDBModelFieldsForUpdate(
    eventToEntityRelationshipDM: RecordOf<Partial<EventToEntityRelationshipDomainModel>>,
  ) {
    const { id, name, relationshipOf, relationshipWith } = eventToEntityRelationshipDM.toJSON();

    return Record({
      id,
      name,
      relationshipOfId: relationshipOf?.id,
      relationshipWithId: relationshipWith?.id,
    })();
  }

  mapDBModelToDomainModel(
    eventToEntityRelationshipDBObject: EventToEntityRelationship,
    config?: MapDBModelToDomainModelConfig,
  ) {
    const shouldHydrate = config?.shouldHydrate ?? true;

    const { id, name, type, relationshipOfId, relationshipWithId } =
      eventToEntityRelationshipDBObject.toJSON();
    const { relationshipOf, relationshipWith } = eventToEntityRelationshipDBObject;

    const newEventToEntityRelationshipDM = Record<EventToEntityRelationshipDomainModel>({
      id,
      name,
      type,
      relationshipOfId,
      relationshipWithId,
      relationshipOf:
        shouldHydrate && relationshipOf
          ? this.__eventRepository.mapDBModelToDomainModel(relationshipOf)
          : undefined,
      relationshipWith:
        shouldHydrate && relationshipWith
          ? this.__entityRepository.mapDBModelToDomainModel(relationshipWith)
          : undefined,
    })();

    return newEventToEntityRelationshipDM;
  }
}
