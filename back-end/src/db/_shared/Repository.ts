import { List, RecordOf } from 'immutable';

import { DM, IRepository } from 'domainModels/types';

import TMModel from './TMModel';

abstract class Repository<T extends DM> implements IRepository<T> {
  private __DBModelClass: typeof TMModel;

  constructor(DBModelClass: typeof TMModel) {
    this.__DBModelClass = DBModelClass;
  }

  protected _findDBObject(id: T['id']) {
    const dbObject = this.__DBModelClass.findByPk(id);

    return dbObject;
  }

  async find(id: T['id']) {
    const dbObject = await this._findDBObject(id);

    const domainModel = dbObject && this.mapDBModelToDomainModel(dbObject);

    return domainModel;
  }

  async create(domainModel: RecordOf<T>) {
    const dbObjectToCreate = this.mapDomainModelToDBModel(domainModel);
    const createdDBObject = await dbObjectToCreate.save();
    const newDomainModel = this.mapDBModelToDomainModel(createdDBObject);

    return newDomainModel;
  }

  async update(id: T['id'], domainModel: RecordOf<Partial<T>>) {
    const dbObject = await this._findDBObject(id);

    if (!dbObject) {
      return null;
    }

    const dataToUpdate = this.mapDomainModelToDBModelFields(domainModel);
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

  abstract filter(domainModel: RecordOf<Partial<T>>): Promise<List<RecordOf<T>>>;

  protected abstract mapDomainModelToDBModel(domainModel: RecordOf<T>): TMModel;
  protected abstract mapDomainModelToDBModelFields(
    domainModel: RecordOf<Partial<T>>,
  ): RecordOf<Partial<T>>;
  protected abstract mapDBModelToDomainModel(dbObject: TMModel): RecordOf<T>;
}

export default Repository;
