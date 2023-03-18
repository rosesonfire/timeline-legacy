import { Op } from 'sequelize';
import { Column, Model } from 'sequelize-typescript';
import { List, Record, RecordOf } from 'immutable';

import db from 'db';
import Repository from 'db/_shared/Repository';
import TMTable from 'db/_shared/TMTable';
import { getFilterLogic } from 'db/_shared/helpers';

import { Pagination } from 'domainModels/types';
import EventDomainModel, { IEventRepository } from 'domainModels/Event';

interface EventModelAttrs extends EventDomainModel {}

interface EventModelCreationAttrs extends Omit<EventModelAttrs, 'id'> {}

@TMTable({
  modelName: 'event',
})
export class Event extends Model<EventModelAttrs, EventModelCreationAttrs> {
  @Column
  name!: string;

  @Column
  startedAt!: Date;

  @Column
  endedAt?: Date;
}

export class EventRepository
  extends Repository<EventDomainModel, EventModelAttrs, EventModelCreationAttrs, Event>
  implements IEventRepository
{
  constructor() {
    const respository = db.getRepository(Event);

    super(respository);
  }

  async filter(
    eventDomainModel: RecordOf<Partial<EventDomainModel>>,
    pagination?: RecordOf<Pagination>,
  ) {
    const { name } = eventDomainModel.toJSON();

    const eventDBObjects = await this._respository.findAll(
      getFilterLogic({
        name,
        pagination,
      }),
    );

    return List(eventDBObjects.map((eventDBObject) => this.mapDBModelToDomainModel(eventDBObject)));
  }

  protected mapDomainModelCreationAttributes(eventDM: RecordOf<Omit<EventDomainModel, 'id'>>) {
    return eventDM.toJSON();
  }

  protected mapDomainModelToDBModelFieldsForUpdate(eventDM: RecordOf<Partial<EventDomainModel>>) {
    const { id, name } = eventDM.toJSON();

    return Record({ id, name })();
  }

  mapDBModelToDomainModel(eventDBObject: Event): RecordOf<EventDomainModel> {
    const { id, name, startedAt, endedAt } = eventDBObject.toJSON();

    const newEventDM = Record<EventDomainModel>({
      id,
      name,
      startedAt,
      endedAt,
    })();

    return newEventDM;
  }
}
