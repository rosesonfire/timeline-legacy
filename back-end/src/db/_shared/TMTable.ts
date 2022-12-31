import { Table, Model, TableOptions } from 'sequelize-typescript';

const TMTable = <M extends Model = Model>(options: TableOptions<M>): Function => {
  return Table({
    paranoid: true,
    underscored: true,
    freezeTableName: true,
    ...options,
  });
};

export default TMTable;
