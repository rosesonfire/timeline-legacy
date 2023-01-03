import { Op } from 'sequelize';
import { Column, Model } from 'sequelize-typescript';
import { List, Record, RecordOf } from 'immutable';

import Repository from 'db/_shared/Repository';
import TMTable from 'db/_shared/TMTable';

import EntityDomainModel, { IEntityRepository } from 'domainModels/Entity';

@TMTable({
  modelName: 'entity',
})
export class Entity extends Model<EntityDomainModel> {
  @Column
  name!: string;
}

export class EntityRepository extends Repository<EntityDomainModel> implements IEntityRepository {
  constructor() {
    super(Entity);
  }

  async filter(entityDM: RecordOf<Partial<EntityDomainModel>>) {
    const { name } = entityDM.toJSON();

    const entities = await Entity.findAll({
      where: {
        name: {
          [Op.like]: name ? `%${name}%` : '%',
        },
      },
    });

    return List(entities.map(this.mapDBModelToDomainModel));
  }

  protected mapDomainModelToDBModel(entityDM: RecordOf<EntityDomainModel>) {
    const createdDBObject = new Entity({ ...entityDM.toJSON() });

    return createdDBObject;
  }

  protected mapDomainModelToDBModelFields(entityDM: RecordOf<Partial<EntityDomainModel>>) {
    return entityDM;
  }

  protected mapDBModelToDomainModel(entityDBObject: Entity) {
    const dbModelFields = entityDBObject.toJSON();
    const newEntityDM = Record<EntityDomainModel>(dbModelFields)();

    return newEntityDM;
  }
}
