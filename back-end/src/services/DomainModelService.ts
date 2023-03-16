import { List, RecordOf } from 'immutable';

import { DM, IRepository, Pagination } from 'domainModels/types';

abstract class DomainModelService<T extends DM, R extends IRepository<T>> {
  protected _db!: R;

  constructor(db: R) {
    this._db = db;
  }

  create(domainModel: RecordOf<Omit<T, 'id'>>): Promise<RecordOf<T>> {
    return this._db.create(domainModel);
  }

  find(id: T['id']): Promise<RecordOf<T> | null> {
    return this._db.find(id);
  }

  filter(
    entity: RecordOf<Partial<T>>,
    pagination?: RecordOf<Pagination>,
  ): Promise<List<RecordOf<T>>> {
    return this._db.filter(entity, pagination);
  }

  update(id: T['id'], domainModel: RecordOf<Partial<T>>): Promise<RecordOf<T> | null> {
    return this._db.update(id, domainModel);
  }

  delete(id: T['id']): Promise<RecordOf<T> | null> {
    return this._db.delete(id);
  }
}

export default DomainModelService;
