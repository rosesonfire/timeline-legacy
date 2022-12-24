import { Op } from 'sequelize';
import { Table, Column, Model } from 'sequelize-typescript';
import { List, Record, RecordOf } from 'immutable';

import EntityDomainModel from 'domainModels/Entity';
import { Repository } from 'domainModels/types';

@Table({
  modelName: 'entity',
  paranoid: true,
  underscored: true,
  freezeTableName: true,
})
export class Entity extends Model<Pick<Entity, 'name'>> {
  @Column
  name!: string;
}

export class EntityRepository implements Repository<EntityDomainModel> {
  private static mapToDomainModel(entity: Entity) {
    const newEntityDM = Record<EntityDomainModel>({
      name: entity.name,
    })();

    return newEntityDM;
  }

  async create(entityDM: RecordOf<EntityDomainModel>) {
    const entity = await new Entity(entityDM.toJSON()).save();
    const newEntityDM = EntityRepository.mapToDomainModel(entity);

    return newEntityDM;
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

    return List(entities.map(EntityRepository.mapToDomainModel));
  }
}
