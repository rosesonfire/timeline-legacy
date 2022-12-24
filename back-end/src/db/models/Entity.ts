import { Table, Column, Model } from 'sequelize-typescript';

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
