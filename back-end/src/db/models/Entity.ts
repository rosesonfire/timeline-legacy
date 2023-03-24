import { Op } from 'sequelize';
import { BelongsToMany, Column, Model } from 'sequelize-typescript';
import { List, Record, RecordOf } from 'immutable';

import db from 'db';
import Repository from 'db/_shared/Repository';
import TMTable from 'db/_shared/TMTable';
import { MapDBModelToDomainModelConfig } from 'db/_shared/types';
import { getFilterLogic } from 'db/_shared/helpers';

import { Pagination, Sorting } from 'domainModels/types';
import EntityDomainModel, { IEntityRepository } from 'domainModels/Entity';

import { EntityToEntityRelationship } from './EntityToEntityRelationship';

interface EntityModelAttrs
  extends Omit<EntityDomainModel, 'relatedEntities1' | 'relatedEntities2'> {}

interface EntityModelCreationAttrs extends Omit<EntityModelAttrs, 'id'> {}

@TMTable({
  modelName: 'entity',
})
export class Entity extends Model<EntityModelAttrs, EntityModelCreationAttrs> {
  @Column
  name!: string;

  @BelongsToMany(() => Entity, () => EntityToEntityRelationship, 'relationshipOfId')
  relatedEntities1?: Entity[];

  @BelongsToMany(() => Entity, () => EntityToEntityRelationship, 'relationshipWithId')
  relatedEntities2?: Entity[];
}

export class EntityRepository
  extends Repository<EntityDomainModel, EntityModelAttrs, EntityModelCreationAttrs, Entity>
  implements IEntityRepository
{
  constructor() {
    const respository = db.getRepository(Entity);

    // respository.create({
    //   name: 'test',
    // });

    super(respository);
  }

  async filter(
    entityDomainModel: RecordOf<Partial<EntityDomainModel>>,
    options?: {
      sorting?: RecordOf<Sorting<EntityDomainModel>>;
      pagination?: RecordOf<Pagination>;
    },
  ) {
    const { name } = entityDomainModel.toJSON();

    const entityDBObjects = await this._respository.findAll(
      getFilterLogic({
        name,
        ...options,
      }),
    );

    return List(
      entityDBObjects.map((entityDBObject) => this.mapDBModelToDomainModel(entityDBObject)),
    );
  }

  protected mapDomainModelCreationAttributes(entityDM: RecordOf<Omit<EntityDomainModel, 'id'>>) {
    return entityDM.toJSON();
  }

  protected mapDomainModelToDBModelFieldsForUpdate(entityDM: RecordOf<Partial<EntityDomainModel>>) {
    const { id, name } = entityDM.toJSON();

    return Record({ id, name })();
  }

  mapDBModelToDomainModel(
    entityDBObject: Entity,
    config?: MapDBModelToDomainModelConfig,
  ): RecordOf<EntityDomainModel> {
    const shouldHydrate = config?.shouldHydrate ?? true;
    const { id, name } = entityDBObject.toJSON();
    const { relatedEntities1, relatedEntities2 } = entityDBObject;

    const newEntityDM = Record<EntityDomainModel>({
      id,
      name,

      relatedEntities1:
        shouldHydrate && relatedEntities1
          ? List(relatedEntities1.map((entity) => this.mapDBModelToDomainModel(entity)))
          : undefined,

      relatedEntities2:
        shouldHydrate && relatedEntities2
          ? List(relatedEntities2?.map((entity) => this.mapDBModelToDomainModel(entity)))
          : undefined,
    })();

    return newEntityDM;
  }
}
