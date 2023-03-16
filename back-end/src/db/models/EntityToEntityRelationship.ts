import { Op } from 'sequelize';
import { BelongsTo, Column, ForeignKey, Model } from 'sequelize-typescript';
import { List, Record, RecordOf } from 'immutable';

import db from 'db';
import Repository from 'db/_shared/Repository';
import TMTable from 'db/_shared/TMTable';

import EntityToEntityRelationshipDomainModel, {
  IEntityToEntityRelationshipRepository,
} from 'domainModels/EntityToEntityRelationship';
import { Pagination } from 'domainModels/types';

import { Entity, EntityRepository } from './Entity';

interface EntityToEntityRelationshipModelAttrs
  extends Omit<EntityToEntityRelationshipDomainModel, 'relationshipOf' | 'relationshipWith'> {}

interface EntityToEntityRelationshipModelCreationAttrs
  extends Omit<EntityToEntityRelationshipModelAttrs, 'id'> {}

@TMTable({
  modelName: 'entity_to_entity_relationship',
})
export class EntityToEntityRelationship extends Model<
  EntityToEntityRelationshipModelAttrs,
  EntityToEntityRelationshipModelCreationAttrs
> {
  @Column
  name!: string;

  @Column
  type!: string;

  @ForeignKey(() => Entity)
  @Column
  relationshipOfId!: number;

  @ForeignKey(() => Entity)
  @Column
  relationshipWithId!: number;

  @BelongsTo(() => Entity, 'relationshipOfId')
  relationshipOf!: Entity;

  @BelongsTo(() => Entity, 'relationshipWithId')
  relationshipWith!: Entity;
}

export class EntityToEntityRelationshipRepository
  extends Repository<
    EntityToEntityRelationshipDomainModel,
    EntityToEntityRelationshipModelAttrs,
    EntityToEntityRelationshipModelCreationAttrs,
    EntityToEntityRelationship
  >
  implements IEntityToEntityRelationshipRepository
{
  private __entityRepository: EntityRepository;

  constructor(entityRepository: EntityRepository) {
    const respository = db.getRepository(EntityToEntityRelationship);

    super(respository);

    this.__entityRepository = entityRepository;
  }

  async filter(
    entityToEntityRelationshipDomainModel: RecordOf<Partial<EntityToEntityRelationshipDomainModel>>,
    pagination?: RecordOf<Pagination>,
  ) {
    const { name } = entityToEntityRelationshipDomainModel.toJSON();

    const entityToEntityRelationshipDBObjects = await this._respository.findAll({
      where: {
        name: {
          [Op.like]: name ? `%${name}%` : '%',
        },
      },
      offset: pagination?.offset,
      limit: pagination?.pageSize,
    });

    return List(
      entityToEntityRelationshipDBObjects.map((entityToEntityRelationshipDBObject) =>
        this.mapDBModelToDomainModel(entityToEntityRelationshipDBObject),
      ),
    );
  }

  protected mapDomainModelCreationAttributes(
    entityToEntityRelationshipDM: RecordOf<Omit<EntityToEntityRelationshipDomainModel, 'id'>>,
  ) {
    // console.log('sdf');
    // const { id, name, type, relationshipOf, relationshipWith } =
    //   entityToEntityRelationshipDM.toJSON();
    // console.log('sdf', id, name, type);

    // const dBObject = new EntityToEntityRelationship({
    //   id,
    //   name,
    //   type,
    //   relationshipOfId: relationshipOf.id,
    //   relationshipWithId: relationshipWith.id,
    // });

    // console.log('sdf', dBObject);

    // return dBObject;

    return entityToEntityRelationshipDM.toJSON();
  }

  protected mapDomainModelToDBModelFieldsForUpdate(
    entityToEntityRelationshipDM: RecordOf<Partial<EntityToEntityRelationshipDomainModel>>,
  ) {
    const { id, name, relationshipOf, relationshipWith } = entityToEntityRelationshipDM.toJSON();

    return Record({
      id,
      name,
      relationshipOfId: relationshipOf?.id,
      relationshipWithId: relationshipWith?.id,
    })();
  }

  mapDBModelToDomainModel(entityToEntityRelationshipDBObject: EntityToEntityRelationship) {
    const { id, name, type, relationshipOfId, relationshipWithId } =
      entityToEntityRelationshipDBObject.toJSON();
    const { relationshipOf, relationshipWith } = entityToEntityRelationshipDBObject;

    const newEntityToEntityRelationshipDM = Record<EntityToEntityRelationshipDomainModel>({
      id,
      name,
      type,
      relationshipOfId,
      relationshipWithId,
      relationshipOf: this.__entityRepository.mapDBModelToDomainModel(relationshipOf),
      relationshipWith: this.__entityRepository.mapDBModelToDomainModel(relationshipWith),
    })();

    return newEntityToEntityRelationshipDM;
  }
}
