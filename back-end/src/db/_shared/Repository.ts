import { CreationAttributes } from 'sequelize';
import { Repository as SequelizeRepository, Model } from 'sequelize-typescript';
import { List, RecordOf } from 'immutable';

import { DM, IRepository, Pagination } from 'domainModels/types';

import TMModel from './TMModel';
import { MapDBModelToDomainModelConfig } from './types';

abstract class Repository<
  T extends DM,
  ModelAttrs extends T,
  ModelCreationAttrs extends Omit<T, 'id'>,
  M extends Model<ModelAttrs, ModelCreationAttrs>,
> implements IRepository<T>
{
  protected _respository: SequelizeRepository<M>;

  constructor(respository: SequelizeRepository<M>) {
    this._respository = respository;
  }

  protected _findDBObject(id: T['id']) {
    const dbObject = this._respository.findByPk(id);

    return dbObject;
  }

  async find(id: T['id']) {
    const dbObject = await this._findDBObject(id);

    const domainModel = dbObject && this.mapDBModelToDomainModel(dbObject);

    return domainModel;
  }

  async create(domainModel: RecordOf<Omit<T, 'id'>>) {
    const creationAttributes = this.mapDomainModelCreationAttributes(domainModel);
    const createdDBObject = await this._respository.create(creationAttributes);
    const newDomainModel = this.mapDBModelToDomainModel(createdDBObject);

    return newDomainModel;
  }

  async update(id: T['id'], domainModel: RecordOf<Partial<T>>) {
    const dbObject = await this._findDBObject(id);

    if (!dbObject) {
      return null;
    }

    const dataToUpdate = this.mapDomainModelToDBModelFieldsForUpdate(domainModel);
    const updatedDBObject = await dbObject.update(dataToUpdate.toJSON());
    const updatedDomainModel = this.mapDBModelToDomainModel(updatedDBObject);

    return updatedDomainModel;
  }

  async delete(id: T['id']) {
    const dbObjectToDelete = await this._findDBObject(id);

    if (!dbObjectToDelete) {
      return null;
    }

    await dbObjectToDelete.destroy();

    const deletedDomainModel = this.mapDBModelToDomainModel(dbObjectToDelete);

    return deletedDomainModel;
  }

  abstract filter(
    domainModel: RecordOf<Partial<T>>,
    pagination?: RecordOf<Pagination>,
  ): Promise<List<RecordOf<T>>>;

  protected abstract mapDomainModelCreationAttributes(
    domainModel: RecordOf<Omit<T, 'id'>>,
  ): CreationAttributes<M>;

  protected abstract mapDomainModelToDBModelFieldsForUpdate(
    domainModel: RecordOf<Partial<T>>,
  ): RecordOf<Partial<ModelAttrs>>;

  protected abstract mapDBModelToDomainModel(
    dbObject: TMModel,
    config?: MapDBModelToDomainModelConfig,
  ): RecordOf<T>;
}

export default Repository;
